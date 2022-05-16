import React, { Component, FC } from "react";

interface StackProps {
  children: React.ReactNode;
  spacing?: number;
  direction?: "col" | "row";
  className?: string;
}

export const Stack: FC<StackProps> = ({
  spacing = 6,
  children,
  className = "",
  direction = "col",
}) => {
  return (
    <div
      className={`flex ${direction === "col" && "flex-col"} space-${
        direction === "col" ? "y" : "x"
      }-${spacing} ${className}`}
    >
      {children}
    </div>
  );
};
