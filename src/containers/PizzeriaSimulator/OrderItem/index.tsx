import style from './style.module.css';
import type { Pizza, CookingStage } from '@/types/types';

type OwnProps = {
  pizza: Pizza
  cookName: string
  stage: CookingStage
  onLeftClick: () => void
  onRightClick: () => void
};

const OrderItem = ({ pizza, cookName, stage }: OwnProps) => {
  return (
    <div className={style.root}>
      <p>Item: {pizza.name}</p>
      <p>Ingredients: {pizza.toppings.join(', ')}</p>
      <p>Minimum preparation time: </p>
    </div>
  );
};

export default OrderItem;
