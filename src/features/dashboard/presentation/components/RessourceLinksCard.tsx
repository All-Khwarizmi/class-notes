import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/core/components/ui/card";
import Link from "next/link";
import { Button } from "@/core/components/ui/button";

function RessourceLinksCard(props: { userId: string }) {
  return (
    <Card className=" ">
      <CardHeader>
        <CardTitle>Resource Links</CardTitle>
        <CardDescription>
          Quick access to important areas of the application.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Link
          href={`/spaces?user=${props.userId}`}
          className="inline-flex items-center justify-between gap-2 rounded-md bg-primary px-4 text-sm font-medium  py-2 text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <div className="h-4 w-4" />
          Spaces
        </Link>
        <Link
          href="/classes"
          className="inline-flex items-center justify-between gap-2  py-2 rounded-md bg-primary px-4  text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <div className="h-4 w-4" />
          Classes
        </Link>
        <Link
          href="/evaluations"
          className="inline-flex  py-2 items-center justify-between gap-2 rounded-md bg-primary px-4  text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <div className="h-4 w-4" />
          Evaluations
        </Link>
      </CardContent>
    </Card>
  );
}

export default RessourceLinksCard;
