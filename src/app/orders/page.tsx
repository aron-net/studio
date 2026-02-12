'use client';

import { useEffect, useState } from 'react';
import type { Order } from '@/lib/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  
  const sortedOrders = [...orders].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Your Orders</h1>
      {sortedOrders.length === 0 ? (
        <Card className="text-center py-16">
          <CardHeader>
            <div className="mx-auto bg-secondary p-4 rounded-full w-fit">
              <ShoppingBag className="h-12 w-12 text-secondary-foreground" />
            </div>
            <CardTitle className="mt-4">No orders yet</CardTitle>
            <CardDescription>You haven't placed any orders with us yet.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/">Back to Shop</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {sortedOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <div>
                        <CardTitle className="text-lg">Order #{order.id.slice(-6)}</CardTitle>
                        <CardDescription>
                        Placed on {new Date(order.timestamp).toLocaleDateString()}
                        </CardDescription>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-foreground">{order.product.name}</p>
                        <p className="text-muted-foreground">
                            {order.quantity} x {order.product.currency}{' '}
                            {order.product.price.toLocaleString()}
                        </p>
                    </div>
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
                      <strong>Pickup Point:</strong> {order.pickupPoint}
                    </p>
                  )}
                  <p className="text-sm">
                    <strong>Phone:</strong> {order.phone}
                  </p>
                </div>
                <div className="md:text-right self-end">
                    <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold font-headline text-accent">
                    {order.product.currency} {order.totalPrice.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
