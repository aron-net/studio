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

export type OrderStatus = 'Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

// Corresponds to Order entity in backend.json
export type Order = {
  id: string;
  userId: string;
  orderDate: string;
  totalAmount: number;
  fulfillmentMethod: FulfillmentMethod;
  deliveryAddress?: string;
  landmark?: string;
  pickupPointId?: string;
  phoneNumber: string;
  status: OrderStatus;
};

// Corresponds to OrderItem entity in backend.json
export type OrderItem = {
    id: string;
    orderId: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotalAmount: number;
}

    