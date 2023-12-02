import { useEffect, useState } from 'react';
import style from './style.module.css';
import DownArrow from '@/icons/DownArrowIcon';
import UpArrow from '@/icons/UpArrowIcon';
import type { Order, PizzaRecipe } from '@/types/types';

type OwnProps = {
  orders: Record<number, Order>
  menu: PizzaRecipe[]
  onOrderClick: (order: Order) => void
};

const OrdersTable = ({ orders, menu, onOrderClick }: OwnProps) => {
  const [showTable, setShowTable] = useState(false);
  const [elapsedTimes, setElapsedTimes] = useState<Record<number, number>>({});
  const [orderColors, setOrderColors] = useState<Record<number, string>>({});
  const [showCompleted, setShowCompleted] = useState(false);
  const [visibleOrders, setVisibleOrders] = useState<Record<number, Order>>(orders);
  const [completedOrders, setCompletedOrders] = useState<number>(0);

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const toggleCompleted = () => {
    setShowCompleted(!showCompleted);
    if (showCompleted) {
      setVisibleOrders(orders);
    } else {
      setVisibleOrders(Object.values(orders)
        .filter(order => order.orderPizzas.some(orderPizza => !orderPizza.completedAt))
        .reduce<Record<number, Order>>((acc, order) => {
        acc[order.id] = order;
        return acc;
      }, {}));
    }
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

  useEffect(() => {
    setCompletedOrders(
      Object.values(orders).filter(order => order.orderPizzas.every(orderPizza => orderPizza.completedAt)).length);
  }, [orders]);

  useEffect(() => {
    setVisibleOrders(orders);
  }, []);

  return (
    <div className={style.root}>
      <div className={style['orders-header']}>
        <button onClick={toggleTable}>
          {showTable ? <DownArrow /> : <UpArrow />}
        </button>
        <h2>Orders</h2>
        {showTable && (
          <button className={style['completed-button']} onClick={toggleCompleted}>
            {showCompleted ? `Show Completed ${completedOrders}` : `Hide Completed ${completedOrders}`}
          </button>
        )}
      </div>
      {showTable && (
        <div className={style.table}>
          <div className={`${style.row} ${style['table-header']}`}>
            <div className={style.columnHeader}>#</div>
            <div className={style.columnHeader}>Diner name</div>
            <div className={style.columnHeader}>Item</div>
            <div className={style.columnHeader}>Status</div>
          </div>
          <div className={style['order-table']}>
          {
            Object.values(visibleOrders).sort((o1, o2) => o2.id - o1.id).map((order) => {
              const rowBackgroundColor = orderColors[order.id] ?? generateRowColor();
              if (!orderColors[order.id]) {
                setOrderColors((prev) => ({
                  ...prev,
                  [order.id]: rowBackgroundColor
                }));
              }

              return (
                order.orderPizzas?.map((orderPizza) => {
                  return (
                    <div
                      key={`${order.id}.${orderPizza.id}`}
                      className={style.row}
                      style={{ backgroundColor: rowBackgroundColor }}
                      onClick={() => onOrderClick(order)}
                    >
                      <div>{`${order.id}.${orderPizza.id}`}</div>
                      <div>{order.diner.name}</div>
                      <div>{menu.find(p => p.id === orderPizza.recipeId)?.name}</div>
                      <div>{`${orderPizza.currentStage ?? 'N/A'} (${elapsedTimes[orderPizza.id] ?? 'N/A'
                        }s)`}</div>
                    </div>
                  );
                }));
            })
          }
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
