'use client';

import { useUser } from '@/firebase';
import { AdminOrderList } from '@/components/admin/OrderList';
import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
            <h1 className="text-3xl font-bold font-headline">Admin - All Orders</h1>
            <p className="text-muted-foreground mt-1">
                Manage and process all customer orders.
            </p>
      </div>
      <AdminOrderList />
    </div>
  );
}

    