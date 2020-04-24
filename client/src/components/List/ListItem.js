import React from "react";

export function ListItem(props) {
  return <li className="list-group-item item" onClick={() => props.handleCategorySelect(props.categoryPicked)}>{props.item}</li>;
}
