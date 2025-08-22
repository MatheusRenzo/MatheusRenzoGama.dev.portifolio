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
    
    // Verificar se o componente SpeedInsights está sendo renderizado
    console.log('🔍 Verificando se o componente SpeedInsights está no DOM...');
    const speedInsightsElements = document.querySelectorAll('[data-speed-insights]');
    console.log('📊 Elementos com data-speed-insights:', speedInsightsElements.length);
    
    // Verificar se há algum erro relacionado ao Speed Insights
    console.log('🔍 Verificando se há erros relacionados ao Speed Insights...');
    
    // Verificar se o pacote está disponível globalmente
    try {
      if (window.VercelSpeedInsights) {
        console.log('✅ VercelSpeedInsights encontrado globalmente');
      } else {
        console.log('⚠️ VercelSpeedInsights NÃO encontrado globalmente');
      }
    } catch (error) {
      console.log('❌ Erro ao verificar VercelSpeedInsights global:', error.message);
    }
    
    // Verificar se há requisições para speed-insights
    console.log('🔍 Verificando se há requisições para speed-insights...');
    
    // Interceptar requisições de rede
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const url = args[0];
      if (typeof url === 'string' && url.includes('speed-insights')) {
        console.log('🚀 Requisição fetch para speed-insights:', url);
      }
      return originalFetch.apply(this, args);
    };
    
    // Verificar se há erros no console
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('speed-insights')) {
        console.log('🚨 Erro relacionado ao Speed Insights:', args);
      }
      originalError.apply(console, args);
    };
    
    // Verificar se o componente está sendo renderizado corretamente
    setTimeout(() => {
      console.log('🔍 Verificação tardia - Verificando se o SpeedInsights foi renderizado...');
      const allScripts = document.querySelectorAll('script');
      const newSpeedInsightsScripts = Array.from(allScripts).filter(script => 
        script.src && script.src.includes('speed-insights')
      );
      console.log('📜 Scripts após timeout:', allScripts.length);
      console.log('🚀 Scripts do Speed Insights após timeout:', newSpeedInsightsScripts.length);
      
      if (newSpeedInsightsScripts.length > 0) {
        console.log('✅ Scripts do Speed Insights encontrados após timeout:', newSpeedInsightsScripts.map(s => s.src));
      }
    }, 2000);
    
    return () => {
      console.error = originalError;
      window.fetch = originalFetch;
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
        <div data-speed-insights="test">
          <SpeedInsights />
        </div>
      </div>
      
      <div className="mt-3 text-xs text-blue-500">
        <p>✅ Pacote instalado: @vercel/speed-insights</p>
        <p>✅ Componente importado: SpeedInsights</p>
        <p>✅ Componente renderizado</p>
        <p>🔍 Verifique o console para mais detalhes</p>
        <p>⏰ Aguarde 2 segundos para verificação tardia</p>
      </div>
    </div>
  );
}
