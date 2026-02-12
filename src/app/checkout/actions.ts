// @ts-nocheck
'use server';

import { genaiAssistedAddressClarity } from '@/ai/flows/genai-assisted-address-clarity';

export async function clarifyAddressAction(previousState: any, formData: FormData) {
  const deliveryAddress = formData.get('deliveryAddress') as string;
  const landmark = formData.get('landmark') as string;

  if (!deliveryAddress) {
    return {
      isClear: false,
      suggestions: 'Please enter a delivery address.',
      clarifiedAddress: '',
      clarifiedLandmark: landmark,
    };
  }

  try {
    const result = await genaiAssistedAddressClarity({ deliveryAddress, landmark });
    return result;
  } catch (error) {
    console.error('Error clarifying address:', error);
    return {
      isClear: false,
      suggestions: 'Could not clarify address at this time. Please check your details and try again.',
      clarifiedAddress: deliveryAddress,
      clarifiedLandmark: landmark,
    };
  }
}
