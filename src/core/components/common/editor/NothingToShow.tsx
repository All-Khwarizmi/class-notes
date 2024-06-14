/**
 * v0 by Vercel.
 * @see https://v0.dev/t/v8LMkFajBI6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/core/components/ui/button";

export default function NothingToShow() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <div className="max-w-md text-center space-y-4">
        <FrownIcon className="h-16 w-16 mx-auto text-gray-500 dark:text-gray-400" />
        <h2 className="text-2xl font-semibold">
          Sorry, there&apos;s nothing to show here.
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          It looks like the content you were expecting hasn&apos;t been
          published yet. Please contact the person who provided you this link to
          ensure the desired content has been made available.
        </p>
        <Button variant="outline" className="mt-4">
          Contact Support
        </Button>
      </div>
    </div>
  );
}

function FrownIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
