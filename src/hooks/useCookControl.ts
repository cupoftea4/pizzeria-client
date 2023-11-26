import { useSend } from '@/context/websocket';

export const useCookControl = () => {
  const send = useSend();

  const pauseCook = (cookId: number) => {
    send('/app/cook/pause', cookId);
  };

  const resumeCook = (cookId: number) => {
    send('/app/cook/resume', cookId);
  };

  return { pauseCook, resumeCook };
};
