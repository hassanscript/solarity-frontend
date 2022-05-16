import React, { FC } from "react";

interface ButtonProps {
  type?: "button" | "submit";
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  outline?: Boolean;
  loading?: Boolean;
  size?: "lg" | "md" | "sm" | "xs";
  disabled?: Boolean;
  wrap?: Boolean;
  wide?: Boolean;
  disableOnLoading?: Boolean;
  onClick?: () => void;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = "secondary",
  loading = false,
  disabled = false,
  size = "md",
  wrap = true,
  wide = false,
  disableOnLoading = true,
  outline = false,
  type = "button",
  className = "",
  onClick = () => {},
}) => {
  className += ` rounded-full btn px-6 btn-${variant} btn-${size} ${
    loading && "loading"
  }
  ${outline && "btn-outline"}
  ${wide && "btn-wide"}
  ${
    (disabled || (disableOnLoading && loading)) &&
    "btn-disabled bg-gray-800 border-none cursor-not-allowed"
  }`;
  const button = (
    <button type={type} className={className} onClick={onClick}>
      <>{children}</>
    </button>
  );
  if (wrap) return <div>{button}</div>;
  return button;
};
