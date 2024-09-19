"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { CalendarDaysIcon, CoinsIcon } from "lucide-react";
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Separator } from "@/core/components/ui/separator";
import { countryOptions } from "@/features/user/domain/entities/user-schema";
import { getEducationSystemOptions } from "@/features/user/domain/entities/education-systems/global";
import { educationSystemOptions } from "@/features/user/domain/entities/education-systems/education-system";
import { checkUserCredits } from "../helpers/helpers";
import useSaveUser from "../../application/adapters/services/useSaveUser";
import { useUpgradeSubscription } from "../helpers/useUpgradeSubscription";

export default function UserProfile({ user }: { user: UserType }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const { setSaveUserOptions, loading, error } = useSaveUser();
  const { handleUpgradeClick, isUpdating: isUpdatingSubscription } =
    useUpgradeSubscription();
  const router = useRouter();
  const form = useForm<Omit<UserType, "_id" | "userId">>({
    resolver: zodResolver(userSchema.omit({ _id: true, userId: true })),
    defaultValues: user,
  });

  const selectedSystem = form.watch("educationSystem");
  const subjectsOptions = getEducationSystemOptions(selectedSystem);
  const isPending = isUpdating || isUpdatingSubscription;
  async function onSubmit(data: Omit<UserType, "_id" | "userId">) {
    setIsUpdating(true);
    await setSaveUserOptions({
      userId: user.userId,
      ...data,
    });
    setIsUpdating(false);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>User Profile</CardTitle>
          <UserButton />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Subscription Expiration
            </h3>
            <p className="text-2xl font-semibold flex items-center">
              <CalendarDaysIcon className="w-5 h-5 mr-2" />
              {user.endsOn
                ? new Date(user.endsOn).toDateString()
                : "No subscription"}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Credits Remaining
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
            Upgrade Now
          </Button>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
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
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {countryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
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
              name="educationSystem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education System</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your education system" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {educationSystemOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
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
                  <FormLabel>Subject</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your subjects" />
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
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
          data-testid="submit-onboarding-form"
        >
          {isPending ? "Updating..." : "Update Profile"}
        </Button>
      </CardFooter>
    </Card>
  );
}
