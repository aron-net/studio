'use client';

import { useCheckout } from '@/context/CheckoutContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';

export function StepConfirmation() {
  const { confirmPurchase, setStep } = useCheckout();
  const router = useRouter();

  const handleNo = () => {
    router.back();
  };

  const handleYes = () => {
    confirmPurchase();
  };

  return (
    <div className="text-center py-8">
      <p className="text-xl mb-8">Do you want to purchase this package?</p>
      <div className="flex justify-center gap-4">
        <Button variant="outline" size="lg" onClick={handleNo}>
          <ArrowLeft className="mr-2 h-4 w-4" /> No, go back
        </Button>
        <Button size="lg" onClick={handleYes} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Check className="mr-2 h-4 w-4" /> Yes, proceed
        </Button>
      </div>
    </div>
  );
}
