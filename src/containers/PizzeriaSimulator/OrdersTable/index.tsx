import { useEffect, useState } from 'react';
import style from './style.module.css';
import DownArrow from '@/icons/DownArrowIcon';
import UpArrow from '@/icons/UpArrowIcon';
import type { Order, PizzaRecipe } from '@/types/types';

type OwnProps = {
  orders: Record<number, Order>
  menu: PizzaRecipe[]
};

const OrdersTable = ({ orders, menu }: OwnProps) => {
  const [showTable, setShowTable] = useState(false);
  const [elapsedTimes, setElapsedTimes] = useState<Record<number, number>>({});
  const [orderColors, setOrderColors] = useState<Record<number, string>>({});

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const generateRowColor = () => {
    const hue = Math.floor(Math.random() * 361);
    const saturation = Math.floor(Math.random() * 21) + 30;
    const lightness = Math.floor(Math.random() * 21) + 80;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const times: Record<number, number> = {};
      Object.values(orders).forEach((order) => {
        order.orderPizzas.forEach((orderPizza) => {
          const endTime = orderPizza.completedAt ? new Date(orderPizza.completedAt) : new Date();
          const elapsedTime = endTime.getTime() - new Date(order.createdAt).getTime();
          times[orderPizza.id] = Math.round(elapsedTime / 1000);
          return times;
        });
      });
      setElapsedTimes(times);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [orders]);

  return (
    <div className={style.root}>
      <div className={style['table-header']}>
        <button onClick={toggleTable}>
          {showTable ? <DownArrow /> : <UpArrow />}
        </button>
        <h2>Orders</h2>
      </div>
      {showTable && (
        <div className={style.table}>
          <div className={style.row}>
            <div className={style.columnHeader}>#</div>
            <div className={style.columnHeader}>Diner name</div>
            <div className={style.columnHeader}>Item</div>
            <div className={style.columnHeader}>Status</div>
          </div>
          {
            Object.values(orders).sort((o1, o2) => o2.id - o1.id).map((order) => {
              const rowBackgroundColor = orderColors[order.id] ?? generateRowColor();
              if (!orderColors[order.id]) {
                setOrderColors((prev) => ({
                  ...prev,
                  [order.id]: rowBackgroundColor
                }));
              }

              return (
                order.orderPizzas?.map((orderPizza, index) => {
                  return (
                  <div
                    key={`${order.id}.${index + 1}`}
                    className={style.row}
                    style={{ backgroundColor: rowBackgroundColor }}
                  >
                    <div>{`${order.id}.${index + 1}`}</div>
                    <div>{order.diner.name}</div>
                    <div>{menu.find(p => p.id === orderPizza.recipeId)?.name}</div>
                    <div>{`${orderPizza.currentStage ?? 'New'} (${
                      elapsedTimes[orderPizza.id] ?? 'N/A'
                    }s)`}</div>
                  </div>
                  );
                }));
            })
          }
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
