import style from './style.module.css';
import PizzeriaBackground from '../PizzeriaBackground';
import OrdersTable from '../OrdersTable';
import CooksTable from '../CooksTable';

const Simulator = () => {
  return (
    <div className={style.root}>
      <div className={style.background}>
        <PizzeriaBackground/>
      </div>
      <OrdersTable/>
      <CooksTable/>
    </div>
  );
};

export default Simulator;
