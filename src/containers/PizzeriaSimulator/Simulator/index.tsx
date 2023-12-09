import style from './style.module.css';
import PizzeriaBackground from '../PizzeriaBackground';
import OrdersTable from '../OrdersTable';
import { useCallback, useEffect, useState } from 'react';
import type { Cook, Order, PizzaRecipe, TimedCookingStageToValue } from '@/types/types';
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
} from '@/hooks/useEventSubscribtion'; // spell issue
import { mergeUpdateIntoCook, mergeUpdateIntoOrder } from '@/utils/orders';
import { arrayToObject } from '@/utils/object';
import { toast } from 'react-toastify';

const Simulator = () => {
  const { config, error: configError } = useConfig();
  const { kitchenState, error: kitchenStateError } = useKitchenState();
  const [orders, setOrders] = useState<Record<number, Order>>({});
  const [cooks, setCooks] = useState<Record<number, Cook>>({});
  const [minimumPizzaTime, setMinimumPizzaTime] = useState(123);
  const [menu, setMenu] = useState<PizzaRecipe[]>([]);

  const handleNewOrderUpdate = useCallback((order: Order) => {
    console.warn('NEW ORDER', order);
    // BUTT PLUG
    order.orderPizzas.forEach(pizza => { pizza.currentStage = 'Waiting'; });
    setOrders(orders => ({ ...orders, [order.id]: order }));
  }, []);

  const handleCookingOrderUpdate = useCallback((update: CookingOrderUpdateMessage) => {
    console.warn('ORDER UPDATE', update);
    setOrders(orders => {
      const orderToUpdate = orders[update.orderId];
      if (!orderToUpdate) {
        console.error('UPDATE: Can`t find order', update.orderId, orders);
        return orders;
      }
      return { ...orders, [update.orderId]: mergeUpdateIntoOrder(orderToUpdate, update) };
    });

    setCooks(cooks => {
      const cookToUpdate = cooks[update.cookId];
      if (!cookToUpdate) {
        console.error('UPDATE: Can`t find cook', update.cookId, cooks);
        return cooks;
      }
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
        console.error('COOK: Can`t find cook', update.cookId);
        return cooks;
      }
      return {
        ...cooks,
        [update.cookId]: { ...updatedCook, status: update.cookStatus }
      };
    });
  }, []);

  useNewOrderSubscription(handleNewOrderUpdate);
  useCookingOrderUpdateSubscription(handleCookingOrderUpdate);
  usePausedCookUpdateSubscription(handlePausedCookUpdate);

  const [currentOrder, setCurrentOrder] = useState<Order>();
  const [pizzaStagesTimeCoeffs, setPizzaStagesTimeCoeffs] = useState<TimedCookingStageToValue>();

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

  useEffect(() => {
    if (!kitchenStateError) return;
    toast.error(kitchenStateError);
  }, [kitchenStateError]);

  useEffect(() => {
    if (!configError) return;
    toast.error(configError);
  }, [configError]);

  return (
      <div className={style.root}>
        <PizzeriaBackground/>
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
