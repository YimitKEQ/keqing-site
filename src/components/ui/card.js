// src/components/ui/card.js

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
}
