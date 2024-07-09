import useGetClasses from "@/features/classe/presentation/services/hooks/useGetClasses";
import { NavItem } from "@/lib/types";
import { useSession, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Dashboard from "../icons/Dashboard";
import CopyClipboard from "../icons/CopyClipboard";

export default function useExperimentalLayoutLogic(userId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  const { data: classes, isLoading, isError } = useGetClasses({ userId });

  useEffect(() => {
    setLoading(isLoading);
    setError(isError);
  }, [isLoading, isError]);

  useEffect(() => {
    if (classes) {
      const classesNavItems = classes.right.map((classe) => ({
        title: classe.name,
        icon: CopyClipboard(),
        href: `/classes/class/${classe.id}`,
        color: "text-orange-500",
      }));
      console.log(classesNavItems);
      setNavItems((prev) => [
        {
          title: "Dashboard",
          icon: Dashboard(),
          href: "/dashboard",
          color: "text-sky-500",
        },
        {
          title: "Classes",
          icon: Dashboard(),
          href: "/classes",
          color: "text-sky-500",
          isChidren: true,
          children: classesNavItems,
        },
        {
          title: "My Space",
          icon: CopyClipboard(),
          href: `/spaces?user=${userId}`,
          color: "text-orange-500",
        },
      ]);
    }
  }, [classes, isLoading, isError]);

  return {
    loading,
    error,
    navItems,
  };
}
