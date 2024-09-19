"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, Home, RotateCcw, MessageCircle } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/core/components/ui/alert";
import { SUPPORT_EMAIL } from "../constants/support";

interface ErrorDialogProps {
  message: string;
  path?: string;
  code?: string;
  description?: string;
  onTryAgain?: () => void;
}

export default function ErrorDialog({
  message,
  path,
  code,
  description,
  onTryAgain,
}: ErrorDialogProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <span>Oups, une erreur s&apos;est produite !</span>
          </CardTitle>
          <CardDescription>
            Nous sommes désolés, mais une erreur inattendue s&apos;est produite.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTitle>Que s&apos;est-il passé ?</AlertTitle>
            <AlertDescription>
              {message ||
                "Nous ne savons pas exactement ce qui s'est passé, mais nous y travaillons."}
              {description && <p className="mt-2 text-sm">{description}</p>}
              {code && (
                <p className="mt-2 text-sm">Code d&apos;erreur : {code}</p>
              )}
            </AlertDescription>
          </Alert>
          <div>
            <h3 className="text-lg font-medium mb-2">
              Que pouvez-vous faire ?
            </h3>
            <div className="space-y-2">
              {onTryAgain && (
                <Button
                  onClick={onTryAgain}
                  className="w-full"
                  variant="outline"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Réessayer
                </Button>
              )}
              <Button asChild className="w-full">
                <Link href="/" prefetch={false}>
                  <Home className="mr-2 h-4 w-4" />
                  Retour à l&apos;accueil
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <Link href={`mailto:${SUPPORT_EMAIL}`} prefetch={false}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contacter le support
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Si le problème persiste, veuillez contacter notre équipe de support.
        </CardFooter>
      </Card>
    </div>
  );
}
