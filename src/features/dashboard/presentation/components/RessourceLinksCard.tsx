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

function RessourceLinksCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Links</CardTitle>
        <CardDescription>
          Quick access to important areas of the application.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Link
          href="#"
          className="inline-flex items-center justify-between gap-2 rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <div className="h-4 w-4" />
          Spaces
        </Link>
        <Link
          href="#"
          className="inline-flex items-center justify-between gap-2 rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <div className="h-4 w-4" />
          Classes
        </Link>
        <Link
          href="#"
          className="inline-flex items-center justify-between gap-2 rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <div className="h-4 w-4" />
          Resources
        </Link>
      </CardContent>
    </Card>
  );
}

export default RessourceLinksCard;
