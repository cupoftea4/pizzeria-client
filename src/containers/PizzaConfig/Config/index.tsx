import PrimaryButton from '@/components/PrimaryButton';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import Input from '@/components/Input';
import type { ConfigData, CooksMode } from '@/types/config';
import CooksModeChoice from '../CooksModeChoice';
import Select from '@/components/Select';
import PizzaMenuIcon from '@/icons/PizzaMenuIcon';
import RightArrowIcon from '@/icons/RightArrowIcon';

const Config = () => {
  const [cashRegistersNumber, setCashRegistersNumber] = useState<number>(0);
  const [dinersArrivalNumber, setDinersArrivalNumber] = useState<number>(0);
  const [minTimeCreatingPizza, setMinTimeCreatingPizza] = useState<number>(0);
  const [cooksMode, setCooksMode] = useState<CooksMode>('none');

  const getConfig = async () => {
    const res = await fetch('http://localhost:8080/config');
    const resJson = await res.json() as ConfigData;
    setCashRegistersNumber(resJson.cashRegisterQuantity);
  };

  useEffect(() => {
    getConfig();
  }, []);

  return (
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
          <Select options={['Low', 'Medium', 'High']} onSelect={function (option: string | number): void {
            console.log(option);
          } }/>
          <label className={style.label}>
            The number of diners per arrival
          </label>
          <Input
            value={dinersArrivalNumber}
            setValue={setDinersArrivalNumber}
          />
          <label className={style.label}>Choose cooking strategy</label>
          <div></div>
          <CooksModeChoice cooksMode={cooksMode} onCooksModeChange={setCooksMode}/>
          <div></div>
          <label className={style.label}>Choose pizza recipes</label>
          <button className={style['pizza-menu-button']}>
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
          <PrimaryButton>
            Start
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Config;
