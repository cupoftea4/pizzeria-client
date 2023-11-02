import style from './style.module.css';
import ArrowIcon from '@/icons/ArrowIcon';
import type { Pizza } from '@/services/types';

type OwnProps = {
  pizza: Pizza
};

const PizzaItem = (props: OwnProps) => {
  return (
    <div className={style.root}>
      <img src={props.pizza.url} alt={props.pizza.name} />
      <p>
        {props.pizza.name}
      </p>
      <ArrowIcon/>
    </div>
  );
};

export default PizzaItem;
