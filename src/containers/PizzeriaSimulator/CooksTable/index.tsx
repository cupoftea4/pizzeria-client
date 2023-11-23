/* eslint-disable max-len */
import { useState } from 'react';
import style from './style.module.css';
import DownArrow from '@/icons/DownArrowIcon';
import UpArrow from '@/icons/UpArrowIcon';
import type { Cook, Order, PizzaRecipe } from '@/types/types';
import StopIcon from '@/icons/StopIcon';
import PlayIcon from '@/icons/PlayIcon';

type OwnProps = {
  cooks: Cook[]
  orders: Order[]
  menu: PizzaRecipe[]
};

const CooksTable = ({
  cooks,
  orders,
  menu
}: OwnProps) => {
  const [showTable, setShowTable] = useState(false);

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <div className={style.root}>
      <div className={style['table-header']}>
        <button onClick={toggleTable}>
          {showTable ? <UpArrow /> : <DownArrow />}
        </button>
        <h2>Cooks</h2>
      </div>
      {showTable && (
        <div className={style.table}>
          <div className={style.row}>
            <div className={style.columnHeader}>Cook name</div>
            <div className={style.columnHeader}>Order</div>
            <div className={style.columnHeader}>Stage</div>
            <div className={style.columnHeader}>State</div>
          </div>
          {
            cooks.map((cook) => {
              const order = orders.find(o => o.id === cook.orderId);
              const orderPizza = orders.find(o => o.id === cook.orderId)?.orderPizza.at(cook.orderPizzaId!);

              return (<div key={`${cook.id}`} className={style.row}>
                <div>{cook.name}</div>
                <div>{
                  `#${order?.id}.${orderPizza?.id}
                  (${menu.find(p => p.id === orderPizza?.id)?.name})`
                }</div>
                <div>{orderPizza?.currentStage}</div>
                {cook.status !== 'free' &&
                  <div>
                    <button className={style['cook-state-button']}>
                      {cook.status === 'busy' ? <StopIcon /> : <PlayIcon />}
                    </button>
                  </div>
                }
              </div>);
            })
          }
        </div>
      )}
    </div>
  );
};

export default CooksTable;
