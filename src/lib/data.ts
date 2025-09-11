import placeholderImages from './placeholder-images.json';

export const user = {
  name: 'Admin User',
  email: 'admin@woopanel.com',
  avatar: placeholderImages['main-user-avatar'],
};

export const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1% from last month',
    icon: 'DollarSign',
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    change: '+180.1% from last month',
    icon: 'Users',
  },
  {
    title: 'Sales',
    value: '+12,234',
    change: '+19% from last month',
    icon: 'CreditCard',
  },
  {
    title: 'Active Now',
    value: '+573',
    change: '+201 since last hour',
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
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00', avatar: placeholderImages['user-avatar-1'] },
  { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00', avatar: placeholderImages['user-avatar-2'] },
  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00', avatar: placeholderImages['user-avatar-3'] },
  { name: 'William Kim', email: 'will@email.com', amount: '+$99.00', avatar: placeholderImages['user-avatar-4'] },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00', avatar: placeholderImages['user-avatar-5'] },
];

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
