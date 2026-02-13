'use client';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

type OrderCardProps = {
    order: Order;
    userId: string;
}

export function OrderCard({ order, userId }: OrderCardProps) {
    const unitPrice = order.quantity > 0 ? order.totalAmount / order.quantity : 0;

    return (
        <Card key={order.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <div className="flex flex-wrap justify-between items-center gap-2">
                <div>
                    <CardTitle className="text-lg">Order #{order.id.slice(-6)}</CardTitle>
                    <CardDescription>
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </CardDescription>
                </div>
                <div className="flex items-center gap-4 text-right">
                    <div>
                        <p className="font-semibold text-foreground">{order.productName}</p>
                        <p className="text-muted-foreground">
                            {order.quantity} x UGX{' '}
                            {unitPrice.toLocaleString()}
                        </p>
                    </div>
                    {order.productImageUrl && (
                        <Image 
                            src={order.productImageUrl}
                            alt={order.productName || ''}
                            width={64}
                            height={64}
                            className="rounded-md object-cover w-16 h-16"
                        />
                    )}
                </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Fulfillment Details</h3>
              <p className="text-sm">
                <strong>Method:</strong> {order.fulfillmentMethod}
              </p>
              {order.fulfillmentMethod === 'delivery' ? (
                <>
                  <p className="text-sm">
                    <strong>Address:</strong> {order.deliveryAddress}
                  </p>
                  {order.landmark && (
                    <p className="text-sm">
                      <strong>Landmark:</strong> {order.landmark}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm">
                  <strong>Pickup Point:</strong> {order.pickupPointId}
                </p>
              )}
              <p className="text-sm">
                <strong>Phone:</strong> {order.phoneNumber}
              </p>
            </div>
            <div className="md:text-right self-end">
                <p className="text-sm text-muted-foreground">Status: {order.status}</p>
              <p className="text-2xl font-bold font-headline text-accent">
                UGX {order.totalAmount.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
    );
}
