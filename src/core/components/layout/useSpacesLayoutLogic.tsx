import { useEffect, useState } from "react";
import { NavItem } from "@/lib/types";

export default function useSpacesLayoutLogic() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);


  return {
    navItems,
    setNavItems,
  };
}
