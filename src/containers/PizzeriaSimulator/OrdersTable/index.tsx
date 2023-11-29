import { useEffect, useState, useRef, useCallback } from 'react';
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

  const [visibleRows, setVisibleRows] = useState<Order[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);
  const rowHeight = 50; // Height of each row
  const buffer = 5; // Number of rows to render outside the viewport

  const handleScroll = useCallback(() => {
    if (!tableRef.current) {
      return;
    }
    const scrollTop = tableRef.current.scrollTop;
    const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
    const visibleRowCount = Math.ceil(window.innerHeight / rowHeight) + 2 * buffer;
    const endRow = startRow + visibleRowCount;
    setVisibleRows(Object.values(orders).slice(startRow, endRow));
  }, [orders]);

  useEffect(() => {
    setVisibleRows(Object.values(orders).slice(0, window.innerHeight / rowHeight + buffer));
    // Add scroll event listener
    const tableElement = tableRef.current;
    if (!tableElement) {
      return;
    }
    tableElement.addEventListener('scroll', handleScroll);

    return () => {
      // Remove scroll event listener
      tableElement.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, orders]);

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
          <div className={style.table} ref={tableRef} onScroll={handleScroll}>
          {
            Object.values(visibleRows).map((order) => {
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
                    onClick={() => onOrderClick(order)}
                  >
                    <div>{`${order.id}.${index + 1}`}</div>
                    <div>{order.diner.name}</div>
                    <div>{menu.find(p => p.id === orderPizza.recipeId)?.name}</div>
                    <div>{`${orderPizza.currentStage ?? 'Waiting'} (${
                      elapsedTimes[orderPizza.id] ?? 'N/A'
                    }s)`}</div>
                  </div>
                  );
                }));
            })
          }
        </div>
        </div>)}
    </div>
  );
};

export default OrdersTable;
