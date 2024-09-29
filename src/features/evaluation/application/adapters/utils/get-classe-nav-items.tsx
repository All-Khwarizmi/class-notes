import Dashboard from '@/core/components/icons/Dashboard';
import { Sequence } from '@/features/cours-sequence/domain/entities/cours-schemas';
import { NavItem } from '@/lib/types';
import {
  Presentation,
  Plus,
  CandlestickChart,
  NotebookPen,
} from 'lucide-react';

export default function getClassNavItems(options: {
  sequences: Sequence[];
  classeId: string;
}) {
  const sequenceNavItems: NavItem[] = options.sequences.map((sequence) => ({
    title: sequence.name,
    href: `/sequences/${sequence._id}?type=sequence`,
    icon: <Presentation size={16} />,
  }));

  sequenceNavItems.push({
    title: 'Add new sequence',
    href: `/classes/sequences/${options.classeId}`,
    icon: <Plus size={16} />,
  });
  const classeNavItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Dashboard(),
    },
    {
      title: 'Sequences',
      href: `#`,
      icon: <Presentation size={16} />,
      isChidren: true,
      children: sequenceNavItems,
    },
    {
      title: 'Evaluations',
      href: `/evaluations`,
      icon: <CandlestickChart size={16} />,
    },
    {
      title: 'Notes',
      href: `/classes/notes/${options.classeId}`,
      icon: <NotebookPen size={16} />,
    },
  ];

  return classeNavItems;
}
