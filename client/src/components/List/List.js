import React from "react";

export function List({ children }) {
  return (
    <div className="list-overflow-container sticky-inner">
      <ul className="list-group">{children}</ul>
    </div>
  );
}
