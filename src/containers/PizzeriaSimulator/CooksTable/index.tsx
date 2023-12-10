/* eslint-disable max-len */
import { useState } from 'react';
import style from './style.module.css';
import DownArrow from '@/icons/DownArrowIcon';
import UpArrow from '@/icons/UpArrowIcon';
import type { Cook, Order, PizzaRecipe } from '@/types/types';
import StopIcon from '@/icons/StopIcon';
import PlayIcon from '@/icons/PlayIcon';
import { useCookControl } from '@/hooks/useCookControl';
import { toast } from 'react-toastify';
import { CAT_ID } from '@/types/canvasCook';

type OwnProps = {
  cooks: Record<number, Cook>
  orders: Record<number, Order>
  menu: PizzaRecipe[]
};

const CooksTable = ({
  cooks,
  orders,
  menu
}: OwnProps) => {
  const [showTable, setShowTable] = useState(false);
  const { pauseCook, resumeCook } = useCookControl();

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const handleCookStateChange = (cook: Cook) => {
    if (cook.id === CAT_ID) {
      toast.error(
        'The cat is not a cook, he is the boss of the pizzeria!',
        {
          autoClose: 6000,
          icon: '😾'
        }
      );
      return;
    }
    if (cook.status !== 'PAUSED') {
      pauseCook(cook.id);
      if (cook.orderId !== null) {
        toast.info('The cook is paused, but he must first finish the task he is working on');
      }
    } else {
      resumeCook(cook.id);
    }
  };

  return (
    <div className={style.root}>
      <div className={style['cooks-header']}>
        <button onClick={toggleTable}>
          {showTable ? <UpArrow /> : <DownArrow />}
        </button>
        <h2>Cooks</h2>
      </div>
      {showTable && (
        <div className={style.table}>
          <div className={`${style.row} ${style['table-header']}`}>
            <div className={style.columnHeader}>Cook name (specialization)</div>
            <div className={style.columnHeader}>Order</div>
            <div className={style.columnHeader}>Stage</div>
            <div className={style.columnHeader}>State</div>
          </div>
          {
            Object.entries(cooks).map(([cookId, cook]) => {
              const order = cook.orderId !== null ? orders[cook.orderId] : null;
              const orderPizza = order?.orderPizzas?.find(p => p.id === cook.orderPizzaId);

              return (<div key={`${cookId}`} className={style.row}>
                <div>
                  {`${cook.id === CAT_ID ? 'A cat' : cook.name} ${cook.specialization ? `(${cook.specialization})` : ''}`}
                </div>
                {order
                  ? <div>{
                      `#${order?.id}.${orderPizza?.id}
                      (${menu.find(p => p.id === orderPizza?.recipeId)?.name})`
                    }</div>
                  : <div>Free</div>}
                <div>{`${orderPizza?.currentStage ?? ''} ${
                  orderPizza?.currentStage === 'Topping' ? `(${orderPizza?.currentTopping})` : ''
                }`}</div>
                  <div>
                    <button className={style['cook-state-button']} onClick={() => handleCookStateChange(cook)}>
                      {cook.status === 'PAUSED' ? <PlayIcon /> : <StopIcon />}
                    </button>
                  </div>
              </div>);
            })
          }
        </div>
      )}
    </div>
  );
};

export default CooksTable;
