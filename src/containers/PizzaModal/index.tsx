import { useEffect, useState } from 'react';
import style from './style.module.css';
import PizzaItem from '@/components/PizzaItem';
import Button from '@/components/Button';
import type { Pizza } from '@/services/types';

function callback () {
  console.log('You clicked me!');
}

const PizzaModal = () => {
  const [pizzaArray, setPizzaArray] = useState<Pizza[]>([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza[] | null>(null);

  function addPizzaToSelected (pizza: Pizza) {
    setSelectedPizza(selectedPizza ? [...selectedPizza, pizza] : [pizza]);
  }

  function removePizzaFromSelected (pizza: Pizza) {
    setSelectedPizza(selectedPizza?.filter((item) => item.id !== pizza.id) ?? null);
  }

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
        <div className={style.header}>
          <h1>Pizza menu</h1>
        </div>
        <div className={style.list}>
          {pizzaArray
            .sort((p1, p2) => p1.name.length - p2.name.length)
            .map((item: Pizza) => (
              <PizzaItem
              key={item.id}
              pizza={item}
              addPizzaToSelected={addPizzaToSelected}
              removePizzaFromSelected={removePizzaFromSelected}/>
            ))}
        </div>
        <div className={style.bottom}>
          <Button text="Accept" callback={callback} />
        </div>
      </div>
  </div>
  );
};

export default PizzaModal;
