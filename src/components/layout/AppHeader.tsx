'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useEffect } from 'react';
import { useAuth, useUser, initiateAnonymousSignIn } from '@/firebase';

export function AppHeader() {
  const pathname = usePathname();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Heart className="h-7 w-7 text-accent fill-accent" />
          <span className="font-bold font-headline text-xl text-foreground">CP-Pharma</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <Link
                href="/"
                className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/" ? "text-foreground font-semibold" : "text-foreground/60"
                )}
            >
                Shop
            </Link>
            <Link
                href="/orders"
                className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/orders" ? "text-foreground font-semibold" : "text-foreground/60"
                )}
            >
                My Orders
            </Link>
            <Link
                href="/admin/orders"
                className={cn(
                    "transition-colors hover:text-foreground/80 flex items-center gap-1.5",
                    pathname.startsWith("/admin") ? "text-foreground font-semibold" : "text-foreground/60"
                )}
            >
                <ShieldCheck className="h-4 w-4" />
                Admin
            </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/checkout">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="sr-only">Checkout</span>
                </Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
