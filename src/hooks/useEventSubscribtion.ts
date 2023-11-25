/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSubscribe } from '@/context/websocket';

// Define types for messages
type BadRequestMessage = any; // Replace 'any' with the actual type
type NewOrderMessage = any; // Replace 'any' with the actual type
type PausedCookUpdateMessage = any; // Replace 'any' with the actual type
type CookingOrderUpdateMessage = any; // Replace 'any' with the actual type

// Specific subscription hooks
export const useBadRequestSubscription = (callback: (message: BadRequestMessage) => void) => {
  useSubscribe<BadRequestMessage>('/app/topic/badRequest', (message) => {
    console.error('/app/topic/badRequest', message);
    callback(message);
  });
};

export const useNewOrderSubscription = (callback: (message: NewOrderMessage) => void) => {
  useSubscribe<NewOrderMessage>('/topic/newOrder', (message) => {
    console.log('/topic/newOrder', message);
    callback(message);
  });
};

export const usePausedCookUpdateSubscription = (callback: (message: PausedCookUpdateMessage) => void) => {
  useSubscribe<PausedCookUpdateMessage>('/topic/pausedCookUpdate', (message) => {
    console.log('/topic/pausedCookUpdate', message);
    callback(message);
  });
};

export const useCookingOrderUpdateSubscription = (callback: (message: CookingOrderUpdateMessage) => void) => {
  useSubscribe<CookingOrderUpdateMessage>('/topic/cookingOrderUpdate', (message) => {
    console.log('/topic/cookingOrderUpdate', message);
    callback(message);
  });
};
