import style from './style.module.css';
import PizzeriaBackground from '../PizzeriaBackground';
import OrdersTable from '../OrdersTable';
import { useCallback, useEffect, useState } from 'react';
import type { Cook, Order, PizzaRecipe } from '@/types/types';
import OrderModal from '../OrderModal';
import CooksTable from '../CooksTable';

const Simulator = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cooks, setCooks] = useState<Cook[]>([]);
  const [minimumPizzaTime, setMinimumPizzaTime] = useState(123);
  const [menu, setMenu] = useState<PizzaRecipe[]>([]);

  const [currentOrder, setCurrentOrder] = useState<Order>();

  const setState = (data: { cooks: Cook[], orders: Order[] }) => {
    setOrders(data.orders);
    setCooks(data.cooks);
  };

  type ConfigData = {
    minimumPizzaTime: number
    menu: PizzaRecipe[]
  };

  const setConfig = useCallback((data: ConfigData) => {
    setMinimumPizzaTime(data.minimumPizzaTime);
    setMenu(data.menu);
    console.log('Minimum pizza time:');
    console.log(data.minimumPizzaTime);
    console.log('Menu:');
    console.log(data.menu);
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/kitchen-state')
      .then(response => response.json())
      .then(data => setState(data as { cooks: Cook[], orders: Order[] }));

    fetch('http://localhost:8080/config')
      .then(response => response.json())
      .then(data => setConfig(data as ConfigData));
  }, [setConfig]);

  // temporary solution for disable ts error
  console.log(orders);
  console.log(setCurrentOrder);

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
          minimumPizzaTime={minimumPizzaTime}
          menu={menu}
        />
      }
    </div>
  );
};

export default Simulator;
