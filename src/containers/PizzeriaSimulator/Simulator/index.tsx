import style from './style.module.css';
import PizzeriaBackground from '../PizzeriaBackground';
import OrdersTable from '../OrdersTable';
import { useEffect, useState } from 'react';
import type { Cook, CookingStage, Order, PizzaRecipe } from '@/types/types';
import OrderModal from '../OrderModal';
import CooksTable from '../CooksTable';
import { useConfig } from '@/hooks/useConfig';
import { useKitchenState } from '@/hooks/useKitchenState';
import { useCookingOrderUpdateSubscription, useNewOrderSubscription } from '@/hooks/useEventSubscribtion';

const Simulator = () => {
  const { config, error: configError } = useConfig();
  const { kitchenState, error: kitchenStateError } = useKitchenState();
  const [orders, setOrders] = useState<Order[]>([]);
  const [cooks, setCooks] = useState<Cook[]>([]);
  const [minimumPizzaTime, setMinimumPizzaTime] = useState(123);
  const [menu, setMenu] = useState<PizzaRecipe[]>([]);

  useNewOrderSubscription((order) => orders.push(order));
  useCookingOrderUpdateSubscription((order) => setOrders(orders.map(o => o.id === order.id ? order : o)));
  useCookingOrderUpdateSubscription((order) => {});

  const [currentOrder, setCurrentOrder] = useState<Order>();
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
