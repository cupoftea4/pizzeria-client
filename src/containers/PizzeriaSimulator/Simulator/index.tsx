import style from './style.module.css';
import PizzeriaBackground from '../PizzeriaBackground';
import OrdersTable from '../OrdersTable';
import { useCallback, useEffect, useState } from 'react';
import type { Cook, CookStatus, CookingStage, Order, PizzaRecipe } from '@/types/types';
import OrderModal from '../OrderModal';
import CooksTable from '../CooksTable';
import { useConfig } from '@/hooks/useConfig';
import { useKitchenState } from '@/hooks/useKitchenState';
import {
  useCookingOrderUpdateSubscription,
  useNewOrderSubscription,
  usePausedCookUpdateSubscription,
  type CookingOrderUpdateMessage,
  type PausedCookUpdateMessage
} from '@/hooks/useEventSubscribtion';
import { mergeUpdateIntoCook, mergeUpdateIntoOrder } from '@/utils/orders';
import { arrayToObject } from '@/utils/object';

const Simulator = () => {
  const { config, error: configError } = useConfig();
  const { kitchenState, error: kitchenStateError } = useKitchenState();
  const [orders, setOrders] = useState<Record<number, Order>>([]);
  const [cooks, setCooks] = useState<Record<number, Cook>>({});
  const [minimumPizzaTime, setMinimumPizzaTime] = useState(123);
  const [menu, setMenu] = useState<PizzaRecipe[]>([]);

  const handleNewOrderUpdate = useCallback((order: Order) => {
    console.warn('NEW ORDER', order);
    setOrders(orders => ({ ...orders, [order.id]: order }));
  }, []);

  const handleCookingOrderUpdate = useCallback((update: CookingOrderUpdateMessage) => {
    console.warn('ORDER UPDATE', update);
    setOrders(orders => {
      const orderToUpdate = orders[update.orderId];
      if (!orderToUpdate) return orders;
      return { ...orders, [update.orderId]: mergeUpdateIntoOrder(orderToUpdate, update) };
    });

    setCooks(cooks => {
      if (update.cookId === null) return cooks;
      const cookToUpdate = cooks[update.cookId];
      if (!cookToUpdate) return cooks;
      return {
        ...cooks,
        [update.cookId]: mergeUpdateIntoCook(cookToUpdate, update)
      };
    });
  }, []);

  const handlePausedCookUpdate = useCallback((update: PausedCookUpdateMessage) => {
    setCooks(cooks => {
      console.warn('PAUSED COOK UPDATE', update);
      const updatedCook = cooks[update.cookId];
      if (!updatedCook) {
        return cooks;
      }
      let newStatus: CookStatus = updatedCook.orderId !== undefined ? 'BUSY' : 'FREE'; // assuming it was paused before
      if (updatedCook.status !== 'PAUSED') {
        newStatus = 'PAUSED';
      }
      return {
        ...cooks,
        [update.cookId]: { ...updatedCook, status: newStatus }
      };
    });
  }, []);

  useNewOrderSubscription(handleNewOrderUpdate);
  useCookingOrderUpdateSubscription(handleCookingOrderUpdate);
  usePausedCookUpdateSubscription(handlePausedCookUpdate);

  const [currentOrder, setCurrentOrder] = useState<Order>();
  const [pizzaStagesTimeCoeffs, setPizzaStagesTimeCoeffs] = useState<Record<CookingStage, number>>({
    Topping: 0,
    Dough: 0,
    Baking: 0,
    Packaging: 0,
    Completed: 0
  });

  const handleModalClose = () => {
    setCurrentOrder(undefined);
  };

  useEffect(() => {
    if (!config) return;
    setMinimumPizzaTime(config.minimumPizzaTime);
    setMenu(config.menu);
    setPizzaStagesTimeCoeffs(config.pizzaStagesTimeCoeffs);
  }, [config]);

  useEffect(() => {
    if (!kitchenState) return;
    setCooks(arrayToObject(kitchenState.cooks, 'id'));
    setOrders(arrayToObject(kitchenState.orders, 'id'));
  }, [kitchenState]);

  if (kitchenStateError || configError) return <div>{kitchenStateError ?? configError}</div>;
  return (
      <div className={style.root}>
        <div className={style.background}>
          <PizzeriaBackground/>
        </div>
        <OrdersTable orders={orders} menu={menu} onOrderClick={(order) => setCurrentOrder(order)} />
        <CooksTable
          cooks={cooks}
          orders={orders}
          menu={menu}
        />
        { currentOrder &&
          <OrderModal
            cooks={cooks}
            order={currentOrder}
            pizzaStagesTimeCoeffs={pizzaStagesTimeCoeffs}
            minimumPizzaTime={minimumPizzaTime}
            menu={menu}
            onClose={handleModalClose}
          />
        }
      </div>
  );
};

export default Simulator;
