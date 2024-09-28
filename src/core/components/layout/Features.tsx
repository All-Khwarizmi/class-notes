"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookMarked,
  BookOpen,
  Brain,
  LucideIcon,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { useInView } from "react-intersection-observer";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  color: string;
}

const Feature: React.FC<FeatureProps> = ({
  icon: Icon,
  title,
  description,
  details,
  color,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Card
        className="h-full transition-all duration-300 overflow-hidden"
        style={{
          backgroundColor: `${color}10`,
          borderColor: color,
          transform: isHovered ? "translateY(-10px)" : "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader>
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: color }}
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="h-8 w-8 text-white" />
          </motion.div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg mb-4">
            {description}
          </CardDescription>
          <AnimatePresence>
            {isHovered && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                {details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center"
                  >
                    <div
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: color }}
                    />
                    {detail}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      <div
        className="absolute inset-0 -z-10 blur-xl opacity-30 transition-opacity duration-300"
        style={{
          backgroundColor: color,
          opacity: isHovered ? 0.5 : 0.3,
        }}
      />
    </motion.div>
  );
};

import { Zap, Layout, Share2 } from "lucide-react";

const features: FeatureProps[] = [
  {
    icon: Zap,
    title: "Site professionnel en 5 minutes",
    description:
      "Créez votre site web d'enseignant sans aucune compétence en programmation.",
    details: [
      "Templates prêts à l'emploi conçus pour les enseignants",
      "Personnalisation intuitive par glisser-déposer",
      "Mise en ligne instantanée avec un nom de domaine inclus",
    ],
    color: "#3B82F6", // blue-500
  },
  {
    icon: Layout,
    title: "Tout votre contenu au même endroit",
    description:
      "Finies les ressources éparpillées. Centralisez tous vos supports de cours dans un espace organisé et facile d'accès.",
    details: [
      "Organisation intuitive par matière, niveau ou projet",
      "Partage sécurisé avec les élèves et les parents",
      "Accès depuis n'importe quel appareil, à tout moment",
    ],
    color: "#10B981", // emerald-500
  },
  {
    icon: Share2,
    title: "Communication simplifiée",
    description:
      "Fini le temps perdu en emails interminables. Communiquez efficacement avec les élèves et les parents en un clic.",
    details: [
      "Espace d'annonces pour informations importantes",
      "Blog intégré pour partager des actualités et des ressources",
      "Formulaires de contact directs pour les parents",
    ],
    color: "#8B5CF6", // violet-500
  },
];

const Features: React.FC = () => {
  return (
    <section className="w-full py-24  verflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
            Révolutionnez votre enseignement
          </h2>
          <p className="text-xl text-muted-foreground">
            Découvrez comment La Classe transforme l&apos;expérience
            d&apos;apprentissage
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 relative">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent blur-3xl" />
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button asChild size="lg">
            <span>
              Voir La Classe en action
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
