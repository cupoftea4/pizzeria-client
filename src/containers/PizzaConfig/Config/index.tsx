import PrimaryButton from '@/components/PrimaryButton';
import style from './style.module.css';
import { useCallback, useEffect, useState } from 'react';
import Input from '@/components/Input';
import CooksModeChoice from '../CooksModeChoice';
import Select from '@/components/Select';
import PizzaMenuIcon from '@/icons/PizzaMenuIcon';
import RightArrowIcon from '@/icons/RightArrowIcon';
import type { ConfigData, CookingStage, CooksMode, PizzaRecipe } from '@/types/types';
import PizzaModal from '../PizzaModal';

const Config = () => {
  const [cashRegistersNumber, setCashRegistersNumber] = useState<number>(0);
  const [dinersArrivalNumber, setDinersArrivalNumber] = useState<number>(0);
  const [dinersArrivalFrequency, setDinersArrivalFrequency] = useState<string>('Low');
  const [minTimeCreatingPizza, setMinTimeCreatingPizza] = useState<number>(0);
  const [cooksMode, setCooksMode] = useState<CooksMode>('none');
  const [cooksNumber, setCooksNumber] = useState(0);
  const [pizzaModal, setPizzaModal] = useState<boolean>(false);
  const [selectedPizzaIds, setSelectedPizzaIds] = useState<number[]>([]);
  const [selectedPizza, setSelectedPizza] = useState<PizzaRecipe[] | null>(null);
  const [cooksNumberPerStage, setCooksNumberPerStage] = useState<Record<CookingStage, number>>({
    Topping: 0,
    Dough: 0,
    Baking: 0,
    Packaging: 0,
    Completed: 0
  });

  const handlePizzaModal = () => {
    setPizzaModal(!pizzaModal);
  };

  useEffect(() => {
    setSelectedPizzaIds(selectedPizza?.map((item) => item.id) ?? []);
  }, [selectedPizza]);

  function addPizzaToSelected(pizza: PizzaRecipe) {
    setSelectedPizza(selectedPizza ? [...selectedPizza, pizza] : [pizza]);
  }

  function removePizzaFromSelected(pizza: PizzaRecipe) {
    setSelectedPizza(selectedPizza?.filter((item) => item.id !== pizza.id) ?? null);
  }

  const getConfig = useCallback(async () => {
    const res = await fetch('http://localhost:8080/config');
    const resJson = await res.json() as ConfigData;
    setCashRegistersNumber(resJson.cashRegisterQuantity);
    setCooksNumber(resJson.cooksNumber);
    setCooksNumberPerStage({
      Topping: resJson.cooksPerStage.Topping,
      Dough: resJson.cooksPerStage.Dough,
      Baking: resJson.cooksPerStage.Baking,
      Packaging: resJson.cooksPerStage.Packaging,
      Completed: resJson.cooksPerStage.Completed
    });
    setDinersArrivalNumber(resJson.dinerArrivalConfig.quantity);
    setDinersArrivalFrequency(resJson.dinerArrivalConfig.frequency);
    setMinTimeCreatingPizza(resJson.minimumPizzaTime);
    setCooksMode((resJson.specializedCooksMode) ? 'specialized' : 'universal');
  }, []);

  useEffect(() => {
    getConfig();
  }, [getConfig]);

  const updateData = async () => {
    const data = {
      specializedCooksMode: (cooksMode === ('specialized' as CooksMode)),
      minimumPizzaTime: minTimeCreatingPizza,
      dinerArrivalConfig: {
        frequency: dinersArrivalFrequency,
        quantity: dinersArrivalNumber
      },
      cashRegisterQuantity: cashRegistersNumber,
      menu: selectedPizzaIds,
      cooksPerStage: {
        Packaging: cooksNumberPerStage.Packaging,
        Dough: cooksNumberPerStage.Dough,
        Baking: cooksNumberPerStage.Baking,
        Topping: cooksNumberPerStage.Topping
      },
      cooksNumber: cooksMode === ('specialized' as CooksMode)
        ? (
            cooksNumberPerStage.Packaging +
            cooksNumberPerStage.Dough +
            cooksNumberPerStage.Baking +
            cooksNumberPerStage.Topping
          )
        : cooksNumber
    };

    try {
      const response = await fetch('http://localhost:8080/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Config data updated successfully');
      } else {
        console.error('Error updating config data');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return pizzaModal
    ? <PizzaModal
      selectedPizza={selectedPizza}
      addPizzaToSelected={addPizzaToSelected}
      removePizzaFromSelected={removePizzaFromSelected}
      minTimeCreatingPizza={minTimeCreatingPizza}
      onClose={handlePizzaModal}/>
    : (
        <div className={style.root}>
      <div className={style.modal}>
        <div className={style.header}>
          <h1>Simulation Settings</h1>
        </div>

        <form className={style.form}>
          <label className={style.label}>
            The number of cash registers
          </label>
          <Input
            value={cashRegistersNumber}
            setValue={setCashRegistersNumber}
          />
          <label className={style.label}>
            Frequency of diner arrival
          </label>
          <Select
            options={['Low', 'Medium', 'High']}
            selectedOptionState={[dinersArrivalFrequency, setDinersArrivalFrequency]}
          />
          <label className={style.label}>
            The number of diners per arrival
          </label>
          <Input
            value={dinersArrivalNumber}
            setValue={setDinersArrivalNumber}
          />
          <label className={style.label}>Choose cooking strategy</label>
          <div></div>
          <CooksModeChoice
            cooksModeState={[cooksMode, setCooksMode]}
            cooksNumberState={[cooksNumber, setCooksNumber]}
            cooksNumberPerStageState={[cooksNumberPerStage, setCooksNumberPerStage]}
          />
          <div></div>
          <label className={style.label}>Choose pizza recipes</label>
          <button type='button' className={style['pizza-menu-button']} onClick={handlePizzaModal}>
            <PizzaMenuIcon/>
            <RightArrowIcon/>
          </button>

          <label className={style.label}>
            Minimum time of creating pizza
          </label>
          <Input
            value={minTimeCreatingPizza}
            setValue={setMinTimeCreatingPizza}
          />
        </form>
        <div className={style.bottom}>
          <PrimaryButton onClick={() => { updateData(); }}>
            Start
          </PrimaryButton>
        </div>
      </div>
    </div>);
};

export default Config;
