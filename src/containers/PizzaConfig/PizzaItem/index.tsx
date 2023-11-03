import style from './style.module.css';
import ArrowIcon from '@/icons/ArrowIcon';
import CheckIcon from '@/icons/CheckIcon';
import type { Pizza } from '@/services/types';
import { useState } from 'react';

type OwnProps = {
  pizza: Pizza
  time?: number
  addPizzaToSelected: (pizza: Pizza) => void
  removePizzaFromSelected: (pizza: Pizza) => void
};

const PizzaItem = (props: OwnProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    if (isSelected) {
      props.removePizzaFromSelected(props.pizza);
    } else {
      props.addPizzaToSelected(props.pizza);
    }
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={style.root}>
      <img src={props.pizza.url} alt={props.pizza.name} onClick={handleClick} />
      {isSelected
        ? (
          <div className={style.overlay} onClick={handleClick}>
            <CheckIcon className={style['check-icon']} />
          </div>
          )
        : null
      }
      <div className={style.bottom}>
        <p className={style.text}>{props.pizza.name}</p>
        <div className={style['hover-overlay']} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
          <ArrowIcon className={style['arrow-icon']} />
          {isHovered
            ? (
              <div className={style.tooltip}>
                <p>Preparation time: {props.time ?? 'n/a'}</p>
              </div>
              )
            : null
          }
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;
