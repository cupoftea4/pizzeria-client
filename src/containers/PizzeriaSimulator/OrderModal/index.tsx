import { useCallback, useEffect, useState } from 'react';
import style from './style.module.css';
import OrderItem from '@/containers/PizzeriaSimulator/OrderItem';
import type { Cook, Order, PizzaRecipe, TimedCookingStageToValue } from '@/types/types';

type OwnProps = {
  cooks: Record<number, Cook>
  order: Order
  minimumPizzaTime: number
  pizzaStagesTimeCoeffs?: TimedCookingStageToValue
  menu: PizzaRecipe[]
  orderPizzaId?: number
  onClose: () => void
};

const OrderModal = ({
  cooks,
  order,
  minimumPizzaTime,
  pizzaStagesTimeCoeffs = {
    Dough: 0.3,
    Topping: 0.2,
    Baking: 0.4,
    Packaging: 0.1
  },
  menu,
  orderPizzaId,
  onClose
}: OwnProps) => {
  const initPizzaIndex = order.orderPizzas.findIndex(pizza => pizza.id === orderPizzaId);
  const [currentPizzaIndex, setCurrentPizzaIndex] = useState(initPizzaIndex === -1 ? 0 : initPizzaIndex);
  const [cooksOnThisOrder, setCooksOnThisOrder] = useState<Cook[]>([]);
  const [countedTime, setCountedTime] = useState(0);

  useEffect(() => {
    const pizzaIndex = order.orderPizzas.findIndex(pizza => pizza.id === orderPizzaId);
    if (pizzaIndex !== -1) {
      setCurrentPizzaIndex(pizzaIndex);
    }
  }, [order.orderPizzas, orderPizzaId]);

  const onLeftClick = () => {
    if (currentPizzaIndex > 0) {
      setCurrentPizzaIndex(currentPizzaIndex - 1);
    } else {
      setCurrentPizzaIndex(order.orderPizzas.length - 1);
    }
  };

  const onRightClick = () => {
    if (currentPizzaIndex < order.orderPizzas.length - 1) {
      setCurrentPizzaIndex(currentPizzaIndex + 1);
    } else {
      setCurrentPizzaIndex(0);
    }
  };

  const countTimeForPizza = (pizza: PizzaRecipe | undefined) => {
    return Math.round(
      minimumPizzaTime * pizzaStagesTimeCoeffs.Dough +
      (minimumPizzaTime * pizzaStagesTimeCoeffs.Topping) * (pizza?.toppings.length ?? 0) +
      minimumPizzaTime * pizzaStagesTimeCoeffs.Baking +
      minimumPizzaTime * pizzaStagesTimeCoeffs.Packaging);
  };

  const estimatedTime = () => {
    let time = 0;
    order.orderPizzas.forEach((orderPizza) => {
      if (countTimeForPizza(menu.find(recipe => recipe.id === orderPizza.recipeId)) > time) {
        time = countTimeForPizza(menu.find(recipe => recipe.id === orderPizza.recipeId));
      }
    });
    return time;
  };

  useEffect(() => {
    setCooksOnThisOrder(Object.values(cooks).filter(cook => cook.orderId === order.id));
  }, [cooks, order.id]);

  const updateCountedTime = useCallback(() => {
    const isOrderCompleted = () => {
      return order.orderPizzas.every(pizza => pizza.completedAt !== null);
    };

    let elapsedTime = Date.now() - new Date(order.createdAt).getTime();

    if (isOrderCompleted()) {
      let endTime = 0;
      order.orderPizzas.forEach((orderPizza) => {
        if (new Date(orderPizza.completedAt ?? 0).getTime() > endTime) {
          endTime = new Date(orderPizza.completedAt ?? 0).getTime();
        }
      });
      elapsedTime = endTime - new Date(order.createdAt).getTime();
    }

    setCountedTime(Math.floor(elapsedTime / 1000));
  }, [order.createdAt, order.orderPizzas]);

  useEffect(() => {
    updateCountedTime();
    const interval = setInterval(() => {
      updateCountedTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [updateCountedTime]);

  return (
    <div className={style.root} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h1>Order #{order.id}</h1>
        <div className={style.text}>
          <p><strong>Dinner name: </strong>{order.diner.name}</p>
          <p><strong>Cooking duration: </strong>{countedTime}s</p>
          <p><strong>Estimated cooking duration: </strong>{estimatedTime()}s</p>
        </div>
        <div className={style.order}>
          <p className={style['order-items']}>Order items</p>
          <OrderItem
            pizza={menu.find(recipe => recipe.id === order.orderPizzas[currentPizzaIndex]?.recipeId)}
            pizzaId={currentPizzaIndex + 1}
            pizzaCount={order.orderPizzas.length}
            cookName={
              cooksOnThisOrder.find(
                cook => cook.orderPizzaId === order.orderPizzas[currentPizzaIndex]?.id
              )?.name ?? null
            }
            stage={order.orderPizzas[currentPizzaIndex]?.currentStage ?? 'None'}
            minimumPizzaTime={minimumPizzaTime}
            pizzaStagesTimeCoeffs={pizzaStagesTimeCoeffs}
            onLeftClick={onLeftClick}
            onRightClick={onRightClick}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
