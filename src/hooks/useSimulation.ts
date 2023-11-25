import { useState } from 'react';
import httpClient, { type HttpError } from '@/utils/httpClient';

export const useSimulation = () => {
  const [error, setError] = useState<string | null>(null);

  const startSimulation = async () => {
    try {
      await httpClient('/simulation/start', 'POST');
      return true;
    } catch (err) {
      setError((err as HttpError)?.message);
      console.error(err);
      return false;
    }
  };

  return { startSimulation, error };
};

