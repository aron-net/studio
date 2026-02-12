'use client';
import type { Order, OrderItem } from '@/lib/types';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

type OrderCardProps = {
    order: Order;
    userId: string;
}

export function OrderCard({ order, userId }: OrderCardProps) {
    const { firestore } = useFirebase();

    const orderItemsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, `users/${userId}/orders/${order.id}/orderItems`);
    }, [firestore, userId, order.id]);

    const { data: orderItems, isLoading } = useCollection<OrderItem>(orderItemsQuery);
    
    // For this app, we assume one item per order
    const item = orderItems?.[0];

    return (
        <Card key={order.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <div className="flex flex-wrap justify-between items-center gap-2">
                <div>
                    <CardTitle className="text-lg">Order #{order.id.slice(-6)}</CardTitle>
                    <CardDescription>
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </CardDescription>
                </div>
                {isLoading ? <Skeleton className="h-10 w-32" /> : item && (
                    <div className="text-right">
                        <p className="font-semibold text-foreground">{item.productName}</p>
                        <p className="text-muted-foreground">
                            {item.quantity} x UGX{' '}
                            {item.unitPrice.toLocaleString()}
                        </p>
                    </div>
                )}
            </div>
          </CardHeader>
          <CardContent className="p-6 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Fulfillment Details</h3>
              <p className="text-sm">
                <strong>Method:</strong> {order.fulfillmentMethod}
              </p>
              {order.fulfillmentMethod === 'delivery' ? (
                <>
                  <p className="text-sm">
                    <strong>Address:</strong> {order.deliveryAddress}
                  </p>
                  {order.landmark && (
                    <p className="text-sm">
                      <strong>Landmark:</strong> {order.landmark}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm">
                  <strong>Pickup Point:</strong> {order.pickupPointId}
                </p>
              )}
              <p className="text-sm">
                <strong>Phone:</strong> {order.phoneNumber}
              </p>
            </div>
            <div className="md:text-right self-end">
                <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold font-headline text-accent">
                UGX {order.totalAmount.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
    );
}
