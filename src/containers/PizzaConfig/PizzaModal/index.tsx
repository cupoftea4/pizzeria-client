import { useEffect, useState } from 'react';
import style from './style.module.css';
import PizzaItem from '@/containers/PizzaConfig/PizzaItem';
import PrimaryButton from '@/components/PrimaryButton';
import type { PizzaRecipe, TimedCookingStageToValue } from '@/types/types';

type OwnProps = {
  selectedPizzaIds: number[] | null
  addPizzaToSelected: (...ids: number[]) => void
  removePizzaFromSelected: (ids: number) => void
  pizzaStagesTimeCoeffs?: TimedCookingStageToValue
  minTimeCreatingPizza: number
  selectAll: (ids: number[]) => void
  onClose: () => void
};

const PizzaModal = ({
  selectedPizzaIds,
  addPizzaToSelected,
  removePizzaFromSelected,
  pizzaStagesTimeCoeffs = {
    Dough: 0.3,
    Topping: 0.2,
    Baking: 0.4,
    Packaging: 0.1
  },
  selectAll,
  minTimeCreatingPizza,
  onClose
}: OwnProps) => {
  const [pizzaArray, setPizzaArray] = useState<PizzaRecipe[]>([]);

  const handleClick = (pizza: PizzaRecipe) => {
    if (selectedPizzaIds?.some(id => id === pizza.id)) {
      removePizzaFromSelected(pizza.id);
    } else {
      addPizzaToSelected(pizza.id);
    }
  };

  const getMenu = async () => { // TODO: refactor this into a hook
    try {
      const response = await fetch('http://localhost:8080/config/menu');
      const pizzaArray = await response.json() as PizzaRecipe[];
      setPizzaArray(pizzaArray);
    } catch (error) {
      console.error(error);
    }
  };

  const onSelectAll = () => {
    if (selectedPizzaIds?.length === pizzaArray.length) {
      selectAll([]);
    } else {
      selectAll(pizzaArray.map(pizza => pizza.id));
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
                isSelected={selectedPizzaIds?.some(id => id === item.id) ?? false}
              />
            ))}
        </div>
        <div className={style.bottom}>
          <PrimaryButton onClick={onClose}>
            Accept
          </PrimaryButton>
          <PrimaryButton onClick={onSelectAll}>
            {selectedPizzaIds?.length === pizzaArray.length ? 'Deselect all' : 'Select all'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default PizzaModal;
