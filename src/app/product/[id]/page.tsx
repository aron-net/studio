import { products } from '@/data/products';
import { ProductDetailsClient } from '@/components/products/ProductDetailsClient';
import { notFound } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const productImages = product.images.map(imgId => PlaceHolderImages.find(p => p.id === imgId)).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetailsClient product={product} productImages={productImages} />
    </div>
  );
}

export async function generateStaticParams() {
    return products.map((product) => ({
      id: product.id,
    }));
}
