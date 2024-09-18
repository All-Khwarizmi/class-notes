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
  return children;
}
