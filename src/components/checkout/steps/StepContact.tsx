'use client';

import { useCheckout } from '@/context/CheckoutContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Phone, Loader2 } from 'lucide-react';

export function StepContact() {
  const { phone, setPhone, nextStep, prevStep } = useCheckout();
  const [localPhone, setLocalPhone] = useState(phone);
  const [error, setError] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const { toast } = useToast();

  const validatePhone = (num: string): boolean => {
    const digitsOnly = num.replace(/\s/g, '').replace(/^\+/, '');
    if (digitsOnly.length >= 9 && digitsOnly.length <= 15 && /^\d+$/.test(digitsOnly)) {
      return true;
    }
    return false;
  };

  const handleNext = () => {
    if (!validatePhone(localPhone)) {
      const newError = 'Please enter a valid phone number (9-15 digits, optional + at start).';
      setError(newError);
      toast({
        title: 'Invalid Phone Number',
        description: newError,
        variant: 'destructive',
      });
      return;
    }

    setIsPaying(true);
    toast({
        title: 'Processing Payment...',
        description: 'Please wait while we initiate the payment.',
    });

    setTimeout(() => {
        const paymentSuccess = Math.random() > 0.2; // 80% success rate

        if (paymentSuccess) {
            setPhone(localPhone);
            toast({
                title: 'Payment Initiated',
                description: 'Please complete payment on your phone. You will be liable for payment on delivery/pickup.',
            });
            nextStep();
        } else {
            toast({
                title: 'Payment Failed',
                description: 'Could not initiate payment. Please check your number and try again.',
                variant: 'destructive',
            });
        }
        setIsPaying(false);
    }, 3000);
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPhone(e.target.value);
    if(error) setError('');
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            value={localPhone}
            onChange={handlePhoneChange}
            placeholder="+256 772 123 313"
            className="pl-10"
            disabled={isPaying}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={isPaying}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} disabled={isPaying} className="bg-accent text-accent-foreground hover:bg-accent/90">
          {isPaying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Next'
          )}
        </Button>
      </div>
    </div>
  );
}
