import type { ButtonHTMLAttributes, ReactNode } from "react";
import cls from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children?: ReactNode;
}

export function Button({ icon, children, className, ...rest }: ButtonProps) {
  const isIconOnly = Boolean(icon) && !children;
  const buttonClass = [cls.button, isIconOnly && cls.button_iconOnly, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClass} {...rest}>
      {icon && <span className={cls.icon}>{icon}</span>}
      {children}
    </button>
  );
}
