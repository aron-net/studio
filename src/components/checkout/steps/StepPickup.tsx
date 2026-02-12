'use client';

import { useCheckout } from '@/context/CheckoutContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PICKUP_POINTS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

export function StepPickup() {
  const { pickupPoint, setPickupPoint, nextStep, prevStep } = useCheckout();
  const { toast } = useToast();

  const handleNext = () => {
    if (!pickupPoint) {
      toast({
        title: 'Selection Required',
        description: 'Please select a pick-up point.',
        variant: 'destructive',
      });
      return;
    }
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="pickupPoint">Select Pick-up Point</Label>
        <Select value={pickupPoint} onValueChange={setPickupPoint}>
          <SelectTrigger id="pickupPoint">
            <SelectValue placeholder="Choose a location" />
          </SelectTrigger>
          <SelectContent>
            {PICKUP_POINTS.map((point) => (
              <SelectItem key={point} value={point}>
                {point}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} className="bg-accent text-accent-foreground hover:bg-accent/90">Next</Button>
      </div>
    </div>
  );
}
