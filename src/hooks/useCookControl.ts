import { useSend } from '@/context/websocket';

export const useCookControl = () => {
  const send = useSend();

  const pauseCook = (cookId: string) => {
    send('/app/cook/pause', { cookId });
  };

  const resumeCook = (cookId: string) => {
    send('/app/cook/resume', { cookId });
  };

  return { pauseCook, resumeCook };
};
