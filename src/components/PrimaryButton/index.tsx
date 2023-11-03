import style from './style.module.css';

type OwnProps = {
  children: string
};

const PrimaryButton = ({ children, ...buttonProps }: OwnProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={style.button} {...buttonProps}>
      <p className={style['button-text']}>
        {children}
      </p>
    </button>
  );
};

export default PrimaryButton;
