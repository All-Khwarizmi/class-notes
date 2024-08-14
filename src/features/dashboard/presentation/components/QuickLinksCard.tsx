import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/core/components/ui/card";
import Link from "next/link";

function QuickLinksCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
        <CardDescription>
          Access key features and actions quickly.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Link
          href="/sequences/add"
          className="inline-flex items-center justify-between gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <div className="h-4 w-4" />
          Create Sequence
        </Link>
        <Link
          href="classes/add"
          className="inline-flex items-center justify-between gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <div className="h-4 w-4" />
          Create Classe
        </Link>
        <Link
          href="#"
          className="inline-flex items-center justify-between gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <div className="h-4 w-4" />
          Create Resource
        </Link>
      </CardContent>
    </Card>
  );
}

export default QuickLinksCard;
