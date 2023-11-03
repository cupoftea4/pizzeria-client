type OwnProps = {
  className?: string
};

const ArrowIcon = (props: OwnProps) => {
  return (
    <svg
      width="11"
      height="18"
      viewBox="0 0 11 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        // eslint-disable-next-line max-len
        d="M9.94294 8.05722C10.4636 8.57788 10.4636 9.42215 9.94294 9.94282L2.40041 17.4854C1.87977 18.006 1.03556 18.006 0.514849 17.4854C-0.0058447 16.9646 -0.0058447 16.1204 0.514849 15.5996L7.11454 9.00002L0.514849 2.40035C-0.0058447 1.87966 -0.0058447 1.03543 0.514849 0.514737C1.03556 -0.00597012 1.87977 -0.00597012 2.40041 0.514737L9.94294 8.05722Z"
        fill="#9E9E8B"
      />
    </svg>
  );
};

export default ArrowIcon;
