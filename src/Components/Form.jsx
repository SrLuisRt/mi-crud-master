import React, { useState, useEffect } from 'react';

function Form({addOrUpdateItem, itemToEdit}){//Permite tanto agregar como editar elementos en una lista o colección, dependiendo de si se recibe un itemToEdit.
    
    const [inputValue, setInputValue] = useState('');

    useEffect(() => { // Este efecto se ejecuta cuando itemToEdit cambia.  
        if (itemToEdit) {
            setInputValue(itemToEdit.value);
        } else {
            setInputValue('');
        }
    }, [itemToEdit]);
    const handleSubmit = (e) => {
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