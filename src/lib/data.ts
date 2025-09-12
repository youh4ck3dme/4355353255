import placeholderImages from './placeholder-images.json';
import { Product } from '@/app/dashboard/products/schema';


export const user = {
  name: 'Admin User',
  email: 'admin@woopanel.com',
  avatar: placeholderImages['main-user-avatar'],
};

// Updated stats for e-commerce dashboard
export const stats = [
  {
    title: 'Dnešné objednávky',
    value: '125',
    change: '+15% oproti včerajšku',
    icon: 'ShoppingCart',
  },
  {
    title: 'Dnešné tržby',
    value: '€8,450',
    change: '+22% oproti včerajšku',
    icon: 'DollarSign',
  },
  {
    title: 'Nové registrácie',
    value: '+32',
    change: 'od polnoci',
    icon: 'UserPlus',
  },
  {
    title: 'Priem. hodnota objednávky',
    value: '€67.60',
    change: '+3% tento týždeň',
    icon: 'Activity',
  },
];

export const overviewData = [
  { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jul', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Aug', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Sep', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Oct', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Nov', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Dec', total: Math.floor(Math.random() * 5000) + 1000 },
];

export const recentSalesData = [
    { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+€199.99', product: 'Protein Whey', avatar: placeholderImages['user-avatar-1'] },
    { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+€29.50', product: 'Fitness Legíny', avatar: placeholderImages['user-avatar-2'] },
    { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+€299.00', product: 'Bežecký pás 2000', avatar: placeholderImages['user-avatar-3'] },
    { name: 'William Kim', email: 'will@email.com', amount: '+€79.00', product: 'Sada činiek', avatar: placeholderImages['user-avatar-4'] },
    { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+€39.00', product: 'Yoga podložka', avatar: placeholderImages['user-avatar-5'] },
];

export const topProducts = [
    { name: 'Protein Whey 1kg', sold: 580 },
    { name: 'Fitness Legíny Pro', sold: 450 },
    { name: 'Kreatín Monohydrát', sold: 320 },
    { name: 'Sada činiek 20kg', sold: 210 },
    { name: 'BCAA 500g', sold: 180 },
]

export const files = [
  { id: '1', name: 'Project Proposal.docx', type: 'file', owner: 'You', size: '2.3 MB', modified: '2 days ago' },
  { id: '2', name: 'Marketing Assets', type: 'folder', owner: 'You', size: '1.1 GB', modified: '3 days ago' },
  { id: '3', name: 'Website Mockups', type: 'folder', owner: 'Jane Doe', size: '750 MB', modified: '5 days ago' },
  { id: '4', name: 'Q3 Financials.xlsx', type: 'file', owner: 'You', size: '800 KB', modified: '1 week ago' },
  { id: '5', name: 'product-launch.mov', type: 'file', owner: 'John Smith', size: '4.2 GB', modified: '1 week ago' },
  { id: '6', name: 'Archived Projects', type: 'folder', owner: 'You', size: '15 GB', modified: '2 weeks ago' },
];

export const tasks = [
    { id: 'task-1', title: 'Design new landing page', status: 'todo', priority: 'high', dueDate: '2024-08-15' },
    { id: 'task-2', title: 'Develop user authentication', status: 'in-progress', priority: 'high', dueDate: '2024-08-20' },
    { id: 'task-3', title: 'Write API documentation', status: 'in-progress', priority: 'medium', dueDate: '2024-08-25' },
    { id: 'task-4', title: 'Fix bug #1024', status: 'done', priority: 'low', dueDate: '2024-07-30' },
    { id: 'task-5', title: 'Setup staging environment', status: 'todo', priority: 'medium', dueDate: '2024-08-12' },
    { id: 'task-6', title: 'User testing session for new feature', status: 'backlog', priority: 'medium', dueDate: null },
    { id: 'task-7', title: 'Update dependencies', status: 'done', priority: 'low', dueDate: '2024-08-01' },
];

export let products: Product[] = [
    { id: '1', name: 'Protein Whey 1kg', sku: 'PW-1000', price: 49.99, stock: 120, status: 'Aktívny', imageUrl: placeholderImages['product-1'], category: 'doplnky', description: 'Vysoko kvalitný srvátkový proteín pre rast svalov.' },
    { id: '2', name: 'Fitness Legíny Pro', sku: 'FL-PRO-M', price: 39.90, stock: 80, status: 'Aktívny', imageUrl: placeholderImages['product-2'], category: 'oblecenie', description: 'Pohodlné a štýlové legíny na cvičenie.' },
    { id: '3', name: 'Bežecký pás 2000', sku: 'TM-2000', price: 899.00, stock: 15, status: 'Aktívny', imageUrl: placeholderImages['product-3'], category: 'vybavenie', description: 'Profesionálny bežecký pás pre domáce použitie.' },
    { id: '4', name: 'Sada činiek 20kg', sku: 'DB-SET-20', price: 79.99, stock: 50, status: 'Koncept', imageUrl: placeholderImages['product-4'], category: 'vybavenie', description: 'Nastaviteľná sada činiek pre silový tréning.' },
    { id: '5', name: 'Yoga podložka Eco', sku: 'YM-ECO-BL', price: 25.00, stock: 200, status: 'Aktívny', imageUrl: placeholderImages['product-5'], category: 'vybavenie', description: 'Ekologická podložka na jogu a pilates.' },
    { id: '6', name: 'Kreatín Monohydrát', sku: 'CM-500', price: 22.50, stock: 0, status: 'Vypredaný', imageUrl: placeholderImages['product-6'], category: 'doplnky', description: 'Zvýšte svoju silu a výkon s čistým kreatínom.' },
];

export const customers = [
    { id: 'cust-1', name: 'Ján Novák', email: 'jan.novak@example.com', registrationDate: '2023-01-15', totalOrders: 5, totalSpent: 350.50 },
    { id: 'cust-2', name: 'Mária Kováčová', email: 'maria.kovacova@example.com', registrationDate: '2023-03-22', totalOrders: 12, totalSpent: 1250.00 },
    { id: 'cust-3', name: 'Peter Horváth', email: 'peter.horvath@example.com', registrationDate: '2023-05-10', totalOrders: 2, totalSpent: 89.90 },
    { id: 'cust-4', name: 'Eva Vargová', email: 'eva.vargova@example.com', registrationDate: '2023-07-19', totalOrders: 8, totalSpent: 620.25 },
    { id: 'cust-5', name: 'Lukáš Molnár', email: 'lukas.molnar@example.com', registrationDate: '2023-09-01', totalOrders: 1, totalSpent: 49.99 },
];

export const orders = [
    { id: 'ORD-001', customerName: 'Ján Novák', date: '2024-08-01', amount: 75.50, status: 'Odoslaná' },
    { id: 'ORD-002', customerName: 'Mária Kováčová', date: '2024-08-01', amount: 120.00, status: 'Spracováva sa' },
    { id: 'ORD-003', customerName: 'Eva Vargová', date: '2024-07-31', amount: 45.00, status: 'Doručená' },
    { id: 'ORD-004', customerName: 'Peter Horváth', date: '2024-07-30', amount: 89.90, status: 'Doručená' },
    { id: 'ORD-005', customerName: 'Ján Novák', date: '2024-07-29', amount: 210.00, status: 'Zrušená' },
];
