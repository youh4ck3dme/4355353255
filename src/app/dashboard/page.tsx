import { stats, topProducts, recentSalesData, overviewData } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OverviewChart } from '@/components/dashboard/overview-chart';
import { RecentSales } from '@/components/dashboard/recent-sales';
import * as Lucide from 'lucide-react';
import React from 'react';
import { CardSummary } from '@/components/card-summary';


type IconName = keyof typeof Lucide;

export default function DashboardPage() {
  
  const revenue = parseFloat(stats.find(s => s.title === 'Dnešné tržby')?.value.replace('€', '').replace(',', '') || '0');
  const orders = parseInt(stats.find(s => s.title === 'Dnešné objednávky')?.value || '0');

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
                   {topProducts.length === 0 && (
                      <div className="text-center p-8 text-muted-foreground">
                        Žiadne top produkty.
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
            <CardSummary revenue={revenue} orders={orders}/>
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
