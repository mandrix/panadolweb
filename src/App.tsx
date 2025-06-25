import { useState, useEffect } from 'react'
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

function App() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timestamp, setTimestamp] = useState("");

  // Extraer timestamp de la URL
  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const urlTimestamp = pathSegments[pathSegments.length - 1];
    
    if (urlTimestamp && urlTimestamp !== 'photo') {
      setTimestamp(urlTimestamp);
      loadPhoto(urlTimestamp);
    }
  }, []);

  const loadPhoto = async (photoTimestamp: string) => {
    setLoading(true);
    setError("");
    setPhotoUrl(null);
    
    try {
      // Construir el path completo con el timestamp
      const photoPath = `screenshots/Screenshot_${photoTimestamp}.png`;
      const url = await getDownloadURL(ref(storage, photoPath));
      setPhotoUrl(url);
    } catch (err) {
      setError(`No se pudo cargar la foto con timestamp: ${photoTimestamp}`);
    }
    setLoading(false);
  };

  const handleManualLoad = () => {
    if (timestamp) {
      loadPhoto(timestamp);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center w-full max-w-lg">
        <h1 className="text-4xl font-bold text-white mb-8">📸 Foto Viewer</h1>
        
        {loading && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Cargando foto...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-6 mb-6 border border-red-400">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {photoUrl && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="border-4 border-white/30 rounded-xl shadow-2xl p-2 bg-white/5">
              <img 
                src={photoUrl} 
                alt="Foto" 
                className="w-full h-auto rounded-lg max-h-96 object-contain"
              />
            </div>
            <p className="text-white/80 mt-4 text-sm">Timestamp: {timestamp}</p>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-xl text-white mb-4">Cargar foto manualmente</h2>
          <input
            type="text"
            placeholder="Timestamp (ej: 20250623_105735)"
            value={timestamp}
            onChange={e => setTimestamp(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-white/20 mb-4 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleManualLoad}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            disabled={loading || !timestamp}
          >
            Cargar Foto
          </button>
        </div>

        <p className="text-white/60 mt-8 text-sm">
          QR debe contener: https://tuapp.com/photo/TIMESTAMP
        </p>
      </div>
    </div>
  )
}

export default App
