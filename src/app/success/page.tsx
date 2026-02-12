'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Order } from '@/lib/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2, Package } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const [orders] = useLocalStorage<Order[]>('orders', []);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) {
      router.replace('/');
      return;
    }
    const foundOrder = orders.find((o) => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
        // May still be writing to localStorage, wait a bit
        setTimeout(() => {
            const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]') as Order[];
            const foundOrder = storedOrders.find((o) => o.id === orderId);
            if (foundOrder) {
                setOrder(foundOrder);
            } else {
                router.replace('/');
            }
        }, 500);
    }
  }, [orderId, orders, router]);

  if (!order) {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-2 text-muted-foreground">
                <Package className="h-6 w-6 animate-pulse" />
                <span>Loading order details...</span>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <Card className="w-full max-w-2xl text-center shadow-2xl">
        <CardHeader className="items-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-headline">Order Received!</CardTitle>
          <CardDescription>Thank you for your purchase. Your order #{order.id.slice(-6)} has been confirmed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-left">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-lg">{order.product.name}</h3>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity</span>
                    <span>{order.quantity}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                    <span className="text-muted-foreground">Total</span>
                    <span>{order.product.currency} {order.totalPrice.toLocaleString()}</span>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold text-lg">Fulfillment Details</h3>
                <div className="text-sm space-y-1">
                    <p><strong>Method:</strong> {order.fulfillmentMethod}</p>
                    {order.fulfillmentMethod === 'delivery' ? (
                        <>
                            <p><strong>Address:</strong> {order.deliveryAddress}</p>
                            {order.landmark && <p><strong>Landmark:</strong> {order.landmark}</p>}
                        </>
                    ) : (
                        <p><strong>Pickup Point:</strong> {order.pickupPoint}</p>
                    )}
                    <p><strong>Phone:</strong> {order.phone}</p>
                </div>
            </div>
          
          <Button asChild size="lg" className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/">Back to Shop</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
