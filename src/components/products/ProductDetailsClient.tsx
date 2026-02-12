"use client";

import type { Product } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "./QuantitySelector";
import { Badge } from "@/components/ui/badge";
import { Heart, CheckCircle, XCircle, ShoppingCart } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

type ProductDetailsClientProps = {
  product: Product;
  productImages: (ImagePlaceholder | undefined)[];
};

export function ProductDetailsClient({
  product,
  productImages,
}: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { setProduct, setQuantity: setCheckoutQuantity } = useCheckout();

  const handleBuyNow = () => {
    setProduct(product, quantity);
    router.push("/checkout");
  };

  const inStock = product.stock > 0;

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <Carousel className="w-full">
          <CarouselContent>
            {productImages.map(
              (img, index) =>
                img && (
                  <CarouselItem key={index}>
                    <div className="relative w-full rounded-lg overflow-hidden border">
                      <Image
                        src={img.imageUrl}
                        alt={`${product.name} image ${index + 1}`}
                        width={800} // or any suitable width
                        height={600} // keep aspect ratio of your image
                        className="object-contain w-full h-auto"
                        data-ai-hint={img.imageHint}
                      />
                    </div>
                  </CarouselItem>
                ),
            )}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold font-headline">
            {product.name}
          </h1>

          <div className="my-6">
            <p className="text-4xl font-bold font-headline text-accent">
              {product.currency} {product.price.toLocaleString()}
            </p>
            {inStock ? (
              <Badge
                variant="secondary"
                className="mt-2 bg-green-100 text-green-800 border-green-200"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                In Stock ({product.stock} available)
              </Badge>
            ) : (
              <Badge variant="destructive">
                <XCircle className="mr-2 h-4 w-4" />
                Out of Stock
              </Badge>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-accent" /> Package Contents
            </h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              {product.contents.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
              maxQuantity={product.stock}
              disabled={!inStock}
            />
            <Button
              size="lg"
              onClick={handleBuyNow}
              disabled={!inStock}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
