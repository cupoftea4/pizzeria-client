import style from './style.module.css';
import PizzeriaBackground from '../PizzeriaBackground';
import OrdersTable from '../OrdersTable';
import CooksTable from '../CooksTable';
import type { Cook, Order, PizzaRecipe } from '@/types/types';

type OwnProps = {
  cooks: Cook[]
  orders: Order[]
  menu: PizzaRecipe[]
};

const Simulator = ({
  cooks,
  orders,
  menu
}: OwnProps) => {
  return (
    <div className={style.root}>
      <div className={style.background}>
        <PizzeriaBackground/>
      </div>
      <OrdersTable
        orders={orders}
        menu={menu}
      />
      <CooksTable
        cooks={cooks}
        orders={orders}
        menu={menu}
      />
    </div>
  );
};

export default Simulator;
