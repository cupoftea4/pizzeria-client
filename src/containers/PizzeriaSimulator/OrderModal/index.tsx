import { useEffect, useState } from 'react';
import style from './style.module.css';
import OrderItem from '@/containers/PizzeriaSimulator/OrderItem';
import type { Cook, CookingStage, Order, PizzaRecipe } from '@/types/types';

type OwnProps = {
  cooks: Record<number, Cook>
  order: Order
  minimumPizzaTime: number
  pizzaStagesTimeCoeffs?: Record<CookingStage, number>
  menu: PizzaRecipe[]
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
    Packaging: 0.1,
    Completed: 0
  },
  menu,
  onClose
}: OwnProps) => {
  const [currentPizzaIndex, setCurrentPizzaIndex] = useState(0);
  const [cooksOnThisOrder, setCooksOnThisOrder] = useState<Cook[]>([]);
  const [countedTime, setCountedTime] = useState(0);

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

  useEffect(() => {
    setCooksOnThisOrder(Object.values(cooks).filter(cook => cook.orderId === order.id));
  }, [cooks, order.id]);

  useEffect(() => {
    setCurrentPizzaIndex(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - new Date(order.createdAt).getTime();
      setCountedTime(Math.floor(elapsedTime / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [order.createdAt]);

  return (
    <div className={style.root} onClick={onClose}>
      <div className={style.modal}>
        <h1>Order #{order.id}</h1>
        <div className={style.text}>
          <p><strong>Dinner name: </strong>{order.diner.name}</p>
          <p><strong>Cooking duration: </strong>{countedTime}s</p>
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
