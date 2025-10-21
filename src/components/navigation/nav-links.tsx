import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

import {
  LayoutDashboard,
  Users,
  Boxes,
  FileText,
  Settings,
  Wrench
} from 'lucide-react';

const links = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    href: '/customers',
    label: 'Customers',
    icon: Users
  },
  {
    href: '/orders',
    label: 'Orders',
    icon: Boxes
  },
  {
    href: '/tracking',
    label: 'Tracking',
    icon: FileText
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings
  },
  {
    href: '/maintenance',
    label: 'Maintenance',
    icon: Wrench
  }
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100',
              pathname === link.href ? 'bg-slate-100' : ''
            )}
          >
            <Icon className="w-5 h-5" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}