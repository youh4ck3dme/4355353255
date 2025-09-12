'use server';

/**
 * @fileOverview An AI agent that generates a sales summary and recommendations.
 *
 * - generateSalesSummary - A function that handles sales summary generation.
 * - GenerateSalesSummaryInput - The input type for the generateSalesSummary function.
 * - GenerateSalesSummaryOutput - The return type for the generateSalesSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateSalesSummaryInputSchema = z.object({
  revenue: z.number().describe('Total revenue for the period.'),
  orders: z.number().describe('Total number of orders for the period.'),
  topProducts: z.array(z.object({
      name: z.string(),
      sold: z.number(),
  })).describe('List of top selling products.'),
});
export type GenerateSalesSummaryInput = z.infer<typeof GenerateSalesSummaryInputSchema>;

const GenerateSalesSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise, insightful summary of the sales performance.'),
  recommendations: z.string().describe('Actionable recommendations based on the sales data.'),
});
export type GenerateSalesSummaryOutput = z.infer<typeof GenerateSalesSummaryOutputSchema>;

export async function generateSalesSummary(input: GenerateSalesSummaryInput): Promise<GenerateSalesSummaryOutput> {
  return generateSalesSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSalesSummaryPrompt',
  input: {schema: GenerateSalesSummaryInputSchema},
  output: {schema: GenerateSalesSummaryOutputSchema},
  prompt: `You are an expert e-commerce analyst. Your task is to analyze the provided sales data and generate a brief, insightful summary and a key recommendation. Be encouraging but also direct. Address the user as "you". The language is Slovak.

Sales Data:
- Revenue: €{{{revenue}}}
- Orders: {{{orders}}}
- Top Selling Products:
{{#each topProducts}}
  - {{{name}}} ({{sold}} sold)
{{/each}}

Based on this data, generate a summary and one key recommendation. For example, if a product is selling well, suggest a promotion for it. If sales are low, suggest a marketing campaign.
`,
});

const generateSalesSummaryFlow = ai.defineFlow(
  {
    name: 'generateSalesSummaryFlow',
    inputSchema: GenerateSalesSummaryInputSchema,
    outputSchema: GenerateSalesSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
