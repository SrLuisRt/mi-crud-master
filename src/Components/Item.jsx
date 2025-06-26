import React from "react";

// Componente funcional que representa un ítem con opciones de editar y eliminar
function Item({ item, deleteItem, editItem }) {
    return (
        <li>
            {item.value}
            <button onClick={() => editItem(item)}>Editar</button>
            <button onClick={() => deleteItem(item.id)}>Eliminar</button>
        </li>
    );
}

export default Item;
