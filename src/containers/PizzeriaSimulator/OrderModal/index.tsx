import { useEffect, useState } from 'react';
import style from './style.module.css';
import OrderItem from '@/containers/PizzeriaSimulator/OrderItem';
import type { Pizza, Simulation } from '@/types/types';

type OwnProps = {
  orderId: number
};

const OrderModal = ({ orderId }: OwnProps) => {
  const [pizzaArray, setPizzaArray] = useState<Pizza[]>([]);
  const [simulationState, setSimulationState] = useState<Simulation>();
  const [orderedPizza, setOrderedPizza] = useState<Pizza[]>();

  const onLeftClick = () => {
    console.log('left');
  };

  const onRightClick = () => {
    console.log('right');
  };

  useEffect(() => {
    fetch('http://localhost:8080/kitchenState')
      .then(response => response.json())
      .then(data => setSimulationState(data as Simulation));

    fetch('http://localhost:8080/config/menu')
      .then(response => response.json())
      .then(data => setPizzaArray(data as Pizza[]));
  });

  useEffect(() => {

  }, [simulationState]);

  return (
    <div className={style.root}>
      <div className={style.modal}>
        <h1>Order #</h1>
        <div>
          <p>Dinner name:</p>
          <p>Cooking duration:</p>
        </div>
        <p>Order items</p>
        <OrderItem/>
        <button type='button' onClick={onLeftClick}>Left</button>
        <button type='button' onClick={onRightClick}>Right</button>
      </div>
    </div>
  );
};

export default OrderModal;
