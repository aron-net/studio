import { products } from '@/data/products';
import { ProductGrid } from '@/components/products/ProductGrid';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative rounded-lg overflow-hidden mb-12 shadow-lg bg-card text-card-foreground">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {heroImage && (
             <Image
             src={heroImage.imageUrl}
             alt="Valentine's Day Packages"
             fill
             className="object-cover"
             data-ai-hint={heroImage.imageHint}
             priority
           />
        )}
        <div className="relative p-8 md:p-16 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-md">
            Unlock Their Heart's Desire
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-sm">
            This Valentine's, go beyond flowers and chocolates. Discover our exclusive beauty packages, curated to make them feel truly cherished and adored.
          </p>
        </div>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
