import type { CookingOrderUpdateMessage } from '@/hooks/useEventSubscription';
import type { Cook, Order } from '@/types/types';

export function mergeUpdateIntoOrder(order: Order, update: CookingOrderUpdateMessage): Order {
  const res = {
    ...order,
    orderPizzas: [...order.orderPizzas.map(
      p => p.id !== update.orderPizzaId
        ? p
        : {
          ...p,
          currentStage: update.currentStage,
          completedAt: update.completedAt,
          currentTopping: update.currentTopping,
          modifiedAt: update.modifiedAt
        } satisfies typeof p
    )]
  };
  return res;
}

export function mergeUpdateIntoCook(cook: Cook, update: CookingOrderUpdateMessage): Cook {
  if (update.currentStage === null || update.currentStage === 'Waiting' || update.currentStage === 'Completed') {
    return {
      ...cook,
      orderId: null,
      orderPizzaId: null,
      status: cook.status === 'BUSY' ? 'FREE' : cook.status
    } satisfies Cook;
  }
  return {
    ...cook,
    orderId: update.orderId,
    orderPizzaId: update.orderPizzaId
  } satisfies Cook;
}
