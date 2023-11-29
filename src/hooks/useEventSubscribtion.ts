/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSubscribe } from '@/context/websocket';
import type { CookingStage } from '@/types/types';
import { useEffect } from 'react';

// Define types for messages
type BadRequestMessage = any; // Replace 'any' with the actual type
export type PausedCookUpdateMessage = {
  cookId: number
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
  cookId: number | null
  orderId: number
  orderPizzaId: number
  completedAt: string | null
};

// Specific subscription hooks
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
