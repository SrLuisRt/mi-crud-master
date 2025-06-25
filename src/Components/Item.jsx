import React from "react";

function Item({ item, deleteItem, editItem }) { // Componente que representa un elemento de una lista, con botones para editar y eliminar el elemento.
    return (
        <li>
        {item.value}
        <button onClick={() => editItem(item)}>Editar</button>
        <button onClick={() => deleteItem(item.id)}>Eliminar</button>
        </li>
    );
}

export default Item;