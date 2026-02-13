'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { Order, OrderItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2, Package } from 'lucide-react';
import { useUser, useDoc, useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import Image from 'next/image';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isUserLoading: isUserLoading } = useUser();
  const { firestore } = useFirebase();

  const orderId = searchParams.get('orderId');

  const orderRef = useMemoFirebase(() => {
    if (!user || !orderId || !firestore) return null;
    return doc(firestore, 'users', user.uid, 'orders', orderId);
  }, [user, orderId, firestore]);
  const { data: order, isLoading: isOrderLoading } = useDoc<Order>(orderRef);
  
  const orderItemsRef = useMemoFirebase(() => {
    if (!user || !orderId || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'orders', orderId, 'orderItems');
  }, [user, orderId, firestore]);
  const { data: orderItems, isLoading: areItemsLoading } = useCollection<OrderItem>(orderItemsRef);

  useEffect(() => {
    if (!isUserLoading && !orderId) {
      router.replace('/');
    }
  }, [orderId, router, isUserLoading]);
  
  const orderItem = orderItems?.[0];

  if (isUserLoading || isOrderLoading || areItemsLoading || !order || !orderItem) {
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
                <div className="flex items-start gap-4">
                    {orderItem.imageUrl && (
                        <Image 
                            src={orderItem.imageUrl}
                            alt={orderItem.productName}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover w-20 h-20"
                        />
                    )}
                    <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{orderItem.productName}</h3>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Quantity</span>
                            <span>{orderItem.quantity}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span className="text-muted-foreground">Total</span>
                            <span>UGX {order.totalAmount.toLocaleString()}</span>
                        </div>
                    </div>
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
                        <p><strong>Pickup Point:</strong> {order.pickupPointId}</p>
                    )}
                    <p><strong>Phone:</strong> {order.phoneNumber}</p>
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
