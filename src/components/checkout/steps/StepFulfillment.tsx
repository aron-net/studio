'use client';

import { useCheckout } from '@/context/CheckoutContext';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { FulfillmentMethod } from '@/lib/types';
import { ArrowLeft, Truck, Warehouse } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function StepFulfillment() {
  const { fulfillmentMethod, setFulfillment, nextStep, prevStep } = useCheckout();
  const { toast } = useToast();

  const handleNext = () => {
    if (!fulfillmentMethod) {
      toast({
        title: 'Selection Required',
        description: 'Please choose a fulfillment method.',
        variant: 'destructive',
      });
      return;
    }
    nextStep();
  };

  return (
    <div className="space-y-8">
      <RadioGroup
        value={fulfillmentMethod ?? undefined}
        onValueChange={(value) => setFulfillment(value as FulfillmentMethod)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Label htmlFor="delivery" className="cursor-pointer">
            <Card className={`p-6 border-2 ${fulfillmentMethod === 'delivery' ? 'border-accent' : ''}`}>
                <div className="flex items-center space-x-4">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <div className="flex items-center space-x-3">
                        <Truck className="h-8 w-8 text-accent" />
                        <div>
                            <p className="font-semibold">Delivery</p>
                            <p className="text-sm text-muted-foreground">Have it delivered to your doorstep.</p>
                        </div>
                    </div>
                </div>
            </Card>
        </Label>
        <Label htmlFor="pickup" className="cursor-pointer">
            <Card className={`p-6 border-2 ${fulfillmentMethod === 'pickup' ? 'border-accent' : ''}`}>
                <div className="flex items-center space-x-4">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <div className="flex items-center space-x-3">
                        <Warehouse className="h-8 w-8 text-accent" />
                        <div>
                            <p className="font-semibold">Pick-up</p>
                            <p className="text-sm text-muted-foreground">Collect from a designated point.</p>
                        </div>
                    </div>
                </div>
            </Card>
        </Label>
      </RadioGroup>
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} className="bg-accent text-accent-foreground hover:bg-accent/90">Next</Button>
      </div>
    </div>
  );
}
