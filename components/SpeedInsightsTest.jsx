import { useEffect } from 'react';
import { Insights } from './Insights';

export default function SpeedInsightsTest() {
  useEffect(() => {
    console.log('🧪 SpeedInsightsTest: Componente montado');
    
    // Verificar se o componente SpeedInsights está sendo renderizado
    setTimeout(() => {
      const speedInsightsElements = document.querySelectorAll('[data-speed-insights]');
      console.log('📊 Elementos SpeedInsights encontrados:', speedInsightsElements.length);
    }, 1000);
  }, []);

  return (
    <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">
        🧪 Teste do Speed Insights
      </h3>
      <p className="text-blue-700 text-sm mb-3">
        Este componente testa se o Vercel Speed Insights está funcionando.
        Abra o console (F12) para ver os logs.
      </p>
      
      <div className="mt-3 p-2 bg-blue-50 rounded border">
        <p className="text-xs text-blue-600 mb-2">
          Componente SpeedInsights renderizado:
        </p>
        <div data-speed-insights="test">
          <Insights />
        </div>
      </div>
      
      <div className="mt-3 text-xs text-blue-500">
        <p>✅ Pacote instalado: @vercel/speed-insights</p>
        <p>✅ Componente Insights renderizado</p>
        <p>🔍 Verifique o console para detalhes</p>
      </div>
    </div>
  );
}
