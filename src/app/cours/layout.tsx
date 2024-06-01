import Header from "@/core/components/layout/Header";
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
      <section className="flex h-full  w-full border-collapse overflow-hidden">
        {/* <Sidebar />
        <section className="h-full flex-1  overflow-x-hidden"> */}
        {children}
        {/* </section> */}
      </section>
    </>
  );
}
