import { useEffect, useState } from 'react';
import style from './style.module.css';
import PizzaItem from '@/components/PizzaItem';
import Button from '@/components/Button';
import type { Pizza } from '@/services/types';

const PizzaModal = () => {
  const [pizzaArray, setPizzaArray] = useState<Pizza[]>([]);

  useEffect(() => {
    try {
      fetch('http://localhost:8080/config/menu')
        .then((response) => response.json())
        .then((pizzaArray) => setPizzaArray(pizzaArray as Pizza[]));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={style.root}>
      <div className={style.modal}>
        <div className={style.content}>
          <div className={style.header}>
            <h1>Pizza menu</h1>
          </div>
          <div className={style.list}>
            {pizzaArray.map((item: Pizza) => (
              <PizzaItem key={item.id} pizza={item} />
            ))}
          </div>
          <div className={style.bottom}>
            <Button text="Accept" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaModal;
