'use client';

import { useFirebase } from '@/firebase';
import { updateDoc, doc } from 'firebase/firestore';
import type { Order, OrderStatus } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

const ORDER_STATUSES: OrderStatus[] = ['Placed', 'Processing', 'Shipped', 'Done', 'Cancelled'];

interface AdminOrderListProps {
    orders: Order[] | null;
    isLoading: boolean;
    error: Error | null;
}

export function AdminOrderList({ orders, isLoading, error }: AdminOrderListProps) {
    const { firestore } = useFirebase();
    const { toast } = useToast();

    const handleStatusChange = async (order: Order, newStatus: OrderStatus) => {
        if (!firestore || !order.userId) {
            toast({ title: 'Error', description: 'Could not update order. User ID is missing.', variant: 'destructive' });
            return;
        }
        const orderRef = doc(firestore, 'users', order.userId, 'orders', order.id);
        try {
            await updateDoc(orderRef, { status: newStatus });
            toast({ title: 'Success', description: `Order #${order.id.slice(-6)} updated to ${newStatus}.` });
        } catch (e) {
            console.error("Error updating order status: ", e);
            toast({ title: 'Update Failed', description: 'You may not have permission to update this order.', variant: 'destructive' });
        }
    };
    
    if (isLoading || (orders === null && !error)) {
        return <div className="flex items-center justify-center space-x-2"><Loader2 className="h-6 w-6 animate-spin" /><span>Loading all orders...</span></div>;
    }

    if (error) {
        return (
            <Card className="text-center bg-destructive/10 border-destructive">
                <CardHeader>
                    <CardTitle>Permission Denied</CardTitle>
                    <CardDescription className="text-destructive/80">
                        A permission error occurred while fetching orders. Please ensure you are logged in as the administrator.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/admin/login">Go to Admin Login</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }
    
    const sortedOrders = orders
        ? [...orders]
            .filter(order => order.status !== 'Done')
            .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
        : [];

    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[240px]">Item</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer Phone</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="w-[200px]">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedOrders.length > 0 ? sortedOrders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    {order.productImageUrl ? (
                                        <Image
                                            src={order.productImageUrl}
                                            alt={order.productName || 'Product Image'}
                                            width={64}
                                            height={64}
                                            className="rounded-md object-cover w-16 h-16"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                                    )}
                                    <span className="font-medium">{order.productName}</span>
                                </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{order.id.slice(-6)}</TableCell>
                            <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                            <TableCell>{order.phoneNumber}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>UGX {order.totalAmount.toLocaleString()}</TableCell>
                            <TableCell>
                                <Select value={order.status} onValueChange={(value) => handleStatusChange(order, value as OrderStatus)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Set status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ORDER_STATUSES.map(status => (
                                            <SelectItem key={status} value={status}>{status}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center h-24">No active orders found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}
