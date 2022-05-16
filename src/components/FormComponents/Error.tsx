import React, { Component, FC } from "react";

interface ErrorProps {
  title?: string;
  description: string;
  show?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Error: FC<ErrorProps> = ({
  title,
  description,
  show = true,
  className = "",
  onClick = () => {},
}) => {
  if (!show) return <></>;
  return (
    <div
      className={`alert alert-error shadow-lg ${className}`}
      onClick={onClick}
    >
      <div>
        <div>
          {title && <h3 className="font-bold">{title}</h3>}
          <div className="text-xs">{description}</div>
        </div>
      </div>
    </div>
  );
};
