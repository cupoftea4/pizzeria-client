import style from './style.module.css';
import PizzeriaBackground from '../PizzeriaBackground';
import OrdersTable from '../OrdersTable';
import { useCallback, useEffect, useState } from 'react';
import type { Cook, CookingStage, Order, PizzaRecipe } from '@/types/types';
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

const Simulator = () => {
  const { config, error: configError } = useConfig();
  const { kitchenState, error: kitchenStateError } = useKitchenState();
  const [orders, setOrders] = useState<Order[]>([]);
  const [cooks, setCooks] = useState<Cook[]>([]);
  const [minimumPizzaTime, setMinimumPizzaTime] = useState(123);
  const [menu, setMenu] = useState<PizzaRecipe[]>([]);

  const handleNewOrderUpdate = useCallback((order: Order) => {
    console.warn('NEW ORDER', order);
    setOrders(orders => [...orders, order]);
  }, []);

  const handleCookingOrderUpdate = useCallback((order: CookingOrderUpdateMessage) => {
    console.warn('ORDER UPDATE', order);
    // BUTT PLUG: something evil is happening here
    if (order.currentStage === null) {
      order.completedAt = new Date().toISOString();
      order.currentStage = 'Completed';
    }
    setOrders(orders => orders.map(o => o.id !== order.orderId ? o : mergeUpdateIntoOrder(o, order)));
    setCooks(cooks => {
      const newCooks = cooks.map(c => c.id !== order.cookId ? c : mergeUpdateIntoCook(c, order));
      return newCooks;
    });
  }, []);

  const handlePausedCookUpdate = useCallback((update: PausedCookUpdateMessage) => {
    setCooks(cooks => {
      const updatedCook = cooks.find(c => c.id === update.cookId);
      if (!updatedCook) return cooks;
      return [
        ...cooks.filter(c => c.id !== update.cookId),
        { ...updatedCook, status: 'PAUSED' }
      ];
    });
  }, []);

  useNewOrderSubscription(handleNewOrderUpdate);
  useCookingOrderUpdateSubscription(handleCookingOrderUpdate);
  usePausedCookUpdateSubscription(handlePausedCookUpdate);

  const [currentOrder, setCurrentOrder] = useState<Order>();
  console.log(setCurrentOrder);
  const [pizzaStagesTimeCoeffs, setPizzaStagesTimeCoeffs] = useState<Record<CookingStage, number>>({
    Topping: 0,
    Dough: 0,
    Baking: 0,
    Packaging: 0,
    Completed: 0
  });

  useEffect(() => {
    if (!config) return;
    setMinimumPizzaTime(config.minimumPizzaTime);
    setMenu(config.menu);
    setPizzaStagesTimeCoeffs(config.pizzaStagesTimeCoeffs);
  }, [config]);

  useEffect(() => {
    if (!kitchenState) return;
    setCooks(kitchenState.cooks);
    setOrders(kitchenState.orders);
  }, [kitchenState]);

  if (kitchenStateError || configError) return <div>{kitchenStateError ?? configError}</div>;
  return (
      <div className={style.root}>
        <div className={style.background}>
          <PizzeriaBackground/>
        </div>
        <OrdersTable orders={orders} menu={menu} />
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
          />
        }
      </div>
  );
};

export default Simulator;
