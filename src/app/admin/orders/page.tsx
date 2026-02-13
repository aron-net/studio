'use client';

import { useUser } from '@/firebase';
import { AdminOrderList } from '@/components/admin/OrderList';
import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductSummary } from '@/components/admin/ProductSummary';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminOrdersPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // This effect handles redirection for a definitively logged-out user.
    if (!isUserLoading && !user) {
      router.replace('/admin/login');
    }
  }, [user, isUserLoading, router]);

  // While Firebase is determining the user state, show a loader.
  // Also, if the user is anonymous, we're likely in a transition state after login.
  // Keep showing the loader to wait for the permanent user object to load.
  if (isUserLoading || !user || user.isAnonymous) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  // At this point, we have a permanent, logged-in user. We can safely check their email.
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

  // If all checks pass, show the admin dashboard.
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
