'use client';

import { useUser, useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collectionGroup, query } from 'firebase/firestore';
import type { Order } from '@/lib/types';
import { AdminOrderList } from '@/components/admin/OrderList';
import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductSummary } from '@/components/admin/ProductSummary';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminOrdersPage() {
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();
  const router = useRouter();
  const [retryAttempt, setRetryAttempt] = useState(0);

  // This query now depends on `retryAttempt` to force re-evaluation after a delay.
  const allOrdersQuery = useMemoFirebase(() => {
    if (!firestore || !user || user.email !== 'abraham@clinicpesa.com') {
      return null;
    }
    // This collection group query requires admin privileges defined in firestore.rules
    return query(collectionGroup(firestore, 'orders'));
  }, [firestore, user, retryAttempt]); // Dependency on retryAttempt will trigger a new query

  const { data: orders, isLoading: areOrdersLoading, error: ordersError } = useCollection<Order>(allOrdersQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/admin/login');
    }
  }, [user, isUserLoading, router]);

  // Effect to automatically retry the query ONCE on a permission error.
  useEffect(() => {
    if (ordersError && ordersError.message.includes('permission') && retryAttempt < 1) {
      const timer = setTimeout(() => {
        setRetryAttempt(1);
      }, 750); // Wait a moment for auth state to propagate before retrying.
      return () => clearTimeout(timer);
    }
  }, [ordersError, retryAttempt]);


  if (isUserLoading || !user || user.isAnonymous) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (user.email !== 'abraham@clinicpesa.com') {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Access Denied</CardTitle>
                    <CardDescription>You do not have permission to view this page.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/admin/login">Go to Admin Login</Link>
                  </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  // While the automatic retry is pending, we keep showing the loading state.
  const isRetrying = !!(ordersError && retryAttempt < 1);

  // At this point, we are the admin. The query is active.
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
                Manage orders and view product sales analytics.
            </p>
        </div>
        <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
                <TabsTrigger value="orders">All Orders</TabsTrigger>
                <TabsTrigger value="summary">Product Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
                <AdminOrderList
                    orders={orders}
                    isLoading={areOrdersLoading || isRetrying}
                    error={isRetrying ? null : ordersError} // Suppress error flash during retry
                />
            </TabsContent>
            <TabsContent value="summary">
                <ProductSummary
                    orders={orders}
                    isLoading={areOrdersLoading || isRetrying}
                    error={isRetrying ? null : ordersError} // Suppress error flash during retry
                />
            </TabsContent>
        </Tabs>
    </div>
  );
}
