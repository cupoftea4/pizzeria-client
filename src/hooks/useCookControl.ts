import { useSend } from '@/context/websocket';

export const useCookControl = () => {
  const send = useSend();

  const pauseCook = (cookId: number) => {
    console.warn('PAUSE COOK', cookId);
    send('/app/cook/pause', cookId);
  };

  const resumeCook = (cookId: number) => {
    console.warn('RESUME COOK', cookId);
    send('/app/cook/resume', cookId);
  };

  return { pauseCook, resumeCook };
};
