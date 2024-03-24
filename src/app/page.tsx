"use client";
import Hero from "./HeroSection";
import { useLandingRedirect } from "../hooks/useLandingRedirect";

export default function Home() {
  useLandingRedirect();

  return (
    <>
      <Hero />
    </>
  );
}
