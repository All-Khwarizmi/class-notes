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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Switch } from "@/core/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAddComplementBase from "../../application/adapters/services/useAddComplementBase";
import { toast } from "sonner";
import { HeaderTypographyH1 } from "@/core/components/common/Typography";

const ComplementBaseSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  publish: z.boolean().optional(),
  type: z
    .string()
    .default("Lesson")
    .refine((value) => {
      return ["Lesson", "Exercise", "Additional"].includes(value);
    })
    .optional(),
  contentType: z
    .string()
    .default("Markup")
    .refine((value) => {
      return ["Diagram", "Flowchart", "Markup"].includes(value);
    })
    .optional(),
});
export type ComplementBaseType = z.infer<typeof ComplementBaseSchema>;
function ComplementAddBaseForm(props: { slug: string }) {
  const { setComplementBaseOptions } = useAddComplementBase();
  const form = useForm({
    resolver: zodResolver(ComplementBaseSchema),
    defaultValues: {
      name: "",
      description: "",
      publish: false,
      type: "Lesson",
      contentType: "Markup",
    },
  });
  function onSubmit(values: ComplementBaseType) {
    if (
      values.type !== "Lesson" &&
      values.type !== "Exercise" &&
      values.type !== "Additional"
    ) {
      toast.error("Invalid type", {
        position: "top-center",
        description: "The type must be lesson, exercise or additional",
      });
      return;
    } else if (
      values.contentType !== "Diagram" &&
      values.contentType !== "Flowchart" &&
      values.contentType !== "Markup"
    ) {
      toast.error("Invalid content type", {
        position: "top-center",
        description: "The content type must be diagram, flowchart or markup",
      });
      return;
    }
    setComplementBaseOptions({
      complementBaseOptions: {
        name: values.name,
        description: values.description,
        publish: values.publish,
        type: values.type,
        contentType: values.contentType,
      },
      coursId: props.slug,
    });
  }
  return (
    <div className="px-8 rounded-lg bg-slate-900 py-12 shadow-md shadow-slate-800">
      <HeaderTypographyH1 text="Add Resource" className="pt-0" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-lg "
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

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 justify-between">
            <div className="space-y-4 w-full max-w-lg mx-auto">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue
                            placeholder="Select a type"
                            defaultValue={field.value}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Lesson">Lesson</SelectItem>
                            <SelectItem value="Exercise">Exercise</SelectItem>
                            <SelectItem value="Additional">
                              Additional
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      The type of the complement
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentType"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>Content Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a content type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {/* <SelectItem value="Diagram">Diagram</SelectItem>
                            <SelectItem value="Flowchart">Flowchart</SelectItem> */}
                              <SelectItem value="Markup">Markup</SelectItem>
                              <SelectItem value="Diagram">Diagram</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        The content type of the complement
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

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
    </div>
  );
}

export default ComplementAddBaseForm;
