import React, { useState, useEffect } from "react";

const RandomFadingImage = ({ src, alt }: { src: string; alt: string }) => {
  const [opacity, setOpacity] = useState(() => Math.random() * 0.7);
  const [filter, setFilter] = useState(
    () =>
      `brightness(${Math.random() * 0.5 + 0.75}) contrast(${
        Math.random() * 50 + 100
      }%)`
  );
  const [glow, setGlow] = useState(() => Math.random() * 10);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomGlow = Math.random() * 10;
      setGlow(randomGlow);
    }, 30000); // changes glow every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomBrightness = Math.random() * 0.5 + 0.75; // Brightness between 0.75 and 1.25
      const randomContrast = Math.random() * 50 + 100; // Contrast between 100% and 150%
      setFilter(`brightness(${randomBrightness}) contrast(${randomContrast}%)`);
    }, 30000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random opacity between 0.5 and 1
      const randomOpacity = Math.random() * 0.7;
      setOpacity(randomOpacity);
    }, 20000); // changes opacity every second

    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={src}
      alt={alt}
      className="mx-auto hero-image absolute opacity-70 aspect-video overflow-hidden rounded-xl object-cover w-full lg:w-[70%]  "
      style={{
        opacity: opacity,
        transition: "opacity 1s ease-in-out",
        filter: filter,
        boxShadow: `0 0 10px 5px rgba(255, 255, 255, ${glow})`,
      }}
    />
  );
};

export default RandomFadingImage;
