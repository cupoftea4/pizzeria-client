import style from './style.module.css';

type OwnProps = {
  text: string
};

const Button = (props: OwnProps) => {
  return (
    <button className={style.button}>
      <p className={style['button-text']}>
        {props.text}
      </p>
    </button>
  );
};

export default Button;
