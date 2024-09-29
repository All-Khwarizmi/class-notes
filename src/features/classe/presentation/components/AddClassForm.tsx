'use client';

import { GoBackButton } from '@/core/components/common/navigation/GoBackButton';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form';
import { Input } from '@/core/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { Textarea } from '@/core/components/ui/textarea';
import { BASE_IMAGE_URL } from '@/core/constants/image';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import classSchema, { ClassType } from '@/features/classe/domain/class-schema';
import { educationSystemOptions } from '@/features/user/domain/entities/education-systems/education-system';
import {
  getEducationLevelOptions,
  getHumanReadableGrade,
} from '@/features/user/domain/entities/education-systems/niveaux/niveaux';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useAddClasse from '../../application/adapters/services/useAddClasse';

type FormValues = Pick<
  ClassType,
  'description' | 'name' | 'imageUrl' | 'educationLevel' | 'educationSystem'
>;

export default function AddClassForm({ userId }: { userId: string }) {
  const router = useRouter();
  const { mutate: setClasse, isPending } = useAddClasse();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: '',
      description: `${new Date().getFullYear()} - ${
        new Date().getFullYear() + 1
      }`,
      imageUrl: BASE_IMAGE_URL,
      educationLevel: 'Cinquieme',
      educationSystem: 'French',
    },
  });

  const selectedSystem = form.watch('educationSystem');
  const educationLevelOptions = getEducationLevelOptions(selectedSystem);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    if (Object.values(values).some((value) => !value)) {
      toastWrapper.error('Tous les champs sont obligatoires');
      setIsSubmitting(false);
      return;
    }
    const { name, description, imageUrl, educationLevel, educationSystem } =
      values;
    if (name.length < 3) {
      toastWrapper.error(
        'Le nom de la classe doit contenir au moins 3 caractères'
      );
      setIsSubmitting(false);
      return;
    }
    setClasse(
      {
        userId,
        ...values,
      },
      {
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  }
  const goToClasses = () => {
    router.push('/classes');
  };
  return (
    <div className="container mx-auto py-6">
      <GoBackButton label="Retour aux classes" onClick={goToClasses} />
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Ajouter une classe</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input
                        required
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  name="educationLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Niveau d&apos;éducation</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre niveau d'éducation" />
                          </SelectTrigger>
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        data-testid="class-description-input"
                        placeholder="Description de la classe"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      La description de la classe
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="class-image-url-input"
                        placeholder="URL de l'image"
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

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isPending}
                data-testid="submit-class"
                onClick={() => onSubmit(form.getValues())}
              >
                {isSubmitting || isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  'Créer la classe'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
