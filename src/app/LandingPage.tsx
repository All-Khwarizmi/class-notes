

import Link from "next/link";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import Title from "@/core/components/common/Title";
import Hero from "./HeroSection";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <Hero />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Your Teaching Experience
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                  La Classe offers tools that empower educators to manage
                  classes, resources, and student progress efficiently. Simplify
                  your workflow with cutting-edge technology tailored for modern
                  classrooms.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-4xl items-center gap-12 py-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-xl font-bold">Digital Chalkboard</h3>
                <p className="text-muted-foreground">
                  Bring your lessons to life with our interactive digital
                  chalkboard, allowing you to annotate, share multimedia
                  content, and engage students in real-time.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-xl font-bold">Resource Management</h3>
                <p className="text-muted-foreground">
                  Easily organize and share your teaching materials, lesson
                  plans, and other resources with your students, ensuring
                  everyone has access to the information they need.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-xl font-bold">AI-Powered Insights</h3>
                <p className="text-muted-foreground">
                  Gain deeper insights into your students&apos; progress and
                  performance with our AI-powered analytics, helping you
                  identify areas for improvement and tailor your teaching
                  approach accordingly.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Transform Your Teaching?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                Sign up for La Classe and experience the future of education.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-lg flex-1"
                />
                <Button type="submit">Get Started</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Sign up to experience the power of La Classe.{" "}
                <Link
                  href="#"
                  className="underline underline-offset-2"
                  prefetch={false}
                >
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 La Classe. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}
