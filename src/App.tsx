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
        <Route path="/:id" element={<PhotoViewerWrapper />} />
        
        {/* Redirigir cualquier otra ruta a la presentación */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

// Componente wrapper para extraer el parámetro de la URL
function PhotoViewerWrapper() {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <Navigate to="/" replace />;
  }
  
  return <PhotoViewer photoId={id} />;
}

export default App;
