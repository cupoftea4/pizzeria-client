import type { CookingOrderUpdateMessage } from '@/hooks/useEventSubscribtion';
import type { Cook, Order } from '@/types/types';

export function mergeUpdateIntoOrder(order: Order, update: CookingOrderUpdateMessage): Order {
  console.log('mergeUpdateIntoOrder', order, update);
  return {
    ...order,
    orderPizzas: [...order.orderPizzas.map(
      p => p.id !== update.orderId
        ? p
        : {
          ...p,
          currentStage: update.currentStage,
          completedAt: update.completedAt,
          currentTopping: update.currentTopping
        } satisfies typeof p
    )]
  };
}

export function mergeUpdateIntoCook(cook: Cook, update: CookingOrderUpdateMessage): Cook {
  return {
    ...cook,
    orderId: update.orderId,
    orderPizzaId: update.orderPizzaId,
    status: 'BUSY'
  } satisfies Cook;
}
