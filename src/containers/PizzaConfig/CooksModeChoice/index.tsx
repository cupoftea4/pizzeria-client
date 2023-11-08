/* eslint-disable max-len */
import type { CookingStage, CooksMode } from '@/types/config';
import style from './style.module.css';
import Input from '@/components/Input';

type OwnProps = {
  cooksModeState: [CooksMode, (cooksMode: CooksMode) => void]
  cooksNumberState: [number, (cooksNumber: number) => void]
  cooksNumberPerStageState: [Record<CookingStage, number>, (cooksNumberPerStage: Record<CookingStage, number>) => void]
};

const CooksModeChoice = ({ cooksModeState, cooksNumberState, cooksNumberPerStageState }: OwnProps) => {
  const [cooksMode, setCooksMode] = cooksModeState;
  const [cooksNumber, setCooksNumber] = cooksNumberState;
  const [cooksNumberPerStage, setCooksNumberPerStage] = cooksNumberPerStageState;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCooksMode(event.target.value as CooksMode);
  };

  return (
    <div className={style.root}>
      <div>
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
              <Input
                value={cooksNumberPerStage.Topping}
                setValue={val => { setCooksNumberPerStage({ ...cooksNumberPerStage, Topping: val }); } }
              />
            </div>
            <div className={style['specialized-cooks-grid-cell']}>
              <label>
                In dough
              </label>
              <Input
                value={cooksNumberPerStage.Dough}
                setValue={val => { setCooksNumberPerStage({ ...cooksNumberPerStage, Dough: val }); } }
              />
            </div>
            <div className={style['specialized-cooks-grid-cell']}>
              <label>
                In baking
              </label>
              <Input
                value={cooksNumberPerStage.Baking}
                setValue={val => { setCooksNumberPerStage({ ...cooksNumberPerStage, Baking: val }); } }
              />
            </div>
            <div className={style['specialized-cooks-grid-cell']}>
              <label>
                In packaging
              </label>
              <Input
                value={cooksNumberPerStage.Packaging}
                setValue={val => { setCooksNumberPerStage({ ...cooksNumberPerStage, Packaging: val }); } }
              />
            </div>
          </div>
        }
      </div>
      <div>
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
              <Input value={cooksNumber} setValue={setCooksNumber} />
            </div>
          }
      </div>
    </div>
  );
};

export default CooksModeChoice;
