import style from './style.module.css';
import ArrowIcon from '@/icons/ArrowIcon';
import CheckIcon from '@/icons/CheckIcon';
import type { Pizza } from '@/types/config';
import { useState } from 'react';

type OwnProps = {
  pizza: Pizza
  time?: number
  isSelected: boolean
  handleClick: (pizza: Pizza) => void
  addPizzaToSelected: (pizza: Pizza) => void
  removePizzaFromSelected: (pizza: Pizza) => void
};

const PizzaItem = (props: OwnProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={style.root}>
      <div className={style['top-overlay']}>
        <img src={props.pizza.url} alt={props.pizza.name} onClick={() => props.handleClick(props.pizza)} />
        {props.isSelected
          ? (
            <div className={style.overlay} onClick={() => props.handleClick(props.pizza)}>
              <CheckIcon className={style['check-icon']} />
            </div>
            )
          : null
        }
      </div>
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
