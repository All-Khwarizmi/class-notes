"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserButton } from "@clerk/nextjs";
import {
  CalendarDaysIcon,
  CoinsIcon,
  User,
  BookOpen,
  CreditCard,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  UserType,
  userSchema,
} from "@/features/user/domain/entities/user-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Separator } from "@/core/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import { countryOptions } from "@/features/user/domain/entities/user-schema";
import { getEducationSystemOptions } from "@/features/user/domain/entities/education-systems/global";
import { educationSystemOptions } from "@/features/user/domain/entities/education-systems/education-system";
import { checkUserCredits } from "../helpers/helpers";
import useSaveUser from "../../application/adapters/services/useSaveUser";
import { useUpgradeSubscription } from "../helpers/useUpgradeSubscription";
import { debounce } from "lodash";
import { z } from "zod";
import { useUserOnboarding } from "@/features/user/presentation/hooks/useUserOnboarding";
const tabs = [
  {
    id: "personal",
    label: "Informations personnelles",
    icon: User,
  },
  {
    id: "education",
    label: "Détails de l'éducation",
    icon: BookOpen,
  },
  {
    id: "subscription",
    label: "Abonnement",
    icon: CreditCard,
  },
];
export default function UserProfile({ user }: { user: UserType }) {
  const [currentTab, setCurrentTab] = useState("personal");
  const {
    data: {
      steps,
      form,
      progress,
      currentStep,
      isPending,
      isHostnameAvailable,
    },
    functions: {
      onSubmit,
      debouncedCheckHostname,
      subjectsOptions,
      handleUpgradeClick,
      setCurrentStep,
    },
  } = useUserOnboarding({ user });

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Profil utilisateur</h1>
        <UserButton />
      </div>
      <div className="flex gap-6">
        <Card className="w-64 h-fit">
          <CardHeader>
            <CardTitle>Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={currentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-1 h-full">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="justify-start"
                    onClick={() => setCurrentTab(tab.id)}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="flex-grow">
          <CardHeader>
            <CardTitle>Informations du profil</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal">
              {currentTab === "personal" && (
                <TabsContent value="personal">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Jean Dupont"
                                data-testid="name-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pays</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un pays" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  {countryOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hostname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom d&apos;hôte</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="mon-ecole"
                                  data-testid="hostname-input"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    debouncedCheckHostname(e.target.value);
                                  }}
                                />
                              </FormControl>
                              {field.value && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  {isHostnameAvailable === true && (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  )}
                                  {isHostnameAvailable === false && (
                                    <XCircle className="h-5 w-5 text-red-500" />
                                  )}
                                </div>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={isPending}>
                        {isPending ? "Mise à jour..." : "Mettre à jour"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              )}
              {currentTab === "education" && (
                <TabsContent value="education">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="educationSystem"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Système éducatif</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez votre système éducatif" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  {educationSystemOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="schoolSubject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Matière</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez vos matières" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  {subjectsOptions?.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={isPending}>
                        {isPending ? "Mise à jour..." : "Mettre à jour"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              )}
              {currentTab === "subscription" && (
                <TabsContent value="subscription">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Expiration de l&apos;abonnement
                        </h3>
                        <p className="text-2xl font-semibold flex items-center">
                          <CalendarDaysIcon className="w-5 h-5 mr-2" />
                          {user.endsOn
                            ? new Date(user.endsOn).toLocaleDateString("fr-FR")
                            : "Pas d'abonnement"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Crédits restants
                        </h3>
                        <p className="text-2xl font-semibold flex items-center">
                          <CoinsIcon className="w-5 h-5 mr-2" />
                          {checkUserCredits(user.endsOn, user.credits)}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    {!user.subscriptionId && (
                      <Button
                        variant="default"
                        className="w-full"
                        onClick={handleUpgradeClick}
                        data-testid="pay-subcription-btn"
                      >
                        Mettre à niveau maintenant
                      </Button>
                    )}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
