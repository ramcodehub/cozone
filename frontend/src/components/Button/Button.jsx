import './Button.css';

const Button = ({
  variant = 'primary',
  children,
  className = '',
  onClick,
  type = 'button',
  icon,
  ariaLabel,
  ...rest
}) => {
  const btnClass = variant === 'secondary' ? 'secondaryBtn' : 'primaryBtn';
  return (
    <button
      type={type}
      className={`d-flex align-items-center border-0 justify-content-center ${btnClass} ${className}`.trim()}
      onClick={onClick}
      aria-label={ariaLabel}
      {...rest}
    >
      <span>{children}</span>
      {icon && (
        <span className="d-flex align-items-center ps-3 btn-icon">{icon}</span>
      )}
    </button>
  );
};

export default Button;
