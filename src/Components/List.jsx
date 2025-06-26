import React from "react";
import Item from "./Item";

// Componente funcional que muestra una lista de ítems usando el componente Item
function List({ items, deleteItem, editItem }) {
  return (
    <ul>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      ))}
    </ul>
  );
}

export default List;
