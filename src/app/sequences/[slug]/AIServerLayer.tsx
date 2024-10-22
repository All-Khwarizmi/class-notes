'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/core/components/ui/accordion';
import { Badge } from '@/core/components/ui/badge';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { motion } from 'framer-motion';
import {
  Book,
  Zap,
  Brain,
  CheckCircle,
  XCircle,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React from 'react';

const AIServerLayer: React.FC = () => {
  const { theme } = useTheme();

  const features = [
    { name: 'Création de contenu', essential: true, expert: true },
    { name: 'Accès à la plateforme', essential: true, expert: true },
    { name: 'Résumés IA', essential: 'Illimité', expert: 'Illimité' },
    { name: 'Rapports élèves IA', essential: 'Illimité', expert: 'Illimité' },
    { name: 'Rapports de classe IA', essential: '10/mois', expert: 'Illimité' },
    { name: 'Quiz IA', essential: '20/mois', expert: 'Illimité' },
    { name: 'Analyses avancées', essential: 'Limitées', expert: true },
    {
      name: 'Création auto. de contenu',
      essential: false,
      expert: true,
      new: true,
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <ScrollArea className="flex-grow">
        <Card className="w-full mx-auto overflow-hidden">
          <CardHeader className="bg-gradient-to-b from-background to-secondary/20 text-center">
            <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Bientôt disponible
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              Débloquez tout le potentiel de l&apos;IA dans votre enseignement
              avec ClasseGenius
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full text-yellow-500 bg-yellow-500/20 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">ClassePro</CardTitle>
                  <CardDescription className="text-lg">
                    Essentiel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {feature.essential ? (
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="mr-2 h-5 w-5 text-red-500" />
                        )}
                        <span>{feature.name}: </span>
                        <span className="ml-1 font-semibold">
                          {typeof feature.essential === 'string'
                            ? feature.essential
                            : feature.essential
                              ? 'Oui'
                              : 'Non'}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full text-purple-500 bg-purple-500/20 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">ClasseGenius</CardTitle>
                  <CardDescription className="text-lg">Expert</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span>{feature.name}: </span>
                        <span className="ml-1 font-semibold">
                          {typeof feature.expert === 'string'
                            ? feature.expert
                            : 'Oui'}
                        </span>
                        {feature.new && (
                          <Badge variant="default" className="ml-2">
                            Nouveau
                          </Badge>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem value="faq-1">
                <AccordionTrigger className="mb-4">
                  Quand ces fonctionnalités seront-elles disponibles ?
                </AccordionTrigger>
                <AccordionContent>
                  Nous prévoyons de lancer ces nouvelles fonctionnalités dans
                  les prochains mois. Les utilisateurs de ClasseGenius seront
                  les premiers à y avoir accès dès leur sortie.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>
                  Puis-je tester ces fonctionnalités avant de passer à
                  l&apos;offre Expert ?
                </AccordionTrigger>
                <AccordionContent>
                  Nous proposerons une période d&apos;essai limitée pour les
                  utilisateurs de ClassePro afin qu&apos;ils puissent découvrir
                  les avantages de l&apos;offre Expert avant de s&apos;engager.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </ScrollArea>
      <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-b from-background to-secondary/20 p-6">
        <div className="w-full text-center">
          <p className="mb-4 text-muted-foreground">
            Exploitez tout le potentiel de l&apos;IA dans votre enseignement
          </p>
          <Link href="/pricing">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
            >
              Passer à ClasseGenius
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AIServerLayer;
