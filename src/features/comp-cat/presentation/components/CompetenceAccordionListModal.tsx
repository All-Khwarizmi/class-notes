import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/core/components/ui/accordion';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { Input } from '@/core/components/ui/input';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { Search } from 'lucide-react';
import React from 'react';

import {
  Category,
  Competence,
  CompetenceByCategory,
} from '../../domain/entities/schemas';

interface CompetenceAccordionListModalProps {
  competencesByCategory: CompetenceByCategory[];
  categories: Category[];
  addCriteria: (options?: { name: string; description: string }) => void;
}

export default function CompetenceAccordionListModal({
  competencesByCategory,
  categories,
  addCriteria,
}: CompetenceAccordionListModalProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCompetences = React.useMemo(() => {
    if (!searchTerm) return competencesByCategory;
    return competencesByCategory
      .map((group) => ({
        ...group,
        competences: group.competences.filter(
          (comp) =>
            comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comp.description.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((group) => group.competences.length > 0);
  }, [competencesByCategory, searchTerm]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Select Competence</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Competences</DialogTitle>
          <DialogDescription>
            Select a competence to add as a criteria
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search competences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
        <ScrollArea className="h-[400px] pr-4">
          {filteredCompetences.map((group) => (
            <Accordion
              type="single"
              collapsible
              key={group.category}
              className="mb-4"
            >
              <AccordionItem value={group.category}>
                <AccordionTrigger className="text-lg font-semibold">
                  {group.category}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {group.competences.map((competence) => (
                      <Card
                        key={competence._id}
                        className="transition-shadow hover:shadow-md"
                      >
                        <CardHeader>
                          <CardTitle className="text-base">
                            {competence.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {competence.description}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          <Button
                            size="sm"
                            onClick={() => {
                              addCriteria({
                                name: competence.name,
                                description: competence.description,
                              });
                              setOpen(false);
                            }}
                          >
                            Select
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
