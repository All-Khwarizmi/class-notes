import Header from "@/components/Header";
import Sidebar from "@/components/layout/Sidebar";
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
      <Header />
      <section className="flex h-full w-full border-collapse overflow-hidden">
        <Sidebar />
        <section className="flex-1 h-[75vh] overflow-x-hidden">
          {children}
        </section>
      </section>
    </>
  );
}
