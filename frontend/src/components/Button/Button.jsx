import './Button.css';
import { useNavigate } from "react-router-dom";


const Button = ({
  variant = 'primary',
  children,
  className = '',
  onClick,
  type = 'button',
  icon,
  ariaLabel,
  to,               // optional → navigate to any route
  scrollToForm,     // optional → scroll to #contact-form
  ...rest
}) => {
  const navigate = useNavigate();
  const btnClass = variant === 'secondary' ? 'secondaryBtn' : 'primaryBtn';

  const handleClick = (e) => {
    // 1. If custom onClick handler exists → run it
    if (onClick) onClick(e);

    // 2. Navigation
    if (to) {
      navigate(to);
    }

    // 3. Scroll to contact form
    if (scrollToForm) {
      navigate("/#contact-form");

      setTimeout(() => {
        const el = document.getElementById("contact-form");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <button
      type={type}
      className={`d-flex align-items-center border-0 justify-content-center ${btnClass} ${className}`.trim()}
      onClick={handleClick}
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
