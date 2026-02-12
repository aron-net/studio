'use client';

import { useCheckout } from '@/context/CheckoutContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { StepSummary } from './steps/StepSummary';
import { StepConfirmation } from './steps/StepConfirmation';
import { StepFulfillment } from './steps/StepFulfillment';
import { StepDelivery } from './steps/StepDelivery';
import { StepPickup } from './steps/StepPickup';
import { StepContact } from './steps/StepContact';
import { StepPlaceOrder } from './steps/StepPlaceOrder';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

const stepComponents = {
  summary: StepSummary,
  confirm: StepConfirmation,
  fulfillment: StepFulfillment,
  delivery: StepDelivery,
  pickup: StepPickup,
  contact: StepContact,
  final: StepPlaceOrder,
};

const stepOrder: (keyof typeof stepComponents)[] = [
  'summary',
  'confirm',
  'fulfillment',
  'delivery', // or 'pickup'
  'contact',
  'final',
];

const stepTitles: Record<keyof typeof stepComponents, string> = {
    summary: 'Order Summary',
    confirm: 'Confirm Purchase',
    fulfillment: 'Fulfillment Method',
    delivery: 'Delivery Details',
    pickup: 'Select Pickup Point',
    contact: 'Contact Information',
    final: 'Confirm & Place Order',
};


export function CheckoutFlow() {
  const { product, step, fulfillmentMethod } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    if (!product) {
      router.replace('/');
    }
  }, [product, router]);

  if (!product) {
    return null;
  }

  const CurrentStepComponent = stepComponents[step];

  const getStepIndex = () => {
    let baseOrder = [...stepOrder];
    if(fulfillmentMethod === 'pickup') {
      baseOrder = baseOrder.filter(s => s !== 'delivery');
    } else {
      baseOrder = baseOrder.filter(s => s !== 'pickup');
    }
    const currentIndex = baseOrder.indexOf(step);
    return {currentIndex, totalSteps: baseOrder.length};
  }

  const {currentIndex, totalSteps} = getStepIndex();
  const progressValue = ((currentIndex + 1) / totalSteps) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
            <Progress value={progressValue} className="mb-4 h-2" />
            <CardTitle className="text-2xl font-headline text-center">
                {stepTitles[step]}
            </CardTitle>
        </CardHeader>
        <CardContent>
            {CurrentStepComponent && <CurrentStepComponent />}
        </CardContent>
    </Card>
  );
}
