import Hero from "./HeroSection";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ClassAI - Votre nouveau carnet de notes.",
  description:
    "ClassAI est un carnet de notes intelligent qui vous permet de suivre la progression de vos élèves. ",
};
export default function Home() {
  return <Hero />;
}
