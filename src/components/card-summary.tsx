'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as Lucide from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { generateSalesSummary } from '@/ai/flows/generate-sales-summary';
import type { GenerateSalesSummaryOutput } from '@/ai/flows/generate-sales-summary';
import { Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { topProducts } from '@/lib/data';

export function CardSummary({revenue, orders}: {revenue: number, orders: number}) {
  const [aiSummary, setAiSummary] = useState<GenerateSalesSummaryOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    setAiSummary(null);
    try {
      // In a real app, you'd fetch this data from your database
      const summary = await generateSalesSummary({
        revenue,
        orders,
        topProducts: topProducts,
      });
      setAiSummary(summary);
    } catch (error) {
      toast({
        title: 'Chyba pri generovaní',
        description: 'Nepodarilo sa vygenerovať AI report.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  }

    return (
        <Card>
            <CardHeader>
            <CardTitle>AI Týždenný Prehľad</CardTitle>
            </CardHeader>
            <CardContent>
            {isGenerating && <div className="flex items-center gap-2"><Loader className="animate-spin h-5 w-5"/>Generujem...</div>}
            {aiSummary ? (
                <div className="space-y-2 text-sm">
                    <p><strong>Zhrnutie:</strong> {aiSummary.summary}</p>
                    <p><strong>Odporúčanie:</strong> {aiSummary.recommendations}</p>
                </div>
            ): (
                !isGenerating && <p className="text-sm text-muted-foreground">Získajte prehľad o výkonnosti vášho obchodu.</p>
            )}
            <Button onClick={handleGenerateSummary} disabled={isGenerating} className="mt-4 w-full">
                {isGenerating ? 'Analyzujem dáta...' : 'Generovať report'}
            </Button>
            </CardContent>
        </Card>
    )
}
