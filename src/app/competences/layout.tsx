import Header from "@/core/components/layout/Header";
import Sidebar from "@/core/components/layout/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Classe - Votre nouveau carnet de notes.",
  description:
    "La Classe est un carnet de notes intelligent qui vous permet de suivre la progression de vos élèves. ",
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
        <section className="flex-1  overflow-x-hidden">
          <div className="py-8 px-6">{children}</div>
        </section>
      </section>
    </>
  );
}
