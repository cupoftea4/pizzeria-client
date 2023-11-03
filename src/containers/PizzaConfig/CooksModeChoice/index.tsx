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
    <div>
      <label className={style.label}>
        <input
          type="radio"
          value="specialized"
          checked={cooksMode === 'specialized'}
          onChange={handleChange}
        />
        The cooks are specialized
      </label>
      <label className={style.label}>
        <input
          type="radio"
          value="universal"
          checked={cooksMode === 'universal'}
          onChange={handleChange}
        />
        The cooks are universal
        {cooksMode === 'universal' &&
          <div>
            <label>
              The number of cooks
            </label>
            <Input value={cooksNumber} />
          </div>
        }
      </label>
    </div>
  );
};

export default CooksModeChoice;
