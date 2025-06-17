App.jsx

import React, {useState, useEffect} from "react";
import Form from "./Components/Form";
import List from "./Components/List";
import "./App.css";

function App(){// Componente principal de la aplicación
  const [items, setItems] = useState([]);// Estado para almacenar los items
  const [itemToEdit, setItemToEdit] = useState(null);// Estado para almacenar el item que se está editando

  useEffect(() => {// Cargar los items desde localStorage al iniciar la aplicación
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);
  useEffect(() => {// Guardar los items en localStorage cada vez que cambian
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
  const addOrUpdateItem = (value) => {// Agregar o actualizar un item
    if (itemToEdit) {
      setItems(items.map(item => item.id === itemToEdit.id ? {...item, value} : item));
      setItemToEdit(null);
    } else {
      setItems([
        ...items,
        { id: Date.now(), value }
      ]);
    }
  };
  const deleteItem = (id) => {// Eliminar un item por su id
    setItems(items.filter(item => item.id !== id));
  };
  const editItem = (item) => {//  Seleccionar un item para editar
    setItemToEdit(item);
  };
  return (
    <div className="App">
      <h1>CRUD con LocalStorage</h1>
      <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />
      <List items={items} deleteItem={deleteItem} editItem={editItem} />
    </div>
  );
}
export default App;
