import React, { useState, useEffect } from 'react';

function Form({addOrUpdateItem, itemToEdit}){ // Desestructuración de props
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {// Efecto para actualizar el valor del input cuando cambia itemToEdit
        if (itemToEdit) {
            setInputValue(itemToEdit.value);
        } else {
            setInputValue('');
        }
    }, [itemToEdit]);
    const handleSubmit = (e) => {// Manejo del evento de envío del formulario
    e.preventDefault();
    if (inputValue.trim()){
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
            <button type="submit">{itemToEdit ? 'Actualizar' : 'Agregar'}</button>
        </form>
    );
}

export default Form;