export type Product = {
  id: string;
  name: string;
  price: number;
  currency: 'UGX';
  shortDescription: string;
  description: string;
  contents: string[];
  images: string[];
  stock: number;
};

export type FulfillmentMethod = 'delivery' | 'pickup';

export type Order = {
  id: string;
  product: Product;
  quantity: number;
  totalPrice: number;
  fulfillmentMethod: FulfillmentMethod;
  deliveryAddress?: string;
  landmark?: string;
  pickupPoint?: string;
  phone: string;
  timestamp: string;
};
