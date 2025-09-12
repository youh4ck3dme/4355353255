'use client';
import { stats, topProducts, recentSalesData, overviewData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OverviewChart } from '@/components/dashboard/overview-chart';
import { RecentSales } from '@/components/dashboard/recent-sales';
import * as Lucide from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { generateSalesSummary } from '@/ai/flows/generate-sales-summary';
import type { GenerateSalesSummaryOutput } from '@/ai/flows/generate-sales-summary';
import { Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type IconName = keyof typeof Lucide;

export default function DashboardPage() {
  const [aiSummary, setAiSummary] = useState<GenerateSalesSummaryOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    setAiSummary(null);
    try {
      // In a real app, you'd fetch this data from your database
      const revenue = stats.find(s => s.title === 'Dnešné tržby')?.value.replace('€', '').replace(',', '') || '0';
      const orders = stats.find(s => s.title === 'Dnešné objednávky')?.value || '0';

      const summary = await generateSalesSummary({
        revenue: parseFloat(revenue),
        orders: parseInt(orders),
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
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = Lucide[stat.icon as IconName] as React.ElementType;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Tržby za posledných 12 mesiacov</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart data={overviewData} />
          </CardContent>
        </Card>
        <div className="col-span-4 lg:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top produkty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product) => (
                    <div key={product.name} className="flex items-center">
                      <div>{product.name}</div>
                      <div className="ml-auto font-medium">{product.sold} ks</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
        </div>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Posledné objednávky</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
