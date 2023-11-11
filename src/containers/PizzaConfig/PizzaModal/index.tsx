import { useEffect, useState } from 'react';
import style from './style.module.css';
import PizzaItem from '@/containers/PizzaConfig/PizzaItem';
import PrimaryButton from '@/components/PrimaryButton';
import type { Pizza } from '@/types/config';

type OwnProps = {
  selectedPizza: Pizza[] | null
  addPizzaToSelected: (pizza: Pizza) => void
  removePizzaFromSelected: (pizza: Pizza) => void
  onClose: () => void
};

const PizzaModal = (props: OwnProps) => {
  const [pizzaArray, setPizzaArray] = useState<Pizza[]>([]);

  const handleClick = (pizza: Pizza) => {
    if (props.selectedPizza?.some(p => p.id === pizza.id)) {
      props.removePizzaFromSelected(pizza);
    } else {
      props.addPizzaToSelected(pizza);
    }
  };

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
                handleClick={handleClick}
                isSelected={props.selectedPizza?.some(pizza => pizza.id === item.id) ?? false}
                addPizzaToSelected={props.addPizzaToSelected}
                removePizzaFromSelected={props.removePizzaFromSelected} />
            ))}
        </div>
        <div className={style.bottom}>
          <PrimaryButton onClick={props.onClose}>
            Accept
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default PizzaModal;
