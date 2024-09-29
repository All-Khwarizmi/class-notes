import { useAction } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { api } from '../../../../../convex/_generated/api';

export function useUpgradeSubscription() {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const pay = useAction(api.stripe.pay);
  async function handleUpgradeClick() {
    setIsUpdating(true);
    const url = await pay();
    router.push(url);
    setIsUpdating(false);
  }

  return { handleUpgradeClick, isUpdating };
}
