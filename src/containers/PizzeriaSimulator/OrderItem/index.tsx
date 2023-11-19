import LeftPolygon from '@/icons/LeftPolygon';
import style from './style.module.css';
import type { PizzaRecipe, CookingStage } from '@/types/types';
import RightPolygon from '@/icons/RightPolygon';

type OwnProps = {
  pizza?: PizzaRecipe
  pizzaId: number
  cookName: string
  stage: CookingStage | 'None'
  minimumPizzaTime: number
  pizzaStagesTimeCoeffs: Record<CookingStage, number>
  onLeftClick: () => void
  onRightClick: () => void
};

const OrderItem = ({
  pizza,
  pizzaId,
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
      <div className={style.buttons}>
        <div onClick={onLeftClick}>
          <LeftPolygon />
        </div>
        <p>{pizzaId}</p>
        <div onClick={onRightClick}>
          <RightPolygon />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
