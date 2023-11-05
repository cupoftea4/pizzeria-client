import type { CooksMode } from '@/types/config';
import style from './style.module.css';
import Input from '@/components/Input';
import { useRef } from 'react';

type OwnProps = {
  cooksMode: CooksMode
  onCooksModeChange: (cooksMode: CooksMode) => void
};

const CooksModeChoice = ({ cooksMode, onCooksModeChange }: OwnProps) => {
  const cooksNumber = useRef<number>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCooksModeChange(event.target.value as CooksMode);
  };

  return (
    <div className={style.root}>
      <label className={style.label}>
        <input
          className={style['radioButton-input']}
          type="radio"
          value="specialized"
          checked={cooksMode === 'specialized'}
          onChange={handleChange}
        />
        <span className={style['radioButton-custom']}></span>
        The cooks are specialized
      </label>
      {cooksMode === 'specialized' &&
          <div className={style['specialized-cooks-grid']}>
            <div className={style['specialized-cooks-grid-cell']}>
              <label>
                In topping
              </label>
              <Input value={cooksNumber} />
            </div>
            <div className={style['specialized-cooks-grid-cell']}>
              <label>
                In dough
              </label>
              <Input value={cooksNumber} />
            </div>
            <div className={style['specialized-cooks-grid-cell']}>
              <label>
                In backing
              </label>
              <Input value={cooksNumber} />
            </div>
            <div className={style['specialized-cooks-grid-cell']}>
              <label>
                In packaging
              </label>
              <Input value={cooksNumber} />
            </div>
          </div>
        }
      <label className={style.label}>
        <input
          className={style['radioButton-input']}
          type="radio"
          value="universal"
          checked={cooksMode === 'universal'}
          onChange={handleChange}
        />
        <span className={style['radioButton-custom']}></span>
        The cooks are universal
      </label>
      {cooksMode === 'universal' &&
          <div className={style['universal-cooks-label']}>
            <label>
              Number of cooks
            </label>
            <Input value={cooksNumber} />
          </div>
        }
    </div>
  );
};

export default CooksModeChoice;
