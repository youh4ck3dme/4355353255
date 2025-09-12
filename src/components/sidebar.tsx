'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  BarChartIcon,
  FileTextIcon,
  LayoutDashboard,
  ListTodo,
  Share2,
  Folder,
  Settings,
  HelpCircle,
  Package,
  Users,
  ShoppingCart
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Label } from './ui/label';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/orders', icon: ShoppingCart, label: 'Objednávky' },
  { href: '/dashboard/products', icon: Package, label: 'Produkty' },
  { href: '/dashboard/customers', icon: Users, label: 'Zákazníci' },
  { href: '/dashboard/files', icon: Folder, label: 'Cloud' },
  { href: '/dashboard/tasks', icon: ListTodo, label: 'Tasks' },
  { href: '/dashboard/ai-structurer', icon: Share2, label: 'AI Structurer' },
  { href: '/dashboard/analytics', icon: BarChartIcon, label: 'Analytics' },
  { href: '/dashboard/documents', icon: FileTextIcon, label: 'Documents' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-semibold">WOOPANEL</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
                  variant="default"
                  className="w-full justify-start"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-4">
        <div className="space-y-2">
            <Label htmlFor="storage" className="text-xs text-muted-foreground">Storage</Label>
            <Progress value={33} id="storage" />
            <p className="text-xs text-muted-foreground">2 GB of 10 GB used</p>
        </div>
        <Button variant="outline" className="w-full">
            <Link href="#">
                Upgrade Storage
            </Link>
        </Button>
        <div className="space-y-1">
             <Link href="#" legacyBehavior passHref>
                <SidebarMenuButton variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </SidebarMenuButton>
              </Link>
               <Link href="#" legacyBehavior passHref>
                <SidebarMenuButton variant="ghost" className="w-full justify-start">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help
                </SidebarMenuButton>
              </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
