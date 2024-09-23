"use client";

import React, { useState } from "react";
import { ClassType } from "@/features/classe/domain/class-schema";
import { NavItem } from "@/lib/types";
import UserSpaceClasseCard from "../components/UserSpaceClasseCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Search, Filter } from "lucide-react";

interface UserSpaceClassesGridViewProps {
  classes: ClassType[];
  userId: string;
  navItems: NavItem[];
  userName: string;
}

export default function UserSpaceClassesGridView({
  classes,
  userId,
  navItems,
  userName,
}: UserSpaceClassesGridViewProps) {
  const [search, setSearch] = useState("");
  const filteredClasses = classes.filter((classe) =>
    classe.name.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
    <div className="container mx-auto px-4 py-8 mt">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Bienvenue dans l&apos;espace de {userName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Explorez les classes et ressources partagées par {userName}.
            Utilisez les filtres et la recherche pour trouver ce qui vous
            intéresse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une classe..."
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-6">Classes disponibles</h2>

      {classes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classe) => (
            <UserSpaceClasseCard
              key={classe.id}
              classe={classe}
              userId={userId}
              navItems={navItems}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Aucune classe n&apos;est disponible pour le moment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
