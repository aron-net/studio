'use client';

import { useCheckout } from '@/context/CheckoutContext';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/components/products/QuantitySelector';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function StepSummary() {
  const { product, quantity, setQuantity, nextStep } = useCheckout();

  if (!product) return null;
  
  const productImage = PlaceHolderImages.find(p => p.id === product.id.toString());
  const totalPrice = product.price * quantity;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {productImage && (
            <div className="w-32 h-32 relative flex-shrink-0">
                <Image
                src={productImage.imageUrl}
                alt={product.name}
                fill
                className="rounded-lg object-cover"
                data-ai-hint={productImage.imageHint}
                />
            </div>
        )}
        <div className="flex-grow w-full">
          <h3 className="text-xl font-bold font-headline">{product.name}</h3>
          <p className="text-muted-foreground">
            Unit Price: {product.currency} {product.price.toLocaleString()}
          </p>
          <div className="flex items-center justify-between mt-2">
            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
              maxQuantity={product.stock}
            />
            <div className="text-right">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold font-headline">
                {product.currency} {totalPrice.toLocaleString()}
                </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={nextStep} className="bg-accent text-accent-foreground hover:bg-accent/90">Proceed</Button>
      </div>
    </div>
  );
}
