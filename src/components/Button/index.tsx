import style from './style.module.css';

type OwnProps = {
  text: string
};

const Button = (props: OwnProps) => {
  return (
    <button className={style.button}>
      <span>
        {props.text}
      </span>
    </button>
  );
};

export default Button;
