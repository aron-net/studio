'use client';

import { useUser, useCollection, useMemoFirebase, useFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2, ShoppingBag } from 'lucide-react';
import { OrderCard } from '@/components/orders/OrderCard';

export default function OrdersPage() {
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();

  const ordersQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, `users/${user.uid}/orders`);
  }, [user, firestore]);

  const { data: orders, isLoading: areOrdersLoading } = useCollection<Order>(ordersQuery);

  // Show loader while the user session is being established or orders are being fetched.
  if (isUserLoading || !user || (areOrdersLoading && orders === null)) {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-2 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Loading orders...</span>
            </div>
        </div>
    );
  }

  const sortedOrders = orders ? [...orders].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Your Orders</h1>
        <p className="text-muted-foreground mt-1">
          Showing all orders placed from this device. Each order is linked to your current session.
        </p>
      </div>

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
            <OrderCard key={order.id} order={order} userId={user.uid} />
          ))}
        </div>
      )}
    </div>
  );
}
