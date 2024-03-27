import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/sonner";

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
      <section className="flex border-collapse overflow-hidden">
        <Sidebar />
        <div className="flex-1  h-full overflow-x-hidden pt-8  pb-1">
          {children}
        </div>
      </section>
    </>
  );
}
