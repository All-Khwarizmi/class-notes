import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import {
  ExternalLink,
  BookOpen,
  MessageCircle,
  Mail,
  Info,
} from "lucide-react";
import Link from "next/link";

const externalLinks = [
  {
    title: "Guide Rapide pour Commencer",
    href: "https://www.notion.so/Guide-Rapide-pour-Commencer-avec-La-Classe-10732b247fd3805ab0f2c63de6fd1451?pvs=21",
    icon: BookOpen,
  },
  {
    title: "Comment commencer avec La Classe",
    href: "https://www.notion.so/Comment-commencer-avec-La-Classe-10732b247fd380a7adbee274e3d12c51?pvs=21",
    icon: Info,
  },
  {
    title: "Participez à l'Amélioration",
    href: "https://www.notion.so/Participez-l-Am-lioration-de-La-Classe-10732b247fd3804480e7d1f2dc19d0dd?pvs=21",
    icon: MessageCircle,
  },
  {
    title: "Notre Mission et Vision",
    href: "https://www.notion.so/Notre-Mission-Notre-Histoire-Notre-Vision-10732b247fd380b2b951de6d2cd86b5f?pvs=21",
    icon: Info,
  },
];

export default function ExternalLinksCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ressources Externes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {externalLinks.map((link, index) => (
          <Button
            key={index}
            variant="outline"
            asChild
            className="w-full justify-start"
          >
            <Link href={link.href} target="_blank" rel="noopener noreferrer">
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              <ExternalLink className="ml-auto h-4 w-4" />
            </Link>
          </Button>
        ))}
        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-semibold">Besoin d&apos;aide ?</h3>
          <p className="text-sm text-muted-foreground">
            Si vous avez des questions ou rencontrez des difficultés,
            n&apos;hésitez pas à nous contacter :
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" asChild size="sm">
              <Link href="mailto:jason@laclasse.app">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Link>
            </Button>
            <Button variant="outline" asChild size="sm">
              <Link href="mailto:support@laclasse.app">
                <MessageCircle className="mr-2 h-4 w-4" />
                Support
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
