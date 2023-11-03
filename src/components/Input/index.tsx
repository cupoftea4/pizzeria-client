import style from './style.module.css';

type OwnProps = {
  value: React.MutableRefObject<number | undefined>
  className?: string
};

const Input = ({ value, className }: OwnProps) => {
  return (
    <input
      className={`${style.root} ${className}`}
      value={value.current}
      onChange={(e) => { value.current = +e.target.value; }}
      type='number'
    />
  );
};

export default Input;
