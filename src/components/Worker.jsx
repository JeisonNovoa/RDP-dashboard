// En tu componente React
import React, { useEffect } from 'react';
import MyWorker from './miWorker'; // Importa el archivo del trabajador

const App = () => {
  useEffect(() => {
    const worker = new MyWorker(); // Crea una instancia del trabajador

    worker.onmessage = (e) => {
      const result = e.data;
      console.log('Resultado:', result); // Haz lo que necesites con el resultado
    };

    return () => {
      worker.terminate(); // Termina el trabajador cuando el componente se desmonta
    };
  }, []);

  return (
    <div>
      {/* Tu contenido de React aquí */}
      <h1>Hola, el worker cargo</h1>
    </div>
  );
};

export default App;
