import LeftPolygon from '@/icons/LeftPolygon';
import style from './style.module.css';
import type { PizzaRecipe, CookingStage, TimedCookingStageToValue } from '@/types/types';
import RightPolygon from '@/icons/RightPolygon';

type OwnProps = {
  pizza?: PizzaRecipe
  pizzaId: number
  pizzaCount: number
  cookName: string | null
  stage: CookingStage | 'None'
  minimumPizzaTime: number
  pizzaStagesTimeCoeffs: TimedCookingStageToValue
  onLeftClick: () => void
  onRightClick: () => void
};

const OrderItem = ({
  pizza,
  pizzaId,
  pizzaCount,
  cookName,
  stage,
  minimumPizzaTime,
  pizzaStagesTimeCoeffs,
  onLeftClick,
  onRightClick
}: OwnProps) => {
  const pizzaTime = Math.round(
    minimumPizzaTime * pizzaStagesTimeCoeffs.Dough +
    (minimumPizzaTime * pizzaStagesTimeCoeffs.Topping) * (pizza?.toppings.length ?? 0) +
    minimumPizzaTime * pizzaStagesTimeCoeffs.Baking +
    minimumPizzaTime * pizzaStagesTimeCoeffs.Packaging);

  return (
    <div className={style.root}>
      <div>

        <div className={style['top-section']}>
          <div className={style['text-section']}>
            <p><strong>Item: </strong>{pizza?.name}</p>
            <p><strong>Ingredients: </strong>{pizza?.toppings.join(', ')}</p>
          </div>
          <div className={style['image-section']}>
            <img src={pizza?.url} alt={pizza?.name} />
          </div>
        </div>
        <p><strong>Minimum preparation time: </strong>{pizzaTime}</p>
      </div>
      {cookName &&
        <div className={style.table}>
          <div className={style.row}>
            <div className={style.columnHeader}>Cook name</div>
            <div className={style.columnHeader}>Status</div>
          </div>
          <div className={style.row}>
            <div>{cookName}</div>
            <div>{stage}</div>
          </div>
        </div>
      }
      <div className={style.buttons}>
        <button onClick={onLeftClick}>
          <LeftPolygon />
        </button>
        <p>{pizzaId}/{pizzaCount}</p>
        <button onClick={onRightClick}>
          <RightPolygon />
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
