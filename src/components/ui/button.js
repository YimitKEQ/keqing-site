import React from "react";
import clsx from "clsx";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold transition-all",
        "hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
