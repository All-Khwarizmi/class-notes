import Sidebar from "@/core/components/layout/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClassAI - Votre nouveau carnet de notes.",
  description:
    "ClassAI est un carnet de notes intelligent qui vous permet de suivre la progression de vos élèves. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <section className="h-full flex-1  overflow-x-hidden">
        <div className="h-full py-8 px-6">{children}</div>
      </section>
    </>
  );
}
