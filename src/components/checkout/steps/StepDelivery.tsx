'use client';

import { useCheckout } from '@/context/CheckoutContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { clarifyAddressAction } from '@/app/checkout/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  isClear: true,
  suggestions: '',
  clarifiedAddress: '',
  clarifiedLandmark: '',
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" variant="outline" size="sm" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Clarifying...
                </>
            ) : (
                <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Clarify with AI
                </>
            )}
        </Button>
    );
}


export function StepDelivery() {
  const { deliveryAddress, landmark, setDeliveryAddress, setLandmark, nextStep, prevStep } = useCheckout();
  const [localAddress, setLocalAddress] = useState(deliveryAddress);
  const [localLandmark, setLocalLandmark] = useState(landmark);
  const [state, formAction] = useFormState(clarifyAddressAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.clarifiedAddress) {
      setLocalAddress(state.clarifiedAddress);
    }
    if (state.clarifiedLandmark) {
      setLocalLandmark(state.clarifiedLandmark);
    }
    if (state.suggestions && !state.isClear) {
        toast({
            title: "AI Suggestion",
            description: state.suggestions,
        })
    }
  }, [state, toast]);

  const handleNext = () => {
    if (!localAddress) {
      toast({
        title: 'Address Required',
        description: 'Please enter a delivery address.',
        variant: 'destructive',
      });
      return;
    }
    setDeliveryAddress(localAddress);
    setLandmark(localLandmark);
    nextStep();
  };

  return (
    <div className="space-y-6">
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="deliveryAddress">Delivery Address (Required)</Label>
                <Textarea
                id="deliveryAddress"
                name="deliveryAddress"
                value={localAddress}
                onChange={(e) => setLocalAddress(e.target.value)}
                placeholder="e.g., Plot 123, Rose Street, Kololo, Kampala"
                required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="landmark">Landmark (Optional)</Label>
                <Input
                id="landmark"
                name="landmark"
                value={localLandmark}
                onChange={(e) => setLocalLandmark(e.target.value)}
                placeholder="e.g., Near the big mango tree"
                />
            </div>
            <div className="flex justify-end">
                <SubmitButton />
            </div>
        </form>

        {!state.isClear && (
            <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Suggestion from our AI assistant</AlertTitle>
            <AlertDescription>{state.suggestions}</AlertDescription>
            </Alert>
        )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} className="bg-accent text-accent-foreground hover:bg-accent/90">Next</Button>
      </div>
    </div>
  );
}
