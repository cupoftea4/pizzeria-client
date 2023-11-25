import { useEffect, useState } from 'react';
import style from './style.module.css';
import PizzaItem from '@/containers/PizzaConfig/PizzaItem';
import PrimaryButton from '@/components/PrimaryButton';
import type { CookingStage, PizzaRecipe } from '@/types/types';

type OwnProps = {
  selectedPizza: PizzaRecipe[] | null
  addPizzaToSelected: (pizza: PizzaRecipe) => void
  removePizzaFromSelected: (pizza: PizzaRecipe) => void
  pizzaStagesTimeCoeffs?: Record<CookingStage, number>
  minTimeCreatingPizza: number
  onClose: () => void
};

const PizzaModal = ({
  selectedPizza,
  addPizzaToSelected,
  removePizzaFromSelected,
  pizzaStagesTimeCoeffs = {
    Dough: 0.3,
    Topping: 0.2,
    Baking: 0.4,
    Packaging: 0.1,
    Completed: 0
  },
  minTimeCreatingPizza,
  onClose
}: OwnProps) => {
  const [pizzaArray, setPizzaArray] = useState<PizzaRecipe[]>([]);

  const handleClick = (pizza: PizzaRecipe) => {
    if (selectedPizza?.some(p => p.id === pizza.id)) {
      removePizzaFromSelected(pizza);
    } else {
      addPizzaToSelected(pizza);
    }
  };

  const getMenu = async () => {
    try {
      const response = await fetch('http://localhost:8080/config/menu');
      const pizzaArray = await response.json();
      setPizzaArray(pizzaArray as PizzaRecipe[]);
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
            .map((item: PizzaRecipe) => (
              <PizzaItem
                key={item.id}
                pizza={item}
                handleClick={handleClick}
                pizzaStagesTimeCoeffs={pizzaStagesTimeCoeffs}
                minTimeCreatingPizza={minTimeCreatingPizza}
                isSelected={selectedPizza?.some(pizza => pizza.id === item.id) ?? false}
              />
            ))}
        </div>
        <div className={style.bottom}>
          <PrimaryButton onClick={onClose}>
            Accept
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default PizzaModal;
