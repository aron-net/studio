'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

type QuantitySelectorProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  maxQuantity: number;
  disabled?: boolean;
};

export function QuantitySelector({ quantity, setQuantity, maxQuantity, disabled = false }: QuantitySelectorProps) {
  const increment = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-r-none"
        onClick={decrement}
        disabled={quantity <= 1 || disabled}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        className="h-10 w-16 text-center rounded-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        value={quantity}
        readOnly
        disabled={disabled}
        aria-label="Current quantity"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-l-none"
        onClick={increment}
        disabled={quantity >= maxQuantity || disabled}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
