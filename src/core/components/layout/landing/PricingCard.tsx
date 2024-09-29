'use client';

import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { useUpgradeSubscription } from '@/features/profile/presentation/helpers/useUpgradeSubscription';
import { SignedIn, SignedOut, SignInButton, useSession } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { pricingTiers } from '../Pricing';

export const PricingCard: React.FC<{
  tier: (typeof pricingTiers)[0];
  isYearly: boolean;
}> = ({ tier, isYearly }) => {
  const Icon = tier.icon;
  const price = isYearly ? tier.price * 10 : tier.price;
  const { handleUpgradeClick, isUpdating } = useUpgradeSubscription();
  const router = useRouter();
  return (
    <Card
      className={`flex flex-col h-full ${tier.highlighted ? 'border-primary shadow-lg scale-105' : ''}`}
    >
      <CardHeader>
        <div
          className={`w-12 h-12 rounded-full ${tier.color} bg-opacity-20 flex items-center justify-center mb-4`}
        >
          <Icon className={`h-6 w-6 ${tier.color}`} />
        </div>
        <CardTitle className="text-2xl">{tier.brandName}</CardTitle>
        <CardDescription className="text-lg">{tier.name}</CardDescription>
        <CardDescription>
          <span className="text-3xl font-bold">{price.toFixed(2)}€</span>
          <span className="text-sm">/{isYearly ? 'an' : 'mois'}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
      </CardContent>
      <CardFooter>
        <SignedOut>
          <SignInButton
            afterSignUpUrl={tier.price > 0 ? '/pricing' : '/dashboard'}
            afterSignInUrl={tier.price > 0 ? '/pricing' : '/dashboard'}
          >
            <Button
              className={`w-full ${tier.highlighted ? 'bg-primary hover:bg-primary/90' : ''}`}
              variant={tier.highlighted ? 'default' : 'outline'}
              disabled={isUpdating}
            >
              {tier.price > 0 ? 'Connectez-vous' : tier.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Button
            className={`w-full ${tier.highlighted ? 'bg-primary hover:bg-primary/90' : ''}`}
            variant={tier.highlighted ? 'default' : 'outline'}
            disabled={isUpdating}
            onClick={async () => {
              if (tier.price > 0) {
                return await handleUpgradeClick();
              } else {
                router.push('/dashboard');
              }
            }}
          >
            {tier.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </SignedIn>
      </CardFooter>
    </Card>
  );
};
