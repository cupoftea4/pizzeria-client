import { useState } from 'react';
import style from './style.module.css';
import DownArrow from '@/icons/DownArrowIcon';
import UpArrow from '@/icons/UpArrowIcon';

const CooksTable = () => {
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
          <div className={style.row}>
            <div>William</div>
            <div>#12.1 (Pepperoni)</div>
            <div>Topping</div>
            <div>
              <button>
                {}
              </button>
            </div>
          </div>
          <div className={style.row}>
            <div>Helen</div>
            <div>#12.2 (Quatro Formagi)</div>
            <div>Baking</div>
            <div></div>
          </div>
          <div className={style.row}>
            <div>Harry</div>
            <div>#15.1 (Spanish)</div>
            <div>Baking</div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CooksTable;
