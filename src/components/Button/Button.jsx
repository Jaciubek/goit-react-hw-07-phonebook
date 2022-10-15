import styles from './Button.module.css';

const Button = ({ type,title, onClick }) => {
  const { button } = styles;

  return (
    <button className={button} onClick={onClick} type={type}>
      {title}
    </button>
  );
};

export default Button