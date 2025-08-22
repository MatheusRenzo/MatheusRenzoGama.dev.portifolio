import { useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function SpeedInsightsTest() {
  useEffect(() => {
    console.log('🔍 SpeedInsightsTest: Componente montado');
    
    // Verificar se o script está sendo carregado
    const scripts = document.querySelectorAll('script');
    const speedInsightsScripts = Array.from(scripts).filter(script => 
      script.src && script.src.includes('speed-insights')
    );
    
    console.log('📜 Scripts encontrados:', scripts.length);
    console.log('🚀 Scripts do Speed Insights:', speedInsightsScripts.length);
    
    if (speedInsightsScripts.length > 0) {
      console.log('✅ Scripts do Speed Insights encontrados:', speedInsightsScripts.map(s => s.src));
    } else {
      console.log('⚠️ Nenhum script do Speed Insights encontrado');
    }
    
    // Verificar se há erros no console
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('speed-insights')) {
        console.log('🚨 Erro relacionado ao Speed Insights:', args);
      }
      originalError.apply(console, args);
    };
    
    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">
        🧪 Teste do Speed Insights
      </h3>
      <p className="text-blue-700 text-sm">
        Este componente está testando se o Vercel Speed Insights está funcionando.
        Abra o console do navegador (F12) para ver os logs de teste.
      </p>
      
      {/* Renderizar o componente SpeedInsights aqui para teste */}
      <div className="mt-3 p-2 bg-blue-50 rounded border">
        <p className="text-xs text-blue-600">
          Componente SpeedInsights renderizado abaixo:
        </p>
        <SpeedInsights />
      </div>
      
      <div className="mt-3 text-xs text-blue-500">
        <p>✅ Pacote instalado: @vercel/speed-insights</p>
        <p>✅ Componente importado: SpeedInsights</p>
        <p>✅ Componente renderizado</p>
        <p>🔍 Verifique o console para mais detalhes</p>
      </div>
    </div>
  );
}
