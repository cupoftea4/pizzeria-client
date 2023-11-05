import style from './style.module.css';

type OwnProps = {
  value: number
  setValue: (val: number) => void
  className?: string
};

const Input = ({ value, setValue, className }: OwnProps) => {
  return (
    <input
      className={`${style.root} ${className}`}
      value={value}
      onChange={(e) => { setValue(+e.target.value); }}
      type='number'
    />
  );
};

export default Input;
