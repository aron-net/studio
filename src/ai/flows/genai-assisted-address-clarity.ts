'use server';
/**
 * @fileOverview A Genkit flow to analyze delivery addresses and landmarks for clarity and completeness,
 * providing suggestions for improvement to ensure accurate delivery.
 *
 * - genaiAssistedAddressClarity - A function that handles the address clarity analysis process.
 * - GenaiAssistedAddressClarityInput - The input type for the genaiAssistedAddressClarity function.
 * - GenaiAssistedAddressClarityOutput - The return type for the genaiAssistedAddressClarity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenaiAssistedAddressClarityInputSchema = z.object({
  deliveryAddress: z
    .string()
    .min(1)
    .describe('The primary delivery address provided by the customer.'),
  landmark: z
    .string()
    .optional()
    .describe('An optional landmark to help locate the delivery address.'),
});
export type GenaiAssistedAddressClarityInput = z.infer<
  typeof GenaiAssistedAddressClarityInputSchema
>;

const GenaiAssistedAddressClarityOutputSchema = z.object({
  isClear: z
    .boolean()
    .describe(
      'True if the address and landmark are considered clear and complete; otherwise, false.'
    ),
  suggestions: z
    .string()
    .describe(
      'Suggestions for improving the clarity and completeness of the address, or a confirmation message if already clear.'
    ),
  clarifiedAddress: z
    .string()
    .describe(
      'The delivery address, potentially rephrased by the AI for better clarity. If no rephrasing, it should be the original.'
    ),
  clarifiedLandmark: z
    .string()
    .optional()
    .describe(
      'The optional landmark, potentially rephrased by the AI for better clarity. If no rephrasing, it should be the original.'
    ),
});
export type GenaiAssistedAddressClarityOutput = z.infer<
  typeof GenaiAssistedAddressClarityOutputSchema
>;

export async function genaiAssistedAddressClarity(
  input: GenaiAssistedAddressClarityInput
): Promise<GenaiAssistedAddressClarityOutput> {
  return genaiAssistedAddressClarityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'genaiAssistedAddressClarityPrompt',
  input: {schema: GenaiAssistedAddressClarityInputSchema},
  output: {schema: GenaiAssistedAddressClarityOutputSchema},
  prompt: `You are an AI assistant designed to help improve the clarity and completeness of delivery addresses and landmarks for delivery drivers.

Analyze the provided delivery address and optional landmark. Your goal is to ensure the delivery driver has the best possible information.

- If the address is already very clear and complete, set 'isClear' to true and provide a positive confirmation message in 'suggestions'. Return the original address and landmark as 'clarifiedAddress' and 'clarifiedLandmark'.
- If the address or landmark could be improved, set 'isClear' to false. Provide subtle, constructive suggestions for rephrasing or adding details in 'suggestions'. You may also provide a slightly rephrased 'clarifiedAddress' and 'clarifiedLandmark' if a simple rephrasing improves clarity, otherwise, keep them as original.

Consider the following aspects:
- Specificity (e.g., house number, apartment/suite number, street name clarity).
- Ambiguity (e.g., common street names, unclear descriptions).
- Usefulness of the landmark (if provided).

Delivery Address: {{{deliveryAddress}}}
Landmark: {{{landmark}}}`,
});

const genaiAssistedAddressClarityFlow = ai.defineFlow(
  {
    name: 'genaiAssistedAddressClarityFlow',
    inputSchema: GenaiAssistedAddressClarityInputSchema,
    outputSchema: GenaiAssistedAddressClarityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
