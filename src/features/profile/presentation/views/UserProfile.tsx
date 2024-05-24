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
export default function UserProfile({ user }: { user: UserType }) {
  const {
    setSaveUserOptions,
    loading,
    error,
  } = useSaveUser()
  const form = useForm<UserType>({
    resolver: zodResolver(
      userSchema.omit({
        _id: true,
      })
    ),
    defaultValues: user,
  });

  function onSubmit(data: UserType) {
    console.log({ data })
    setSaveUserOptions({
      userId: user._id,
      ...data,
    
    });
  }

  return (
    <div className="py-8 px-6">
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
                    <Input {...field} placeholder="John Doe" />
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
                    <Input {...field} placeholder="Math" />
                  </FormControl>
                  <FormDescription>Enter your school subject</FormDescription>
                </FormItem>
              );
            }}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      </Form>
    </div>
  );
}