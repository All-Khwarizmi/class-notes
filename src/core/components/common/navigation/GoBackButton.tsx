import { Button } from '@/core/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type GoBackButtonProps = {
  onClick?: () => void;
  label?: string;
};
export function GoBackButton({ onClick, label }: GoBackButtonProps) {
  const router = useRouter();
  function goBack() {
    router.back();
  }
  return (
    <Button variant="ghost" onClick={onClick ?? goBack} className="mb-4">
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label ?? 'Retour'}
    </Button>
  );
}
