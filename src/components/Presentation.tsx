import React from 'react';

const Presentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100 flex items-center justify-center p-4">
      <div className="text-center w-full max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-orange-200">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-orange-600 mb-4">💊 Panadol</h1>
            <p className="text-xl text-gray-700">Alivio confiable para el dolor y la fiebre</p>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-left">
              <h2 className="text-2xl font-semibold text-orange-700 mb-4">¿Qué es Panadol?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Panadol es un medicamento analgésico y antipirético que contiene paracetamol como principio activo. 
                Es ampliamente utilizado para aliviar el dolor leve a moderado y reducir la fiebre.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Su eficacia y seguridad lo han convertido en uno de los medicamentos más confiables 
                para el manejo del dolor en millones de personas alrededor del mundo.
              </p>
            </div>

            <div className="text-left">
              <h2 className="text-2xl font-semibold text-orange-700 mb-4">Beneficios Principales</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  Alivia dolores de cabeza, musculares y articulares
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  Reduce la fiebre de manera efectiva
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  Seguro para el estómago
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  Apto para toda la familia
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">✓</span>
                  Acción rápida y duradera
                </li>
              </ul>
            </div>
          </div>

          {/* Usage Section */}
          <div className="bg-orange-50 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-orange-700 mb-4">¿Cuándo usar Panadol?</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-orange-600 mb-2">Dolor de Cabeza</h3>
                <p className="text-gray-600">Alivia dolores de cabeza tensionales y migrañas leves</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-orange-600 mb-2">Fiebre</h3>
                <p className="text-gray-600">Reduce la temperatura corporal elevada</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-orange-600 mb-2">Dolores Menores</h3>
                <p className="text-gray-600">Dolores musculares, de espalda y articulares</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-orange-200 pt-6">
            <p className="text-gray-500 text-sm">
              <strong>Importante:</strong> Siempre consulta con un profesional de la salud antes de usar cualquier medicamento. 
              Lee el prospecto y sigue las indicaciones de dosificación recomendadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation; 