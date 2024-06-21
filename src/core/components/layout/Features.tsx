import Link from "next/link";
import React from "react";

function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Streamline Your Teaching Experience
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
              La Classe offers tools that empower educators to manage classes,
              resources, and student progress efficiently. Simplify your
              workflow with cutting-edge technology tailored for modern
              classrooms.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-4xl justify-center items-strech gap-12 py-12 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src="/images/chaklboard-icon.jpeg"
              alt="Digital Chalkboard"
              className="h-16 w-16 rounded shadow-sm shadow-black"
            />
            <h3 className="text-xl font-bold">Digital Chalkboard</h3>
            <p className="text-muted-foreground">
              Bring your lessons to life with our interactive digital
              chalkboard. Annotate, share multimedia content, and engage
              students in real-time.
            </p>
            <Link href="#" className="text-primary hover:underline">
              Learn More
            </Link>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src="/images/ressource-magement-icon.jpeg"
              alt="Resource Management"
              className="h-16 w-16 rounded shadow-sm shadow-black"
            />
            <h3 className="text-xl font-bold">Resource Management</h3>
            <p className="text-muted-foreground">
              Easily organize and share your teaching materials, lesson plans,
              and resources with your students, ensuring everyone has access to
              what they need.
            </p>
            <Link href="#" className="text-primary hover:underline">
              Learn More
            </Link>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src="/images/ai-icon.jpeg"
              alt="AI-Powered Insights"
              className="h-16 w-16 rounded shadow-sm shadow-black"
            />
            <h3 className="text-xl font-bold">AI-Powered Insights</h3>
            <p className="text-muted-foreground">
              Gain deeper insights into your students&apos; progress and
              performance with our AI-powered analytics. Identify areas for
              improvement and tailor your teaching approach.
            </p>
            <Link href="#" className="text-primary hover:underline">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
