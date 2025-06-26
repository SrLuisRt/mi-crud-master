import React, { useState, useEffect } from 'react';

// Componente funcional Form que recibe props para agregar o actualizar un ítem
function Form({ addOrUpdateItem, itemToEdit }) {

  // Estado local para almacenar el valor del input
  const [inputValue, setInputValue] = useState('');

  // useEffect que actualiza el input si se edita un ítem existente
  useEffect(() => {
    if (itemToEdit) {
      setInputValue(itemToEdit.value);
    } else {
      setInputValue('');
    }
  }, [itemToEdit]);

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addOrUpdateItem(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button type="submit">
        {itemToEdit ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
}

export default Form;
