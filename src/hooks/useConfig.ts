import { useState, useEffect } from 'react';
import httpClient, { type HttpError } from '@/utils/httpClient';
import type { ConfigData, ConfigDataSaveDto } from '@/types/types';

export const useConfig = () => {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleHttpError = (err: HttpError) => {
    setError(err.message);
    console.error(err);
  };

  useEffect(() => {
    httpClient<ConfigData>('/config')
      .then(data => setConfig(data))
      .catch(handleHttpError);
  }, []);

  const updateConfig = async (newConfig: ConfigDataSaveDto) => {
    try {
      await httpClient<ConfigData>('/config', 'PUT', newConfig);
      return true;
    } catch (err) {
      handleHttpError(err as HttpError);
      return false;
    }
  };

  return { config, updateConfig, error };
};
