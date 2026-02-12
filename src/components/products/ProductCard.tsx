import type { Product } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
    const productImage = PlaceHolderImages.find(p => p.id === product.id.toString());

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`} className="block relative aspect-[3/2] w-full">
            {productImage ? (
                <Image
                    src={productImage.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint={productImage.imageHint}
                />
            ) : (
                <div className="bg-muted flex items-center justify-center h-full">
                    <span className="text-muted-foreground">No Image</span>
                </div>
            )}
        </Link>
      </CardHeader>
      <CardContent className="pt-6 flex-grow">
        <CardTitle className="text-xl font-headline leading-tight mb-2">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <CardDescription>{product.shortDescription}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="font-bold text-lg font-headline text-accent">
          {product.currency} {product.price.toLocaleString()}
        </p>
        <Button asChild variant="ghost" className="text-accent hover:text-accent">
          <Link href={`/product/${product.id}`}>
            View Package <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
