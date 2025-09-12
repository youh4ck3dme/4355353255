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
