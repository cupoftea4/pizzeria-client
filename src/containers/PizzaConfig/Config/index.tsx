import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '@/hooks/useConfig'; // Import the useConfig hook
import PrimaryButton from '@/components/PrimaryButton';
import Input from '@/components/Input';
import Select from '@/components/Select';
import CooksModeChoice from '../CooksModeChoice';
import PizzaModal from '../PizzaModal';
import PizzaMenuIcon from '@/icons/PizzaMenuIcon';
import RightArrowIcon from '@/icons/RightArrowIcon';
import style from './style.module.css';
import type { ConfigDataSaveDto } from '@/types/types';
import { useSimulation } from '@/hooks/useSimulation';

const Config = () => {
  const { config, updateConfig, error: configError } = useConfig();
  const { startSimulation, error: simulationError } = useSimulation();
  const [localConfig, setLocalConfig] = useState<ConfigDataSaveDto | null>(null);
  const [pizzaModal, setPizzaModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (config) {
      setLocalConfig({ ...config, menu: config.menu.map(pizza => pizza.id) });
      // BUTT PLUG: move this to the backend 🔽
      if (config.menu.length === 0) {
        updateLocalConfig('menu', [1, 2, 3]);
      }
    }
  }, [config]);

  const handlePizzaModal = () => setPizzaModal(!pizzaModal);

  const handleConfigUpdate = () => {
    if (localConfig) {
      updateConfig(localConfig).then(
        (updated) => updated && startSimulation().then((updated) => updated && navigate('/run'))
      );
    }
  };

  function updateLocalConfig<Key extends keyof ConfigDataSaveDto>(key: Key, value: ConfigDataSaveDto[Key]) {
    setLocalConfig((prevConfig) => {
      return {
        ...prevConfig!,
        [key]: value
      };
    });
  }

  if (!localConfig) return <div className={style.loading}>Loading...</div>;
  if (configError || simulationError) return <div>{configError ?? simulationError}</div>;
  return (
    <div className={style.root}>
      {pizzaModal
        ? (
          <PizzaModal
            selectedPizzaIds={localConfig.menu}
            addPizzaToSelected={(...ids) => updateLocalConfig('menu', [...(localConfig.menu), ...ids])}
            removePizzaFromSelected={(pizza) => updateLocalConfig(
              'menu',
              localConfig.menu.filter((id) => id !== pizza)
            )}
            onClose={handlePizzaModal}
            pizzaStagesTimeCoeffs={localConfig.pizzaStagesTimeCoeffs}
            selectAll={(ids: number[]) => updateLocalConfig('menu', ids)}
            minTimeCreatingPizza={localConfig.minimumPizzaTime}
          />)
        : (
          <div className={style['config-root']}>
            <div className={style.modal}>
              <div className={style.header}>
                <h1>Simulation Settings</h1>
              </div>

              <form className={style.form}>
                <label className={style.label}>The number of cash registers</label>
                <Input
                  value={localConfig.cashRegisterQuantity}
                  setValue={(value) => updateLocalConfig('cashRegisterQuantity', value)} />

                <label className={style.label}>
                  Frequency of diner arrival
                </label>
                <Select
                  options={['Low', 'Medium', 'High']}
                  selectedOptionState={[
                    localConfig.dinerArrivalConfig.frequency,
                    (value) => updateLocalConfig('dinerArrivalConfig',
                      { ...localConfig.dinerArrivalConfig, frequency: value })
                  ]}
                />

                <label className={style.label}>
                  The number of diners per arrival
                </label>
                <Input
                  value={localConfig.dinerArrivalConfig.quantity}
                  setValue={(value) => updateLocalConfig('dinerArrivalConfig',
                    { ...localConfig.dinerArrivalConfig, quantity: value }
                  )}
                />

                <label className={style.label}>Choose cooking strategy</label>
                <div></div>
                <CooksModeChoice
                  cooksModeState={[
                    localConfig.specializedCooksMode ? 'specialized' : 'universal',
                    (value) => updateLocalConfig('specializedCooksMode', value === 'specialized')
                  ]}
                  cooksNumberState={[
                    localConfig.cooksNumber,
                    (value) => updateLocalConfig('cooksNumber', value)
                  ]}
                  cooksNumberPerStageState={[
                    localConfig.cooksPerStage,
                    (value) => updateLocalConfig('cooksPerStage', value)
                  ]}
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
                  value={localConfig.minimumPizzaTime}
                  setValue={(value) => updateLocalConfig('minimumPizzaTime', value)}
                />
              </form>
              <div className={style.bottom}>
                <PrimaryButton onClick={() => { handleConfigUpdate(); }}>
                  Start
                </PrimaryButton>
              </div>
            </div>
          </div>
          )}
    </div>
  );
};

export default Config;
