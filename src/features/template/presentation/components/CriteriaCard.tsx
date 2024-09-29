'use client';

import useGetCriterias from '@/core/application/criteria/useGetCriterias';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { ScrollArea } from '@/core/components/ui/scroll-area';

export default function Criteria() {
  const { criteriaList: criterias, loading } = useGetCriterias();
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {criterias && (
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <h2 className="py-2 text-lg">Critères d&apos;évaluation</h2>
          {criterias?.map((criteria, index) => (
            <Card key={criteria._id} className="mb-2">
              <CardHeader>
                <CardTitle>
                  {' '}
                  {index + 1}- {criteria.name}
                </CardTitle>
                <CardDescription>{criteria.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </ScrollArea>
      )}
    </>
  );
}
