"use client";

import { useCheckout } from "@/context/CheckoutContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Order, OrderItem } from "@/lib/types";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFirebase, useUser } from "@/firebase";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { collection } from "firebase/firestore";

export function StepPlaceOrder() {
  const {
    product,
    quantity,
    fulfillmentMethod,
    deliveryAddress,
    landmark,
    pickupPoint,
    phone,
    prevStep,
    resetCheckout,
  } = useCheckout();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { firestore } = useFirebase();
  const { user } = useUser();

  const handlePlaceOrder = async () => {
    if (!product || !user || !firestore || !fulfillmentMethod) {
      toast({
        title: "Error",
        description: "Could not place order. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const totalPrice = product.price * quantity;

    // Construct the base order object
    const newOrder: Omit<Order, "id"> = {
      userId: user.uid,
      orderDate: new Date().toISOString(),
      totalAmount: totalPrice,
      fulfillmentMethod: fulfillmentMethod,
      phoneNumber: phone,
      status: "Placed",
      // Conditionally add fulfillment-specific fields
      ...(fulfillmentMethod === "delivery"
        ? { deliveryAddress: deliveryAddress, landmark: landmark }
        : { pickupPointId: pickupPoint }),
    };

    try {
      const ordersCollection = collection(
        firestore,
        "users",
        user.uid,
        "orders",
      );
      const orderDocRef = await addDocumentNonBlocking(
        ordersCollection,
        newOrder,
      );

      if (orderDocRef) {
        const newOrderItem: Omit<OrderItem, "id" | "orderId"> = {
          productId: product.id,
          productName: product.name,
          quantity: quantity,
          unitPrice: product.price,
          subtotalAmount: totalPrice,
        };
        const orderItemsCollection = collection(
          firestore,
          "users",
          user.uid,
          "orders",
          orderDocRef.id,
          "orderItems",
        );
        await addDocumentNonBlocking(orderItemsCollection, {
          ...newOrderItem,
          orderId: orderDocRef.id,
        });

        setIsLoading(false);
        toast({
          title: "Order Placed!",
          description: "Thank you! Our Agent will Contact You” ",
        });
        resetCheckout();
        router.push(`/success?orderId=${orderDocRef.id}`);
      } else {
        throw new Error("Failed to create order document.");
      }
    } catch (e) {
      console.error("Failed to place order: ", e);
      setIsLoading(false);
      toast({
        title: "Order Failed",
        description:
          "There was a problem placing your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!product || !fulfillmentMethod) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-headline">
            Review Your Order
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="font-semibold">{product.name}</div>
          <div className="flex justify-between">
            <span>Quantity:</span>
            <span>{quantity}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>
              {product.currency} {(product.price * quantity).toLocaleString()}
            </span>
          </div>
          <hr />
          <div>
            <p>
              <strong>Fulfillment:</strong> {fulfillmentMethod}
            </p>
            {fulfillmentMethod === "delivery" ? (
              <>
                <p>
                  <strong>Address:</strong> {deliveryAddress}
                </p>
                <p>
                  <strong>Landmark:</strong> {landmark || "N/A"}
                </p>
              </>
            ) : (
              <p>
                <strong>Pickup:</strong> {pickupPoint}
              </p>
            )}
            <p>
              <strong>Phone:</strong> {phone}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={isLoading}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={handlePlaceOrder}
          disabled={isLoading}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
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
