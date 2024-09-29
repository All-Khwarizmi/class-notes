import {
  TypographyH4,
  TypographyMuted,
} from '@/core/components/common/Typography';
import { Button } from '@/core/components/ui/button';
import { Switch } from '@/core/components/ui/switch';

export default function EvaluationCard(props: {
  name: string;
  description: string;
  isGraded: boolean;
  deleteEvaluation: () => void;
  onView: () => void;
}) {
  return (
    <div className="bg-card p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <TypographyH4 text={props.name} />
          <TypographyMuted text={props.description} />
        </div>
        <div className="flex items-center space-x-4">
          <Switch checked={props.isGraded} />
          <Button size="sm" onClick={props.onView}>
            <EyeIcon className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={props.deleteEvaluation}
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
