import placeholderImages from './placeholder-images.json';
import { Product } from '@/app/dashboard/products/schema';
import type { Order } from '@/app/dashboard/orders/schema';
import type { Customer } from '@/app/dashboard/customers/schema';


export const user = {
  name: 'Admin User',
  email: 'admin@woopanel.com',
  avatar: placeholderImages['main-user-avatar'],
};

// Updated stats for e-commerce dashboard
export const stats = [
  {
    title: 'Dnešné objednávky',
    value: '0',
    change: '',
    icon: 'ShoppingCart',
  },
  {
    title: 'Dnešné tržby',
    value: '€0',
    change: '',
    icon: 'DollarSign',
  },
  {
    title: 'Nové registrácie',
    value: '0',
    change: 'od polnoci',
    icon: 'UserPlus',
  },
  {
    title: 'Priem. hodnota objednávky',
    value: '€0.00',
    change: '',
    icon: 'Activity',
  },
];

export const overviewData: {name: string; total: number}[] = [];

export const recentSalesData: { name: string; email: string; amount: string; product: string; avatar: string; }[] = [];

export const topProducts: { name: string; sold: number }[] = [];

export const files: { id: string; name: string; type: string; owner: string; size: string; modified: string; }[] = [];

export const tasks: { id: string; title: string; status: string; priority: string; dueDate: string | null; }[] = [];