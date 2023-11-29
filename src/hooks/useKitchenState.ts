import { useState, useEffect } from 'react';
import httpClient from '@/utils/httpClient';
import type { Cook, Order } from '@/types/types';

export const useKitchenState = () => {
  const [state, setState] = useState<{ cooks: Cook[], orders: Order[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    httpClient<{ cooks: Cook[], orders: Order[] }>('/kitchen-state')
      .then(data => setState(data))
      .catch(err => {
        setError(err.message);
        console.error(err);
      });
  }, []);

  return { kitchenState: state, error };
};
