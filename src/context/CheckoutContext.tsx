'use client';

import type { Product, FulfillmentMethod } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type CheckoutStep = 'summary' | 'confirm' | 'fulfillment' | 'delivery' | 'pickup' | 'contact' | 'final';

interface CheckoutContextType {
  product: Product | null;
  quantity: number;
  step: CheckoutStep;
  purchaseConfirmed: boolean;
  fulfillmentMethod: FulfillmentMethod | null;
  deliveryAddress: string;
  landmark: string;
  pickupPoint: string;
  phone: string;
  setProduct: (product: Product, quantity: number) => void;
  setQuantity: (quantity: number) => void;
  setStep: (step: CheckoutStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  confirmPurchase: () => void;
  setFulfillment: (method: FulfillmentMethod) => void;
  setDeliveryAddress: (address: string) => void;
  setLandmark: (landmark: string) => void;
  setPickupPoint: (point: string) => void;
  setPhone: (phone: string) => void;
  resetCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

const initialState = {
  product: null,
  quantity: 1,
  step: 'summary' as CheckoutStep,
  purchaseConfirmed: false,
  fulfillmentMethod: null,
  deliveryAddress: '',
  landmark: '',
  pickupPoint: '',
  phone: '',
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/checkout') && !state.product) {
      const savedState = sessionStorage.getItem('checkoutState');
      if(savedState) {
        setState(JSON.parse(savedState));
      } else {
        router.replace('/');
      }
    }
  }, [router, state.product]);

  useEffect(() => {
    if (state.product) {
      sessionStorage.setItem('checkoutState', JSON.stringify(state));
    } else {
      sessionStorage.removeItem('checkoutState');
    }
  }, [state]);

  const setProduct = (product: Product, quantity: number) => {
    setState({ ...initialState, product, quantity });
  };
  
  const setQuantity = (quantity: number) => setState(s => ({...s, quantity}));
  const setStep = (step: CheckoutStep) => setState(s => ({...s, step}));
  
  const confirmPurchase = () => {
    setState(s => ({...s, purchaseConfirmed: true, step: 'fulfillment'}));
  }

  const setFulfillment = (method: FulfillmentMethod) => {
    setState(s => ({...s, fulfillmentMethod: method}));
  }

  const setDeliveryAddress = (address: string) => setState(s => ({...s, deliveryAddress: address}));
  const setLandmark = (landmark: string) => setState(s => ({...s, landmark}));
  const setPickupPoint = (point: string) => setState(s => ({...s, pickupPoint: point}));
  const setPhone = (phone: string) => setState(s => ({...s, phone}));
  
  const resetCheckout = useCallback(() => {
    setState(initialState);
    sessionStorage.removeItem('checkoutState');
  }, []);

  const nextStep = () => {
    setState(s => {
        switch(s.step) {
            case 'summary': return {...s, step: 'confirm'};
            case 'confirm': return {...s, step: 'fulfillment'};
            case 'fulfillment': return {...s, step: s.fulfillmentMethod === 'delivery' ? 'delivery' : 'pickup'};
            case 'delivery': return {...s, step: 'contact'};
            case 'pickup': return {...s, step: 'contact'};
            case 'contact': return {...s, step: 'final'};
            default: return s;
        }
    });
  }

  const prevStep = () => {
    setState(s => {
        switch(s.step) {
            case 'confirm': return {...s, step: 'summary'};
            case 'fulfillment': return {...s, step: 'confirm'};
            case 'delivery': return {...s, step: 'fulfillment'};
            case 'pickup': return {...s, step: 'fulfillment'};
            case 'contact': return {...s, step: s.fulfillmentMethod === 'delivery' ? 'delivery' : 'pickup'};
            case 'final': return {...s, step: 'contact'};
            default: return s;
        }
    });
  }


  const value: CheckoutContextType = {
    ...state,
    setProduct,
    setQuantity,
    setStep,
    nextStep,
    prevStep,
    confirmPurchase,
    setFulfillment,
    setDeliveryAddress,
    setLandmark,
    setPickupPoint,
    setPhone,
    resetCheckout,
  };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
