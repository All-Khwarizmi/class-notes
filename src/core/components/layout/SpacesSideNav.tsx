"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/core/application/common/useSidebar";
import { buttonVariants } from "@/core/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/core/components/layout/SubNavAccordion";
import { useSpacesLayoutContext } from "./SpacesLayoutCtx";

interface SideNavProps {
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SpacesSideNav({ setOpen, className }: SideNavProps) {
  const { spacesNavItems } = useSpacesLayoutContext();
  const items = useMemo(() => spacesNavItems || [], [spacesNavItems]);

  const path = usePathname();
  const { isOpen, toggle } = useSidebar();
  const [openItem, setOpenItem] = useState("");
  const [lastOpenItem, setLastOpenItem] = useState("");
  const [liveHref, setLiveHref] = useState(path);

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }
  }, [isOpen, lastOpenItem, openItem]);

  useEffect(() => {
    if (spacesNavItems && spacesNavItems.length < 1) {
      toggle(false);
    }
  }, [spacesNavItems, toggle]);

  useEffect(() => {
    setLiveHref(path);
  }, [path]);

  function handleOpenItem(value: string) {
    if (!isOpen) {
      toggle(true);
      setTimeout(() => {
        setOpenItem(value);
      }, 250);
    } else {
      setOpenItem(value);
    }
  }

  function pathIsActive(props: { path: string; liveHref: string }) {
    let { path, liveHref } = props;

    if (path.split("/").length > 2) return false;

    if (path.includes("?")) {
      path = path.split("?")[0];
    }

    return liveHref.split("/")[1] === path.split("/")[1];
  }

  return (
    <nav className="space-y-2" aria-label="Sidebar Navigation">
      {items.map((item) =>
        item.isChidren ? (
          <Accordion
            key={item.title}
            type="single"
            collapsible
            className="space-y-2"
            value={openItem}
            onValueChange={handleOpenItem}
          >
            <AccordionItem value={item.title} className="border-none">
              <AccordionTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathIsActive({ path: item.href, liveHref }) && "bg-muted",
                  `dark:${item.color} hover:bg-muted`,
                  "group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline"
                )}
              >
                <div
                  className={cn(
                    "flex items-center",
                    !isOpen && "w-full justify-center"
                  )}
                >
                  <span className="flex-shrink-0 w-6 h-6 mr-3">
                    {item.icon}
                  </span>
                  <span className={cn("flex-grow", !isOpen && "sr-only")}>
                    {item.title}
                  </span>
                </div>
                {isOpen && (
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                )}
              </AccordionTrigger>
              <AccordionContent className="mt-2 space-y-4 pb-1">
                {item.children?.map((child) => (
                  <Link
                    key={child.title}
                    href={child.href}
                    onClick={() => setOpen?.(false)}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "group relative flex h-12 items-center justify-start gap-x-3 ml-4",
                      `dark:${child.color} hover:bg-muted`,
                      pathIsActive({ path: child.href, liveHref }) &&
                        "bg-muted font-bold hover:bg-muted"
                    )}
                  >
                    <span className="flex-shrink-0 w-6 h-6">{child.icon}</span>
                    <span className={cn("flex-grow", !isOpen && "sr-only")}>
                      {child.title}
                    </span>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => setOpen?.(false)}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "group relative flex h-12 items-center justify-start",
              `dark:${item.color} hover:bg-muted`,
              pathIsActive({ path: item.href, liveHref: liveHref }) &&
                "bg-secondary font-bold hover:bg-muted"
            )}
          >
            <div
              className={cn(
                "flex items-center w-full",
                !isOpen && "justify-center"
              )}
            >
              <span className="flex-shrink-0 w-6 h-6 mr-3">{item.icon}</span>
              <span className={cn("flex-grow", !isOpen && "sr-only")}>
                {item.title}
              </span>
            </div>
          </Link>
        )
      )}
    </nav>
  );
}
