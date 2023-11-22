import { useState } from 'react';
import style from './style.module.css';
import DownArrow from '@/icons/DownArrowIcon';
import UpArrow from '@/icons/UpArrowIcon';

const OrdersTable = () => {
  const [showTable, setShowTable] = useState(false);

  const toggleTable = () => {
    setShowTable(!showTable);
  };

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
          <div className={style.row}>
            <div>12.1</div>
            <div>Robert</div>
            <div>Pepperoni</div>
            <div>Topping(5s)</div>
          </div>
          <div className={style.row}>
            <div>12.2</div>
            <div>Robert</div>
            <div>Quatro Formaggi...</div>
            <div>Baking(7s)</div>
          </div>
          <div className={style.row}>
            <div>12.3</div>
            <div>Elizabeth</div>
            <div>Spanish</div>
            <div>Done(13s)</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
