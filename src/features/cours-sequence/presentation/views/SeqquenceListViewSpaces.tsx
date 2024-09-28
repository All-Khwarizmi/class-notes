"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sequence } from "../../domain/entities/cours-schemas";
import { NavItem } from "@/lib/types";
import CoursSequenceCard from "../components/CoursSequenceCard";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { ScrollArea, ScrollBar } from "@/core/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import { Search, Filter, BookOpen } from "lucide-react";
import { useSpacesLayoutContext } from "@/core/components/layout/SpacesLayoutCtx";

interface SequencesListViewSpacesProps {
  sequences: Sequence[];
  spacesMode?: boolean;
  userId: string;
  navItems: NavItem[];
  userName: string;
}

export default function SequencesListViewSpaces({
  sequences,
  spacesMode = false,
  userId,
  navItems,
  userName,
}: SequencesListViewSpacesProps) {
  const { setSpacesNavItems } = useSpacesLayoutContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (setSpacesNavItems) {
      setSpacesNavItems(navItems);
    }
  }, [navItems, setSpacesNavItems]);

  const filteredSequences = sequences.filter((sequence) =>
    sequence.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Séquences de {userName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Explorez les séquences créées par {userName}. Utilisez la recherche
            pour trouver des séquences spécifiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une séquence..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
            Toutes les séquences
          </TabsTrigger>
          <TabsTrigger value="recent" onClick={() => setActiveTab("recent")}>
            Récentes
          </TabsTrigger>
          <TabsTrigger value="popular" onClick={() => setActiveTab("popular")}>
            Populaires
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <h2 className="text-2xl font-semibold mb-6">
        Séquences{" "}
        {activeTab === "all"
          ? "disponibles"
          : activeTab === "recent"
          ? "récentes"
          : "populaires"}
      </h2>

      {filteredSequences.length > 0 ? (
        <ScrollArea className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
            {filteredSequences.map((sequence) => (
              <CoursSequenceCard
                key={sequence._id}
                title={sequence.name}
                description={sequence.description}
                imageUrl={sequence.imageUrl}
                tags={sequence.category}
                showViewButton={true}
                pathToView={`/spaces/sequences/${sequence._id}?user=${userId}`}
                path={`/sequences/${sequence._id}`}
                spacesMode={spacesMode}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Aucune séquence n&apos;est disponible pour le moment.
            </p>
          </CardContent>
        </Card>
      )}

      {!spacesMode && (
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/sequences/add">
              <BookOpen className="mr-2 h-4 w-4" />
              Ajouter une séquence
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
