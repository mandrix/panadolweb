import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

// Importar assets esenciales
import cuponDescuento from '../assets/ui/coupons/Cupón descuento.png';
import bgDesktop from '../assets/ui/backgrounds/desktop.png';
import bgMobile from '../assets/ui/backgrounds/mobile.png';

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

  const handleDownloadImage = () => {
    if (photoUrl) {
      const link = document.createElement('a');
      link.href = photoUrl;
      link.download = `zona-de-calor-${id}.png`;
      link.click();
    }
  };

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
    <div
      className="relative min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${window.innerWidth >= 768 ? bgDesktop : bgMobile})`,
      }}
    >
      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10">
        {/* Zona de calor (solo screenshot) */}
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-[420px] flex items-center justify-center">
            <div className="relative w-[180px] h-[320px] bg-black rounded-xl overflow-hidden border-4 border-white/30 z-10 flex items-center justify-center">
              {loading ? (
                <div className="flex items-center justify-center h-full text-white">Cargando foto...</div>
              ) : photoUrl ? (
                <img src={photoUrl} alt="Zona de calor" className="w-full h-full object-contain" />
              ) : null}
            </div>
          </div>
          <button
            onClick={handleDownloadImage}
            className="mt-4 px-6 py-2 bg-white text-green-700 font-bold rounded-full shadow hover:bg-green-100 transition"
          >
            Descargar Imagen
          </button>
        </div>

        {/* UI principal */}
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">¡ALÍVIATE DE LA GRIPE!</h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium">GRACIAS POR FORMAR PARTE DE ESTA EXPERIENCIA</p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-green-900 font-bold text-lg">10% DESCUENTO</span>
            <img src={cuponDescuento} alt="Cupón descuento" className="w-72 md:w-96 mx-auto" />
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
            <button
              className="w-full md:w-auto px-6 py-2 bg-yellow-400 text-green-900 font-bold rounded-full shadow hover:bg-yellow-300 transition"
            >
              Descargar Cupón
            </button>
            <button
              onClick={handleShare}
              className="w-full md:w-auto px-6 py-2 bg-green-800 text-white font-bold rounded-full shadow hover:bg-green-700 transition"
            >
              Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoViewer;
