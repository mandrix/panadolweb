import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Presentation from './components/Presentation';
import PhotoViewer from './components/PhotoViewer';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta raíz - Presentación de Panadol */}
        <Route path="/" element={<Presentation />} />
        
        {/* Ruta con ID - Visor de fotos */}
        <Route path="/:id" element={<PhotoViewer />} />
        
        {/* Redirigir cualquier otra ruta a la presentación */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
