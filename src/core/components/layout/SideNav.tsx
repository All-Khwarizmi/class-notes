"use client";
import Link from "next/link";

import { type NavItem } from "@/lib/types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/core/application/common/useSidebar";
import { buttonVariants } from "@/core/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/core/components/layout/SubNavAccordion";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
  const path = usePathname();
  console.log(path);
  const { isOpen } = useSidebar();
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
  }, [isOpen]);

  useEffect(() => {
    setLiveHref(path);
  }, [path]);

  function pathIsActive(props: { path: string; liveHref: string }) {
    console.log({
      fullLiveHref: props.liveHref,
      path: props.path.split("/")[1],
      liveHref: props.liveHref.split("/")[1],
    });
    return props.liveHref.split("/")[1] === props.path.split("/")[1];
  }
  return (
    <nav className="space-y-2">
      {items.map((item) =>
        item.isChidren ? (
          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            key={item.title}
            value={openItem}
            onValueChange={setOpenItem}
          >
            <AccordionItem value={item.title} className="border-none ">
              <AccordionTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathIsActive({ path: item.href, liveHref }) && "bg-muted",
                    "group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline"
                )}
              >
                <div>{item.icon}</div>
                <div
                  className={cn(
                    "absolute left-12 text-base duration-200 ",
                    !isOpen && className
                  )}
                >
                  {item.title}
                </div>

                {isOpen && (
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                )}
              </AccordionTrigger>
              <AccordionContent className="mt-2 space-y-4 pb-1">
                {" "}
                <Link
                  href={item.href}
                  onClick={() => {
                    if (setOpen) setOpen(false);
                  }}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "group relative flex h-12 justify-start gap-x-3",
                    pathIsActive({ path: item.href, liveHref }) &&
                      "bg-muted font-bold hover:bg-muted"
                  )}
                >
                  {item.icon}
                  <div
                    className={cn(
                      "absolute left-12 text-base duration-200",
                      !isOpen && className
                    )}
                  >
                    {item.title}
                  </div>
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.title}
                    href={child.href}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "group relative flex h-12 justify-start gap-x-3",
                      pathIsActive({ path: child.href, liveHref }) &&
                        "bg-muted font-bold hover:bg-muted"
                    )}
                  >
                    {child.icon}
                    <div
                      className={cn(
                        "absolute left-12 text-base duration-200",
                        !isOpen && className
                      )}
                    >
                      {child.title}
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "group relative flex h-12 justify-start",

              pathIsActive({ path: item.href, liveHref: liveHref }) &&
                "bg-secondary font-bold hover:bg-muted"
            )}
          >
            {item.icon}
            <span
              className={cn(
                "absolute left-12 text-base duration-200",
                !isOpen && className
              )}
            >
              {item.title}
            </span>
          </Link>
        )
      )}
    </nav>
  );
}
