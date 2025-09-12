import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { recentSalesData } from '@/lib/data';

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSalesData.map((sale) => (
        <div className="flex items-center" key={sale.email}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.avatar} alt="Avatar" data-ai-hint="user avatar" />
            <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto text-right">
            <div className="font-medium">{sale.amount}</div>
            <div className="text-xs text-muted-foreground">{sale.product}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
