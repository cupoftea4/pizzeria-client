import { useState } from 'react';
import style from './style.module.css';
import UpArrow from '@/icons/UpArrowIcon';
import DownArrow from '@/icons/DownArrowIcon';

type OwnProps<T extends number | string> = {
  options: T[]
  selectedOptionState: [T, (selectedOption: T) => void]
};

const Select = <T extends number | string,>({ options, selectedOptionState }: OwnProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = selectedOptionState;

  const handleOptionClick = (option: T) => {
    setSelectedOption(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={style['custom-select-container']}>
      <div className={style['custom-select-header']} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || 'Select an option'}
        {isOpen ? <UpArrow /> : <DownArrow />}
      </div>
      {isOpen && (
        <div className={style['custom-select-options']}>
          {options.map((option, index) => (
            <div key={index} className={style['custom-select-option']} onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
