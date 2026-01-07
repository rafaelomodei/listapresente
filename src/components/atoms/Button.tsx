import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

const Button = ({ variant, className, ...props }: ButtonProps) => {
  const classes = [className, variant].filter(Boolean).join(' ');
  return <button className={classes} {...props} />;
};

export default Button;
