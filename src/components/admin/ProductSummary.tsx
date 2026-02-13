'use client';

import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collectionGroup, query } from 'firebase/firestore';
import type { Order } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { User } from 'firebase/auth';
import Image from 'next/image';
import { useMemo } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

type ProductSummaryData = {
    productName: string;
    productImageUrl: string;
    quantitySold: number;
    totalRevenue: number;
}

export function ProductSummary({ user }: { user: User | null }) {
    const { firestore } = useFirebase();

    const allOrdersQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collectionGroup(firestore, 'orders'));
    }, [firestore]);

    const { data: orders, isLoading, error } = useCollection<Order>(allOrdersQuery);

    const productSummary = useMemo(() => {
        if (!orders) return [];

        const summary = orders.reduce((acc, order) => {
            if (!order.productName) return acc;

            if (!acc[order.productName]) {
                acc[order.productName] = {
                    productName: order.productName,
                    productImageUrl: order.productImageUrl || '',
                    quantitySold: 0,
                    totalRevenue: 0,
                };
            }
            
            acc[order.productName].quantitySold += order.quantity;
            acc[order.productName].totalRevenue += order.totalAmount;

            return acc;
        }, {} as Record<string, ProductSummaryData>);

        return Object.values(summary).sort((a, b) => b.quantitySold - a.quantitySold);
    }, [orders]);

    if (isLoading) {
        return <div className="flex items-center justify-center space-x-2"><Loader2 className="h-6 w-6 animate-spin" /><span>Loading product summary...</span></div>;
    }

    if (error) {
        return (
            <Card className="text-center bg-destructive/10 border-destructive">
                <CardHeader>
                    <CardTitle>Permission Denied</CardTitle>
                    <CardDescription className="text-destructive/80">
                        You do not have permission to view product analytics. Please log in as the administrator.
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
    
    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Product</TableHead>
                        <TableHead className="text-right">Quantity Sold</TableHead>
                        <TableHead className="text-right">Total Revenue</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {productSummary.length > 0 ? productSummary.map(product => (
                        <TableRow key={product.productName}>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    {product.productImageUrl ? (
                                        <Image
                                            src={product.productImageUrl}
                                            alt={product.productName}
                                            width={64}
                                            height={64}
                                            className="rounded-md object-cover w-16 h-16"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                                    )}
                                    <span className="font-medium">{product.productName}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">{product.quantitySold}</TableCell>
                            <TableCell className="text-right font-medium">UGX {product.totalRevenue.toLocaleString()}</TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center h-24">No sales data yet.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}
