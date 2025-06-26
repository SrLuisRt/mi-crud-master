import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Cargamos los alumnos desde localStorage al iniciar
  const [alumnos, setAlumnos] = useState(() => {
    const data = localStorage.getItem('alumnos');
    return data ? JSON.parse(data) : [];
  });

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [promedio, setPromedio] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Estado para manejar errores en el formulario
  const [errores, setErrores] = useState({});

  // Guardamos los alumnos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
  }, [alumnos]);

  // Función que evalúa la escala según el promedio
  const calcularEscala = (nota) => {
    if (nota < 4.0) return 'Deficiente';
    if (nota < 5.6) return 'Con Mejora';
    if (nota < 6.5) return 'Buen Trabajo';
    return 'Destacado';
  };

  // Validamos campos del formulario y devolvemos errores
  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = 'El nombre es requerido.';
    if (!asignatura.trim()) nuevosErrores.asignatura = 'La asignatura es requerida.';
    if (!promedio) {
      nuevosErrores.promedio = 'El promedio es requerido.';
    } else {
      const valor = parseFloat(promedio);
      if (isNaN(valor) || valor < 1 || valor > 7) {
        nuevosErrores.promedio = 'Debe estar entre 1.0 y 7.0.';
      }
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Maneja el envío del formulario (crear o editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const nuevo = {
      nombre,
      asignatura,
      promedio: parseFloat(promedio),
      escala: calcularEscala(parseFloat(promedio)),
    };

    if (editIndex !== null) {
      // Editar alumno existente
      const copia = [...alumnos];
      copia[editIndex] = nuevo;
      setAlumnos(copia);
      setEditIndex(null);
    } else {
      // Agregar nuevo alumno
      setAlumnos([...alumnos, nuevo]);
    }

    // Limpiar formulario y errores
    setNombre('');
    setAsignatura('');
    setPromedio('');
    setErrores({});
  };

  // Cargar los datos al formulario para edición
  const handleEdit = (index) => {
    const alumno = alumnos[index];
    setNombre(alumno.nombre);
    setAsignatura(alumno.asignatura);
    setPromedio(alumno.promedio);
    setEditIndex(index);
    setErrores({});
  };

  // Eliminar un alumno del listado
  const handleDelete = (index) => {
    const nuevos = alumnos.filter((_, i) => i !== index);
    setAlumnos(nuevos);
  };

  return (
    <div className="main-container">
      <h1>Evaluación de Alumnos</h1>

      <div className="card">
        <h2>{editIndex !== null ? 'Editar Evaluación' : 'Agregar Nueva Evaluación'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre del Alumno:</label>
          <input
            type="text"
            placeholder="Ej: Juan Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}

          <label>Asignatura:</label>
          <input
            type="text"
            placeholder="Ej: Matemáticas"
            value={asignatura}
            onChange={(e) => setAsignatura(e.target.value)}
          />
          {errores.asignatura && <p className="error">{errores.asignatura}</p>}

          <label>Promedio (1.0 - 7.0):</label>
          <input
            type="number"
            step="0.1"
            max="7"
            min="1"
            placeholder="Ej: 5.5"
            value={promedio}
            onChange={(e) => setPromedio(e.target.value)}
          />
          {errores.promedio && <p className="error">{errores.promedio}</p>}

          <button type="submit">
            {editIndex !== null ? 'Actualizar Evaluación' : 'Agregar Evaluación'}
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Evaluaciones Guardadas</h2>
        {alumnos.length === 0 ? (
          <p className="mensaje-vacio">
            No hay evaluaciones guardadas aún. ¡Agrega una!
          </p>
        ) : (
          alumnos.map((alumno, i) => (
            <div key={i} className="alumno-card">
              <div className="alumno-info">
                <p><strong>Alumno:</strong> {alumno.nombre}</p>
                <p><strong>Asignatura:</strong> {alumno.asignatura}</p>
                <p><strong>Promedio:</strong> {alumno.promedio.toFixed(1)}</p>
                <span className={`badge ${alumno.escala.toLowerCase().replace(' ', '-')}`}>
                  {alumno.escala}
                </span>
              </div>
              <div className="buttons">
                <button className="edit" onClick={() => handleEdit(i)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(i)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
