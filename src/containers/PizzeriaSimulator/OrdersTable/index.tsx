import { useEffect, useState } from 'react';
import style from './style.module.css';
import DownArrow from '@/icons/DownArrowIcon';
import UpArrow from '@/icons/UpArrowIcon';
import type { Order, PizzaRecipe } from '@/types/types';

type OwnProps = {
  orders: Order[]
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
    const intervals: NodeJS.Timeout[] = [];

    orders.forEach((order) => {
      const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - new Date(order.createdAt).getTime();
        setElapsedTimes((prev) => ({
          ...prev,
          [order.id]: Math.floor(elapsedTime / 1000)
        }));
      }, 1000);

      intervals.push(intervalId);
    });

    return () => {
      intervals.forEach((intervalId) => clearInterval(intervalId));
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
            orders.map((order) => {
              const rowBackgroundColor = orderColors[order.id] ?? generateRowColor();
              if (!orderColors[order.id]) {
                setOrderColors((prev) => ({
                  ...prev,
                  [order.id]: rowBackgroundColor
                }));
              }
              return (
                order.orderPizza.map((orderPizza, index) => (
                  <div
                    key={`${order.id}.${index + 1}`}
                    className={style.row}
                    style={{ backgroundColor: rowBackgroundColor }}
                  >
                    <div>{`${order.id}.${index + 1}`}</div>
                    <div>{order.dinner.name}</div>
                    <div>{menu.find(p => p.id === orderPizza.id)?.name}</div>
                    <div>{`${orderPizza.currentStage} (${elapsedTimes[order.id]}s)`}</div>
                  </div>
                )
                ));
            })
          }
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
