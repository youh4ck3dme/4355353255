/**
 * @fileOverview Schemas and types for the generateSalesSummary flow.
 */

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

export const GenerateSalesSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise, insightful summary of the sales performance.'),
  recommendations: z.string().describe('Actionable recommendations based on the sales data.'),
});
export type GenerateSalesSummaryOutput = z.infer<typeof GenerateSalesSummaryOutputSchema>;
