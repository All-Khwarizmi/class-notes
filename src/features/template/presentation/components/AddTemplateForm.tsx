import { Button } from '@/core/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from '@/core/components/ui/form';
import { Input } from '@/core/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { GradeType } from '@/core/domain/grades/grade-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useTemplateCreationStore } from '../../common/template-store';
import {
  TemplateSchema,
  TemplateType,
} from '../../domain/entities/template-schema';

export default function AddTemplateForm() {
  const { setTemplateCreation, templateCreation, setIsCreating } =
    useTemplateCreationStore((state) => {
      return {
        templateCreation: state.templateCreation,
        setTemplateCreation: state.setTemplateCreation,
        setIsCreating: state.setIsCreating,
      };
    });
  const form = useForm<TemplateType>({
    resolver: zodResolver(TemplateSchema),
    defaultValues: {
      name: templateCreation.name,
      description: templateCreation.description,
      gradeType: templateCreation.gradeType,
    },
  });
  const { name, description, gradeType } = form.watch();
  useEffect(() => {
    setIsCreating({ isCreating: true });
  }, []);

  useEffect(() => {
    setTemplateCreation({
      name,
      description,
      gradeType,
    });
  }, [name, description, gradeType]);

  function onSubmit(values: TemplateType) {
    return () => {
      setIsCreating({ isCreating: false });
    };
  }

  function hangleChangeGradeType(args: GradeType) {
    form.setValue('gradeType', args);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Name</FormLabel>
              <Input
                data-testid="template-name-input"
                placeholder="Template name"
                {...field}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Description</FormLabel>
              <Input
                data-testid="template-description-input"
                placeholder="Template description"
                {...field}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gradeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Grade Type</FormLabel>

              <Select
                name="gradeType"
                value={gradeType}
                defaultValue={templateCreation.gradeType}
                onValueChange={hangleChangeGradeType}
                data-testid="template-grade-type-select"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type de notation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ungraded">Ungraded</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            onClick={onSubmit(form.getValues())}
            data-testid="submit-template"
            className="mt-8"
            type="submit"
          >
            Créer
          </Button>
        </div>
      </form>
    </Form>
  );
}
