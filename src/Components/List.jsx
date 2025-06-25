import React from "react";
import Item from "./Item";

function List({ items, deleteItem, editItem }) {// Componente que representa una lista de elementos, donde cada elemento es un componente Item.
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