'use client';

import { useUser } from '@/firebase';
import { AdminOrderList } from '@/components/admin/OrderList';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminOrdersPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there's no user at all,
    // or if the user is anonymous, redirect to login.
    if (!isUserLoading && (!user || user.isAnonymous)) {
      router.replace('/admin/login');
    }
  }, [isUserLoading, user, router]);

  // Show a loader while we wait for the user session.
  if (isUserLoading || !user || user.isAnonymous) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  // If we have a non-anonymous user, render the page.
  // The AdminOrderList component handles the final authorization check to see if they are an admin.
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline">Admin Dashboard - All Orders</h1>
            <p className="text-muted-foreground mt-1">
                A centralized view to manage and process all customer orders.
            </p>
      </div>
      <AdminOrderList user={user} />
    </div>
  );
}
