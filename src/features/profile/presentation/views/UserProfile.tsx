"use client";
import {
  UserType,
  userSchema,
} from "@/features/user/domain/entities/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import useSaveUser from "../../application/adapters/services/useSaveUser";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/core/components/ui/button";
import { useAction } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Separator } from "@radix-ui/react-select";

export default function UserProfile({ user }: { user: UserType }) {
  const { setSaveUserOptions, loading, error } = useSaveUser();
  const form = useForm<Omit<UserType, "_id" | "userId">>({
    resolver: zodResolver(
      userSchema.omit({
        _id: true,
        userId: true,
      })
    ),
    defaultValues: user,
  });

  function onSubmit(data: Omit<UserType, "_id" | "userId">) {
    setSaveUserOptions({
      userId: user._id,
      ...data,
    });
  }
  const router = useRouter();

  const pay = useAction(api.stripe.pay);
  async function handleOnClick() {
    const url = await pay();
    router.push(url);
  }

  return (
    <div data-testid="user-form" className="py-8 px-6 pt-12">
      <div className="h-full flex justify-center gap-4 pb-4">
        <UserButton />
      </div>
      {user.subscriptionId && user.endsOn && (
        <>
          <Separator className="my-6" />
          <div className="grid place-items-center grid-cols-2 gap-6 py-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Subscription Expiration</h3>
              <div className="text-muted-foreground">
                <CalendarDaysIcon className="inline-block w-5 h-5 mr-1" />
                {new Date(user.endsOn).toDateString()}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Credits Remaining</h3>
              <div className="text-muted-foreground">
                <CoinsIcon className="inline-block w-5 h-5 mr-1" />
                {
                  checkUserSubscriptionStatus(
                    user.endsOn,
                    user.credits
                  ) 
                }
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col items-center space-y-4">
            {!user.subscriptionId && (
              <Button
                variant="outline"
                className="w-full"
                onClick={handleOnClick}
                data-testid="pay-subcription-btn"
                type="button"
              >
                Upgrade
              </Button>
            )}
          </div>
        </>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Name</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="name-input"
                      {...field}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormDescription>Enter your full name</FormDescription>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="schoolSubject"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor={field.name}>School Subject</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="matiere-input"
                      {...field}
                      placeholder="Math"
                    />
                  </FormControl>
                  <FormDescription>Enter your school subject</FormDescription>
                </FormItem>
              );
            }}
          />
          <div className="flex justify-end gap-4">
            <Button data-testid="submit-onboarding-form" type="submit">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function CalendarDaysIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CoinsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

function checkUserSubscriptionStatus(endsOn: number, credits?: number) {
  const now = new Date();
  const endsOnDate = new Date(endsOn);
  if (now < endsOnDate) {
    return "Unlimited";
  } else if (credits && credits > 0) {
    return String(credits);
  } else if (credits === 0) {
    return "No credits left";
  } else {
    return "Expired";
  }
}
