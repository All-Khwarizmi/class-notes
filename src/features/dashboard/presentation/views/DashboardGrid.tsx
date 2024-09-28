"use client";

import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import {
  PlusCircle,
  BookOpen,
  Users,
  FileText,
  ExternalLink,
  Rss,
  HelpCircle,
  Store,
} from "lucide-react";
import Link from "next/link";
import VisibilityManagementComponent from "../components/VisibilityManagementPanel";
import QuickLinksCard from "../components/QuickLinksCard";
import RessourceLinksCard from "../components/RessourceLinksCard";

const externalLinks = [
  {
    name: "Guide de démarrage",
    href: "https://www.notion.so/Guide-Rapide-pour-Commencer-avec-La-Classe-10732b247fd3805ab0f2c63de6fd1451?pvs=21",
  },
  {
    name: "Améliorer La Classe",
    href: "https://www.notion.so/Participez-l-Am-lioration-de-La-Classe-10732b247fd3804480e7d1f2dc19d0dd?pvs=21",
  },
  {
    name: "Notre mission",
    href: "https://www.notion.so/Notre-Mission-Notre-Histoire-Notre-Vision-10732b247fd380b2b951de6d2cd86b5f?pvs=21",
  },
];
type DashboardProps = {
  userId: string;
  hostname: string;
};
export default function Dashboard({ userId, hostname }: DashboardProps) {
  const quickActions = useMemo(() => {
    return [
      { name: "Nouvelle classe", icon: PlusCircle, href: "/classes/add" },
      { name: "Nouvelle séquence", icon: FileText, href: "/sequences/add" },
      { name: "Nouvelle évaluation", icon: BookOpen, href: "/evaluations/add" },
      { name: "Gérer les élèves", icon: Users, href: "/classes" },
      { name: "Mon Blog", icon: Rss, href: `/${hostname}/blog` },
      { name: "Ma Marketplace", icon: Store, href: `/${hostname}` },
    ];
  }, [hostname]);
  return (
    <div className="container mx-auto p-4 space-y-6 mb-12">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.name}
                  variant="outline"
                  asChild
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <Link href={action.href}>
                    <action.icon className="h-6 w-6 mb-2" />
                    {action.name}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ressources</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              {externalLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  asChild
                  className="w-full justify-start mb-2"
                >
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {link.name}
                  </Link>
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visibility" className="w-full truncate  ">
        <TabsList>
          <TabsTrigger value="visibility">Gestion de la visibilité</TabsTrigger>
          <TabsTrigger value="quicklinks">Liens rapides</TabsTrigger>
          <TabsTrigger value="resources">Ressources pédagogiques</TabsTrigger>
        </TabsList>
        <TabsContent value="visibility">
          <Card>
            <CardContent>
              <VisibilityManagementComponent userId={userId} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quicklinks">
          <QuickLinksCard />
        </TabsContent>
        <TabsContent value="resources">
          <RessourceLinksCard userId={userId} />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Besoin d&apos;aide ?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Si vous avez des questions ou rencontrez des difficultés,
            n&apos;hésitez pas à nous contacter :
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0">
            <Button variant="outline" asChild>
              <Link href="mailto:jason@laclasse.app">
                <HelpCircle className="mr-2 h-4 w-4" />
                Contacter le support
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href="https://www.notion.so/Comment-commencer-avec-La-Classe-10732b247fd380a7adbee274e3d12c51?pvs=21"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Consulter le guide
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
