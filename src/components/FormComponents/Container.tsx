import React, { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  onSubmit: (e?: any) => void;
}

export const Container: FC<ContainerProps> = ({
  children,
  onSubmit,
  className,
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};
