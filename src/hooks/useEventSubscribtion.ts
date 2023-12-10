import { useSubscribe } from '@/context/websocket';
import type { CookStatus, CookingStage } from '@/types/types';
import { useEffect } from 'react';

type BadRequestMessage = unknown;
export type PausedCookUpdateMessage = {
  cookId: number
  cookStatus: CookStatus
};

type NewOrderMessage = {
  id: number
  cashRegisterId: number
  createdAt: string
  diner: { id: number, name: string }
  orderPizzas: []
};

export type CookingOrderUpdateMessage = {
  currentStage: CookingStage
  currentTopping?: string
  cookId: number
  orderId: number
  orderPizzaId: number
  completedAt: string | null
  modifiedAt: string
};

export const useBadRequestSubscription = (callback: (message: BadRequestMessage) => void) => {
  const { subscribe, unsubscribe } = useSubscribe<BadRequestMessage>('/app/topic/badRequest', callback);

  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    };
  }, [subscribe, unsubscribe]);
};

export const useNewOrderSubscription = (callback: (message: NewOrderMessage) => void) => {
  const { subscribe, unsubscribe } = useSubscribe<NewOrderMessage>('/topic/newOrder', callback);

  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    };
  }, [subscribe, unsubscribe]);
};

export const usePausedCookUpdateSubscription = (callback: (message: PausedCookUpdateMessage) => void) => {
  const { subscribe, unsubscribe } = useSubscribe<PausedCookUpdateMessage>('/topic/pausedCookUpdate', callback);

  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    };
  }, [subscribe, unsubscribe]);
};

export const useCookingOrderUpdateSubscription = (callback: (message: CookingOrderUpdateMessage) => void) => {
  const { subscribe, unsubscribe } = useSubscribe<CookingOrderUpdateMessage>('/topic/cookingOrderUpdate', callback);

  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    };
  }, [subscribe, unsubscribe]);
};
