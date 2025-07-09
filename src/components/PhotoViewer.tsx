import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

// Importar assets UI
import btnDescargarImagen from '../assets/ui/buttons/btn_descargar imagen.png';
import btnDescargarCupon from '../assets/ui/buttons/btn_descargar cupón.png';
import btnCompartir from '../assets/ui/buttons/btn_compartir.png';
import cuponDescuento from '../assets/ui/coupons/Cupón descuento.png';

const PhotoViewer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate('/', { replace: true });
      return;
    }
    loadPhoto(id);
    // eslint-disable-next-line
  }, [id]);

  const loadPhoto = async (photoTimestamp: string) => {
    setLoading(true);
    setPhotoUrl(null);
    try {
      const photoPath = `screenshots/Screenshot_${photoTimestamp}.png`;
      const url = await getDownloadURL(ref(storage, photoPath));
      setPhotoUrl(url);
    } catch (err) {
      navigate('/', { replace: true });
    }
    setLoading(false);
  };

  // Descargar imagen de la zona de calor
  const handleDownloadImage = () => {
    if (photoUrl) {
      const link = document.createElement('a');
      link.href = photoUrl;
      link.download = `zona-de-calor-${id}.png`;
      link.click();
    }
  };

  // Compartir (puedes personalizar la lógica)
  const handleShare = () => {
    if (navigator.share && photoUrl) {
      navigator.share({
        title: '¡No hay señal de fiebre!',
        url: photoUrl,
      });
    } else {
      alert('La función de compartir no está soportada en este navegador.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-500 to-green-300 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Zona de calor (screenshot) */}
        <div className="flex flex-col items-center">
          <div className="bg-white/10 rounded-2xl p-4 shadow-lg w-full max-w-xs">
            <div className="bg-black rounded-xl overflow-hidden border-4 border-white/30">
              {loading ? (
                <div className="flex items-center justify-center h-80 text-white">Cargando foto...</div>
              ) : photoUrl ? (
                <img src={photoUrl} alt="Zona de calor" className="w-full h-auto object-contain" />
              ) : null}
            </div>
          </div>
          <button onClick={handleDownloadImage} className="mt-4">
            <img src={btnDescargarImagen} alt="Descargar Imagen" className="h-12" />
          </button>
        </div>

        {/* UI principal */}
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">¡ALIVIATE DE LA GRIPE!</h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium">GRACIAS POR FORMAR PARTE DE ESTA EXPERIENCIA</p>
          <img src={cuponDescuento} alt="Cupón descuento" className="w-72 md:w-96 mx-auto" />
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
            <button className="w-full md:w-auto">
              <img src={btnDescargarCupon} alt="Descargar Cupón" className="h-12" />
            </button>
            <button onClick={handleShare} className="w-full md:w-auto">
              <img src={btnCompartir} alt="Compartir" className="h-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoViewer; 