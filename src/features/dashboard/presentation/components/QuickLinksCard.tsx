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
import { Button } from "@/core/components/ui/button";

function QuickLinksCard() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
        <CardDescription>
          Access key features and actions quickly.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Link
          href="/sequences/add"
          className="inline-flex items-center bg-transparent justify-between gap-2 rounded-md  px-4 py-2 text-sm font-medium text-primary-foreground transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <div className="h-4 w-4" />
          Create Sequence
        </Link>
        <Link
          href="classes/add"
          className="inline-flex items-center justify-between gap-2 rounded-md px-4 py-2 text-sm font-medium text-primary-foreground transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <div className="h-4 w-4" />
          Create Classe
        </Link>
        <Link
          href="/evaluations/add"
          className="inline-flex items-center justify-between gap-2 rounded-md  px-4 py-2 text-sm font-medium text-primary-foreground transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <div className="h-4 w-4" />
          Create Evaluation
        </Link>
      </CardContent>
    </Card>
  );
}

export default QuickLinksCard;
