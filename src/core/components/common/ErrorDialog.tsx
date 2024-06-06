"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VW9DgAjsBFE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/core/components/ui/button";
import Link from "next/link";

export default function ErrorDialog(props: {
  message: string;
  path?: string;
  code?: string;
  description?: string;
}) {
  return (
    <div
      aria-label={`Displaying message: ${props.message}`}
      className="flex flex-col items-center justify-center h-screen"
    >
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Oops, something went wrong!</h2>
            <p className="text-gray-500 dark:text-gray-400">
              We&apos;re sorry, but an unexpected error has occurred.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">What happened?</h3>
            {props.message ? (
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-wrap break-words ">
                  {props.message}
                </p>
                Details:
                {props.description && (
                  <div className="text-gray-500 dark:text-gray-400">
                    {props.description}
                  </div>
                )}
                {props.code && (
                  <p className="text-gray-500 dark:text-gray-400">
                    Error code: {props.code}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                We don&apos;t know what happened but we&apos;re working on it.
              </p>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">What can you do?</h3>
            <div className="space-y-2">
              <Button onClick={() => {}}>Try again</Button>
              <Link
                href="/"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-900"
                prefetch={false}
              >
                Go to homepage
              </Link>
              <Link
                href="#"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:text-gray-50 dark:hover:text-gray-200 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-900"
                prefetch={false}
              >
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
