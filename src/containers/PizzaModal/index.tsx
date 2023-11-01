import { useEffect, useState } from 'react';
import style from './style.module.css';
import Arrow from '@/icons/ArrowIcon';

type Pizza = {
  id: number
  name: string
  url: string
  time: number
  toppings: string[]
};

function PizzaItem (pizza: Pizza) {
  return (<div className={style.item}>
            <img src={pizza.url} alt={pizza.name} />
            <p> {pizza.name} </p>
            <Arrow />
          </div>);
}

const PizzaModal = () => {
  const [data, setData] = useState<Pizza[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/config/menu')
      .then((response) => response.json())
      .then((data) => setData(data as Pizza[]));
  }, []);

  return (
    <div className={style.root}>
      <div className={style.modal}>
        <div className={style.content}>
          <div className={style.header}>
            <h1>Pizza menu</h1>
          </div>
          <div className={style.list}>
            {data.map((item: Pizza) => (
              <PizzaItem key={item.id} url={item.url} name={item.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaModal;
