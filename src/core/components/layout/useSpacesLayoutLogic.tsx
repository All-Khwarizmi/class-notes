import { NavItem } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function useSpacesLayoutLogic() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  return {
    navItems,
    setNavItems,
  };
}
