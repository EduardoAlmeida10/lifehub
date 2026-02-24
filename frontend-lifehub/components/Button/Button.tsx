import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  isLoading = false,
  disabled,
  ...rest
}: ButtonProps) {
  const baseStyle =
    "px-4 py-2 rounded-full font-medium transition-colors duration-200 cursor-pointer";

  const variants = {
    primary: "bg-foreground text-white hover:bg-purple-900",
    secondary: "bg-gray-200 text-black hover:bg-purple-900",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${
        disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}
