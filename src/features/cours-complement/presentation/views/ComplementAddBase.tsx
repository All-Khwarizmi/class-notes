"use client";
import { Button } from "@/core/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Switch } from "@/core/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ComplementBaseSchema = z.object({
  name: z.string(),
  description: z.string(),
  publish: z.boolean(),
  type: z.string().refine((value) => {
    return ["video", "lesson", "audio", "diagram"].includes(value);
  }),
});
type ComplementBaseType = z.infer<typeof ComplementBaseSchema>;
function ComplementAddBaseForm() {
  const form = useForm({
    resolver: zodResolver(ComplementBaseSchema),
    defaultValues: {
      name: "",
      description: "",
      publish: false,
      type: "video" || "lesson" || "audio" || "diagram",
    },
  });
  function onSubmit(values: ComplementBaseType) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-lg mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Name</FormLabel>
              <FormControl>
                <Input placeholder="Complement name" {...field} />
              </FormControl>
              <FormDescription>The name of the complement</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Description</FormLabel>
              <FormControl>
                <Input placeholder="Complement description" {...field} />
              </FormControl>
              <FormDescription>
                The description of the complement
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-between">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={form.getValues().type}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="lesson">Lesson</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="diagram">Diagram</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>The type of the complement</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publish"
            render={({ field }) => (
              <FormItem className="flex flex-col ">
                <div className="flex flex-col gap-4">
                  <FormLabel htmlFor={field.name}>Publish</FormLabel>
                  <FormControl>
                    <Switch
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                  </FormControl>
                </div>
                <FormDescription>
                  Should the complement be published
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default ComplementAddBaseForm;
