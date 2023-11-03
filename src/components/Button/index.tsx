import style from './style.module.css';

type OwnProps = {
  text: string
  callback: () => void
};

const Button = (props: OwnProps) => {
  return (
    <button className={style.button} onClick={props.callback}>
      <p className={style['button-text']}>
        {props.text}
      </p>
    </button>
  );
};

export default Button;
