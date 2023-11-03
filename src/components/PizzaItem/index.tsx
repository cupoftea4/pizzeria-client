import style from './style.module.css';
import ArrowIcon from '@/icons/ArrowIcon';
import type { Pizza } from '@/services/types';

type OwnProps = {
  pizza: Pizza
  addPizzaToSelected: (pizza: Pizza) => void
  removePizzaFromSelected: (pizza: Pizza) => void
};

const PizzaItem = (props: OwnProps) => {
  return (
    <div className={style.root}>
      <img src={props.pizza.url} alt={props.pizza.name} />
      <div className={style.container}>
        <p className={style.text}>{props.pizza.name}</p>
        <ArrowIcon className={style['arrow-icon']}/>
      </div>
    </div>
  );
};

export default PizzaItem;
