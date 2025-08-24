'use client';

import { SpeedInsights } from '@vercel/speed-insights/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { configureSpeedInsights, captureRouteMetrics } from '../lib/speed-insights-config';

export function Insights() {
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState(router.pathname);

  useEffect(() => {
    // Configurar Speed Insights otimizado
    configureSpeedInsights();
  }, []);

  useEffect(() => {
    // Atualizar a rota quando ela mudar
    const handleRouteChange = (url) => {
      setCurrentRoute(url);
      
      // Capturar métricas para a nova rota
      captureRouteMetrics(url);
      
      // Forçar captura de métricas para a nova rota
      if (typeof window !== 'undefined' && window.performance) {
        // Aguardar um pouco para a página carregar completamente
        setTimeout(() => {
          // Trigger manual de métricas de performance
          if (window.performance && window.performance.getEntriesByType) {
            const navigationEntries = window.performance.getEntriesByType('navigation');
            if (navigationEntries.length > 0) {
              const navEntry = navigationEntries[0];
              console.log('Performance metrics for route:', url, navEntry);
            }
          }
        }, 1000);
      }
    };

    // Escutar mudanças de rota
    router.events.on('routeChangeComplete', handleRouteChange);
    
    // Escutar também mudanças de rota via navegação do navegador
    router.events.on('routeChangeStart', () => {});

    // Escutar mudanças de rota via popstate (botões voltar/avançar)
    const handlePopState = () => {
      const newRoute = window.location.pathname;
      setCurrentRoute(newRoute);
      captureRouteMetrics(newRoute);
    };

    window.addEventListener('popstate', handlePopState);

    // Captura inicial de métricas
    if (typeof window !== 'undefined' && window.performance) {
      // Aguardar a página carregar completamente
      setTimeout(() => {
        // Capturar métricas de performance iniciais
        if (window.performance && window.performance.getEntriesByType) {
          const navigationEntries = window.performance.getEntriesByType('navigation');
          if (navigationEntries.length > 0) {
            const navEntry = navigationEntries[0];
            console.log('Initial performance metrics:', navEntry);
          }
        }
      }, 2000);
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeStart', handleRouteChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  // Atualizar também quando o pathname mudar diretamente
  useEffect(() => {
    setCurrentRoute(router.pathname);
  }, [router.pathname]);

  return <SpeedInsights route={currentRoute} />;
}
