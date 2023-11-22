import style from './style.module.css';
import PizzeriaBackground from '../PizzeriaBackground';
import OrdersTable from '../OrdersTable';

const Simulator = () => {
  return (
    <div className={style.root}>
      <div className={style.background}>
        <PizzeriaBackground />
      </div>
      <OrdersTable/>
    </div>
  );
};

export default Simulator;
