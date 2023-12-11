import LeftPolygon from '@/icons/LeftPolygon';
import style from './style.module.css';
import type { PizzaRecipe } from '@/types/types';
import RightPolygon from '@/icons/RightPolygon';

type OwnProps = {
  pizza?: PizzaRecipe
  pizzaId: number
  totalPizzaCount: number
  totalCookedTimes: number
  onLeftClick: () => void
  onRightClick: () => void
};

const EndingItem = ({
  pizza,
  pizzaId,
  totalPizzaCount,
  totalCookedTimes,
  onLeftClick,
  onRightClick
}: OwnProps) => {
  return (
    <div className={style.root}>
      <div>
        <div className={style['top-section']}>
          <div className={style['text-section']}>
            <p><strong>Item: </strong>{pizza?.name}</p>
            <p><strong>Ingredients: </strong>{pizza?.toppings.join(', ')}</p>
            <p><strong>Cooked </strong>{totalCookedTimes}<strong> times</strong></p>
          </div>
          <div className={style['image-section']}>
            <img src={pizza?.url} alt={pizza?.name} />
          </div>
        </div>
      </div>
      <div className={style.buttons}>
        <button onClick={onLeftClick}>
          <LeftPolygon />
        </button>
        <p>{pizzaId}/{totalPizzaCount}</p>
        <button onClick={onRightClick}>
          <RightPolygon />
        </button>
      </div>
    </div>
  );
};

export default EndingItem;
