import { useEffect, useState } from 'react';
import style from './style.module.css';
import PizzaItem from '@/containers/PizzaConfig/PizzaItem';
import PrimaryButton from '@/components/PrimaryButton';
import type { Pizza } from '@/services/types';

const callback = () => {
  console.log('You clicked me!');
};

const PizzaModal = () => {
  const [pizzaArray, setPizzaArray] = useState<Pizza[]>([]);
  const [selectedPizza, setSelectedPizza] = useState<Pizza[] | null>(null);

  function addPizzaToSelected(pizza: Pizza) {
    setSelectedPizza(selectedPizza ? [...selectedPizza, pizza] : [pizza]);
  }

  function removePizzaFromSelected(pizza: Pizza) {
    setSelectedPizza(selectedPizza?.filter((item) => item.id !== pizza.id) ?? null);
  }

  const getMenu = async () => {
    try {
      const response = await fetch('http://localhost:8080/config/menu');
      const pizzaArray = await response.json();
      setPizzaArray(pizzaArray as Pizza[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMenu();
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
                removePizzaFromSelected={removePizzaFromSelected} />
            ))}
        </div>
        <div className={style.bottom}>
          <PrimaryButton onClick={callback}>
            Accept
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default PizzaModal;
