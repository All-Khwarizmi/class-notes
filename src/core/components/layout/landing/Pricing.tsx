'use client';

import { Badge } from '@/core/components/ui/badge';
import { Switch } from '@/core/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/core/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap, Book, Brain, Info } from 'lucide-react';
import React, { useState } from 'react';

import { PricingCard } from './PricingCard';

interface PricingFeature {
  name: string;
  description: string;
  tiers: {
    [key: string]: string | boolean;
  };
}

const pricingFeatures: PricingFeature[] = [
  {
    name: 'Création de contenu',
    description: 'Créez des cours, séquences et évaluations',
    tiers: { free: true, basic: true, premium: true },
  },
  {
    name: 'Accès à la plateforme',
    description: 'Utilisez la plateforme sans limite de temps',
    tiers: { free: true, basic: true, premium: true },
  },
  {
    name: 'Résumés IA',
    description: 'Générez des résumés de cours automatiquement',
    tiers: { free: false, basic: 'Illimité', premium: 'Illimité' },
  },
  {
    name: 'Rapports élèves IA',
    description:
      'Obtenez des insights sur la performance individuelle des élèves',
    tiers: { free: false, basic: 'Illimité', premium: 'Illimité' },
  },
  {
    name: 'Rapports de classe IA',
    description: 'Analysez les performances globales de vos classes',
    tiers: { free: false, basic: '10/mois', premium: 'Illimité' },
  },
  {
    name: 'Quiz IA',
    description: "Créez des quiz personnalisés avec l'IA",
    tiers: { free: false, basic: '20/mois', premium: 'Illimité' },
  },
  {
    name: 'Analyses avancées',
    description: 'Accédez à des analyses détaillées et des recommandations',
    tiers: { free: false, basic: 'Limitées', premium: true },
  },
  {
    name: 'Création auto. de contenu',
    description: "Générez du contenu pédagogique avec l'IA",
    tiers: { free: false, basic: false, premium: true },
  },
];

export const pricingTiers = [
  {
    name: 'Découverte',
    brandName: 'ClasseStarter',
    price: 0,
    description: 'Parfait pour découvrir les bases de La Classe',
    cta: 'Commencer gratuitement',
    icon: Book,
    color: 'text-blue-500',
  },
  {
    name: 'Essentiel',
    brandName: 'ClassePro',
    price: 5,
    description: "L'essentiel de l'IA pour optimiser votre enseignement",
    cta: 'Essayer ClassePro',
    icon: Zap,
    color: 'text-yellow-500',
    highlighted: true,
  },
  {
    name: 'Expert',
    brandName: 'ClasseGenius',
    price: 15,
    description: "Exploitez tout le potentiel de l'IA dans votre enseignement",
    cta: 'Choisir ClasseGenius',
    icon: Brain,
    color: 'text-purple-500',
  },
];

const FeatureRow: React.FC<{ feature: PricingFeature }> = ({ feature }) => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      <td className="py-4 px-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center">
              {feature.name}
              <Info className="ml-1 h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{feature.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </td>
      {Object.entries(feature.tiers).map(([tier, value]) => (
        <td key={tier} className="py-4 px-2 text-center">
          {typeof value === 'boolean' ? (
            value ? (
              <Check className="mx-auto h-5 w-5 text-green-500" />
            ) : (
              <X className="mx-auto h-5 w-5 text-red-500" />
            )
          ) : (
            <span>{value}</span>
          )}
        </td>
      ))}
    </tr>
  );
};

const EnhancedPricingTable: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Choisissez votre formule La Classe
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Des options adaptées à tous les besoins, de la découverte à
            l&apos;expertise
          </p>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-8">
          <span className={`text-sm ${!isYearly ? 'font-bold' : ''}`}>
            Mensuel
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={`text-sm ${isYearly ? 'font-bold' : ''}`}>
            Annuel
          </span>
          {isYearly && (
            <Badge variant="secondary" className="ml-2">
              2 mois offerts !
            </Badge>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <AnimatePresence>
            {pricingTiers.map((tier) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PricingCard tier={tier} isYearly={isYearly} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-4 px-2 text-left">Fonctionnalité</th>
                {pricingTiers.map((tier) => (
                  <th key={tier.name} className="py-4 px-2 text-center">
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingFeatures.map((feature) => (
                <FeatureRow key={feature.name} feature={feature} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <Badge variant="outline" className="text-sm">
            Tous les prix sont HT
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default EnhancedPricingTable;
