import PrimaryButton from '@/components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import EndingItem from '../EndingModalItem';
import type { Order, PizzaRecipe } from '@/types/types';
import { useState } from 'react';
import style from './style.module.css';

type OwnProps = {
  orders: Order[]
  menu: PizzaRecipe[]
  minimumPizzaTime: number
};

const EndingModal = ({ orders, menu }: OwnProps) => {
  const [currentPizzaIndex, setCurrentPizzaIndex] = useState<number>(0);
  const navigate = useNavigate();

  // const pizzaStagesTimeCoeffs = {
  //   Dough: 0.3,
  //   Topping: 0.2,
  //   Baking: 0.4,
  //   Packaging: 0.1
  // };

  const onRestartClick = () => {
    navigate('/');
  };

  const onLeftClick = () => {
    if (currentPizzaIndex > 0) {
      setCurrentPizzaIndex(currentPizzaIndex - 1);
    } else {
      setCurrentPizzaIndex(menu.length - 1);
    }
  };

  const onRightClick = () => {
    if (currentPizzaIndex < menu.length - 1) {
      setCurrentPizzaIndex(currentPizzaIndex + 1);
    } else {
      setCurrentPizzaIndex(0);
    }
  };

  const completedOrders = orders.filter(order => order.orderPizzas.every(orderPizza => orderPizza.completedAt));

  // const countTimeForPizza = (pizza: PizzaRecipe | undefined) => {
  //   return Math.round(
  //     minimumPizzaTime * pizzaStagesTimeCoeffs.Dough +
  //     (minimumPizzaTime * pizzaStagesTimeCoeffs.Topping) * (pizza?.toppings.length ?? 0) +
  //     minimumPizzaTime * pizzaStagesTimeCoeffs.Baking +
  //     minimumPizzaTime * pizzaStagesTimeCoeffs.Packaging);
  // };

  const pizzaCookingTimes = orders.flatMap(order =>
    order.orderPizzas
      .filter(pizza => pizza.completedAt)
      .map(pizza => {
        const start = new Date(order.createdAt).getTime();
        const end = new Date(pizza.completedAt!).getTime();
        return (end - start) / (1000); // Convert milliseconds to seconds
      })
  );

  const totalPizzaCookingTime = pizzaCookingTimes.reduce((acc, time) => acc + time, 0);
  const averagePizzaCookingTime = pizzaCookingTimes.length > 0 ? totalPizzaCookingTime / pizzaCookingTimes.length : 0;

  // const expectedPizzaCookingTimes = menu.map(pizza => countTimeForPizza(pizza));
  // const totalExpectedPizzaCookingTime = expectedPizzaCookingTimes.reduce((acc, time) => acc + time, 0);
  // const averageExpectedPizzaCookingTime =
  //   expectedPizzaCookingTimes.length > 0 ? totalExpectedPizzaCookingTime / expectedPizzaCookingTimes.length : 0;

  const countCookedPizzas = (orders: Order[], pizzaId: number): number => {
    return orders.reduce((count, order) => {
      // Count only the pizzas that match the specified pizzaId and have been completed (cooked)
      const cookedPizzaCountInOrder = order.orderPizzas.filter(pizza =>
        pizza.recipeId === pizzaId && pizza.completedAt !== null
      ).length;
      return count + cookedPizzaCountInOrder;
    }, 0);
  };

  return (
    <div className={style.root}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h1>Simulation ended</h1>
        <div className={style.text}>
          <p><strong>Completed orders: </strong>{completedOrders.length}</p>
          <p><strong>Not completed orders: </strong>{orders.length - completedOrders.length}</p>
          <p><strong>Average cooking time: </strong>{averagePizzaCookingTime.toFixed(0)}</p>
          {/* <p><strong>Average expected cooking time: </strong>{averageExpectedPizzaCookingTime.toFixed(0)}</p> */}
        </div>
        <div className={style.order}>
          <p className={style['order-items']}></p>
          <EndingItem
            pizza={menu[currentPizzaIndex]}
            pizzaId={currentPizzaIndex + 1}
            totalPizzaCount={menu.length}
            totalCookedTimes={countCookedPizzas(orders, menu[currentPizzaIndex]?.id ?? 0)}
            onLeftClick={onLeftClick}
            onRightClick={onRightClick}
          />
        </div>
        <div className={style.bottom}>
          <PrimaryButton onClick={onRestartClick}>Restart</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default EndingModal;
