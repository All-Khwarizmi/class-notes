import { useQuery } from '@tanstack/react-query';

import getEvaluationCompoundList from '../actions/get-evaluation-compound-list';

export default function useGetEvaluationCompoundList(options: {
  classeId: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ['evaluation-compound-list'],
    enabled: options.enabled,
    queryFn: async () => {
      return await getEvaluationCompoundList({ classeId: options.classeId });
    },
  });
}
