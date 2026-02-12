'use client';

import { useCheckout } from '@/context/CheckoutContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Order } from '@/lib/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function StepPlaceOrder() {
  const { product, quantity, fulfillmentMethod, deliveryAddress, landmark, pickupPoint, phone, prevStep, resetCheckout } = useCheckout();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);

  const handlePlaceOrder = () => {
    if (!product) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const orderId = `${Date.now()}${Math.random().toString(36).substring(2, 8)}`;
      const totalPrice = product.price * quantity;

      const newOrder: Order = {
        id: orderId,
        product,
        quantity,
        totalPrice,
        fulfillmentMethod: fulfillmentMethod!,
        deliveryAddress,
        landmark,
        pickupPoint,
        phone,
        timestamp: new Date().toISOString(),
      };

      setOrders([...orders, newOrder]);
      setIsLoading(false);
      toast({
        title: 'Order Placed!',
        description: 'Your order has been successfully submitted.',
      });
      resetCheckout();
      router.push('/');
    }, 800);
  };
  
  if (!product || !fulfillmentMethod) return null;

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-headline">Review Your Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="font-semibold">{product.name}</div>
                <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span>{quantity}</span>
                </div>
                 <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{product.currency} {(product.price * quantity).toLocaleString()}</span>
                </div>
                <hr/>
                <div>
                    <p><strong>Fulfillment:</strong> {fulfillmentMethod}</p>
                    {fulfillmentMethod === 'delivery' ? (
                        <>
                            <p><strong>Address:</strong> {deliveryAddress}</p>
                            <p><strong>Landmark:</strong> {landmark || 'N/A'}</p>
                        </>
                    ) : (
                        <p><strong>Pickup:</strong> {pickupPoint}</p>
                    )}
                    <p><strong>Phone:</strong> {phone}</p>
                </div>
            </CardContent>
        </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={isLoading}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handlePlaceOrder} disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Placing Order...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> Place Order
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
