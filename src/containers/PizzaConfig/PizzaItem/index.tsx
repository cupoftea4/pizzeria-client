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
};

const PizzaItem = ({ pizza, time, isSelected, handleClick }: OwnProps) => {
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
        <img src={pizza.url} alt={pizza.name} onClick={() => handleClick(pizza)} />
        {isSelected
          ? (
            <div className={style.overlay} onClick={() => handleClick(pizza)}>
              <CheckIcon className={style['check-icon']} />
            </div>
            )
          : null
        }
      </div>
      <div className={style.bottom}>
        <p className={style.text}>{pizza.name}</p>
        <div className={style['hover-overlay']} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
          <ArrowIcon className={style['arrow-icon']} />
          {isHovered
            ? (
              <div className={style.tooltip}>
                <p>Preparation time: {time ?? 'n/a'}</p>
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
