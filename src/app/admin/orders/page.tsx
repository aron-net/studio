'use client';

import { useUser } from '@/firebase';
import { AdminOrderList } from '@/components/admin/OrderList';
import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductSummary } from '@/components/admin/ProductSummary';

export default function AdminOrdersPage() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    // This case is handled by the redirect in AdminLoginPage, but good to have a fallback.
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Access Denied</CardTitle>
                    <CardDescription>You must be signed in to view this page.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
  }

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
                <AdminOrderList user={user} />
            </TabsContent>
            <TabsContent value="summary">
                <ProductSummary user={user} />
            </TabsContent>
        </Tabs>
    </div>
  );
}
