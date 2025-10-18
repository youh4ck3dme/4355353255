import placeholderImages from './placeholder-images.json';
import { Product } from '@/app/dashboard/products/schema';
import type { Order } from '@/app/dashboard/orders/schema';
import type { Customer } from '@/app/dashboard/customers/schema';


export const user = {
  name: 'youh4ck3dme',
  email: 'h4ck3d@h4ck3d.me',
  avatar: placeholderImages['main-user-avatar'],
};

// Updated stats for e-commerce dashboard
export const stats: { title: string; value: string; change: string; icon: string; }[] = [
  {
    title: 'Dnešné tržby',
    value: '€1,329',
    change: '+20.1% od včera',
    icon: 'DollarSign',
  },
  {
    title: 'Dnešné objednávky',
    value: '+573',
    change: '+180.1% od včera',
    icon: 'ShoppingCart',
  },
  {
    title: 'Noví zákazníci',
    value: '+2,350',
    change: '+10% od minulého mesiaca',
    icon: 'Users',
  },
  {
    title: 'Aktívnych sessions',
    value: '98.5%',
    change: '+2.1% od poslednej hodiny',
    icon: 'Activity',
  }
];

export const overviewData: {name: string; total: number}[] = [
    { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Máj', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Jún', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Júl', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Aug', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Sep', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Okt', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Nov', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Dec', total: Math.floor(Math.random() * 5000) + 1000 },
];

export const recentSalesData: { name: string; email: string; amount: string; product: string; avatar: string; }[] = [
    {
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      amount: '+€1,999.00',
      product: 'Proteínový prášok',
      avatar: placeholderImages['user-avatar-1'],
    },
    {
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      amount: '+€39.00',
      product: 'Šejker',
      avatar: placeholderImages['user-avatar-2'],
    },
    {
      name: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      amount: '+€299.00',
      product: 'Bežecké tenisky',
      avatar: placeholderImages['user-avatar-3'],
    },
    {
      name: 'William Kim',
      email: 'will@email.com',
      amount: '+€99.00',
      product: 'Legíny',
      avatar: placeholderImages['user-avatar-4'],
    },
    {
      name: 'Sofia Davis',
      email: 'sofia.davis@email.com',
      amount: '+€39.00',
      product: 'Športová podprsenka',
      avatar: placeholderImages['user-avatar-5'],
    },
];

export const topProducts: { name: string; sold: number }[] = [
    { name: 'Srvátkový proteín (Jahoda)', sold: 215 },
    { name: 'Kreatín monohydrát', sold: 187 },
    { name: 'Bežecké tenisky "AirMax"', sold: 154 },
    { name: 'Kompresné tričko', sold: 121 },
    { name: 'Fľaša na vodu (1.5L)', sold: 98 },
];

export const files: { id: string; name: string; type: string; owner: string; size: string; modified: string; }[] = [
    { id: '1', name: 'Kvartálna správa Q3', type: 'folder', owner: 'Ja', size: '2.1 GB', modified: 'Včera' },
    { id: '2', name: 'Marketingové podklady', type: 'folder', owner: 'Marek', size: '800 MB', modified: '2 dni dozadu' },
    { id: '3', name: 'logo_final.svg', type: 'file', owner: 'Ja', size: '1.2 MB', modified: '1 týždeň dozadu' },
    { id: '4', name: 'cennik_2024.pdf', type: 'file', owner: 'Jana', size: '256 KB', modified: '1 mesiac dozadu' },
];

export const tasks: { id: string; title: string; status: string; priority: string; dueDate: string | null; }[] = [
    { id: '1', title: 'Dokončiť návrh pre novú kampaň', status: 'in-progress', priority: 'high', dueDate: '2024-10-29' },
    { id: '2', title: 'Opraviť chybu pri prihlasovaní', status: 'todo', priority: 'high', dueDate: '2024-10-25' },
    { id: '3', title: 'Napísať blogový príspevok o ...', status: 'backlog', priority: 'low', dueDate: null },
    { id: '4', title: 'Aktualizovať podmienky používania', status: 'done', priority: 'medium', dueDate: '2024-10-15' },
    { id: '5', title: 'Pripraviť podklady pre meeting', status: 'in-progress', priority: 'medium', dueDate: '2024-10-24' },
];
