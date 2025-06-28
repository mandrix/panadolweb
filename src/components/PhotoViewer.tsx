import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useNavigate } from 'react-router-dom';

interface PhotoViewerProps {
  photoId: string;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({ photoId }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (photoId) {
      loadPhoto(photoId);
    }
    // eslint-disable-next-line
  }, [photoId]);

  const loadPhoto = async (photoTimestamp: string) => {
    setLoading(true);
    setPhotoUrl(null);
    try {
      const photoPath = `screenshots/Screenshot_${photoTimestamp}.png`;
      const url = await getDownloadURL(ref(storage, photoPath));
      setPhotoUrl(url);
    } catch (err) {
      // Redirigir al menú si no existe la foto
      navigate('/', { replace: true });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center w-full max-w-2xl">
        {loading && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">Cargando foto...</p>
          </div>
        )}
        {photoUrl && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="border-4 border-white/30 rounded-xl shadow-2xl p-2 bg-white/5">
              <img 
                src={photoUrl} 
                alt="Foto" 
                className="w-full h-auto rounded-lg max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoViewer; 