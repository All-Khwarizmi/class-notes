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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Input } from "@/core/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../../../../core/components/ui/textarea";
import classSchema, { ClassType } from "@/features/classe/domain/class-schema";
import useAddClasse from "../../application/adapters/services/useAddClasse";
import { useRouter } from "next/navigation";
import { educationSystemOptions } from "@/features/user/domain/entities/education-systems/education-system";
import {
  getEducationLevelOptions,
  getHumanReadableGrade,
} from "@/features/user/domain/entities/education-systems/niveaux/niveaux";
import { toastWrapper } from "@/core/utils/toast-wrapper";
const BASE_IMAGE_URL = "/images/chaklboard-icon.webp";

export default function AddClassForm(props: { userId: string }) {
  const router = useRouter();
  const { mutate: setClasse } = useAddClasse();
  const form = useForm<
    Pick<
      ClassType,
      "description" | "name" | "imageUrl" | "educationLevel" | "educationSystem"
    >
  >({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      description: `${new Date().getFullYear()} - ${
        new Date().getFullYear() + 1
      }`,
      imageUrl: BASE_IMAGE_URL,
      educationLevel: "Cinquieme",
      educationSystem: "French",
    },
  });

  const selectedSystem = form.watch("educationSystem");
  const educationLevelOptions = getEducationLevelOptions(selectedSystem);

  async function onSubmit(
    values: Pick<
      ClassType,
      "description" | "name" | "imageUrl" | "educationLevel" | "educationSystem"
    >
  ) {
    const { description, name, imageUrl, educationLevel, educationSystem } =
      values;
    // Check every field
    if (
      !description ||
      !name ||
      !imageUrl ||
      !educationLevel ||
      !educationSystem
    ) {
      return toastWrapper.error("All fields are required");
    }

    setClasse(
      {
        userId: props.userId,
        ...values,
      },
      {
        onSuccess: () => {
          router.push("/classes");
        },
      }
    );
  }
  return (
    <div className="px-4">
      <h1 className="text-2xl font-semibold py-8">Ajouter une classe</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Nom</FormLabel>
                <FormControl>
                  <Input
                    data-testid="class-name-input"
                    placeholder="2de 8"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Le nom de la classe</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid grid-cols-2 gap-4 md:space-y-0 space-y-4">
            <FormField
              control={form.control}
              name="educationSystem"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Education System</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your education system" />
                        </SelectTrigger>
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
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Education Level</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {educationLevelOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {getHumanReadableGrade(selectedSystem, option)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="py-2"></div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Description</FormLabel>
                <FormControl>
                  <Textarea
                    data-testid="class-description-input"
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>La description de la classe</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-2"></div>

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Image</FormLabel>
                <FormControl>
                  <Input
                    data-testid="class-image-url-input"
                    placeholder="URL"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  L&apos;URL de l&apos;image de la classe
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              onClick={() => {
                const values = form.getValues();
                form.setValue("imageUrl", BASE_IMAGE_URL);
                onSubmit(values);
              }}
              data-testid="submit-class"
              className="mt-8"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
