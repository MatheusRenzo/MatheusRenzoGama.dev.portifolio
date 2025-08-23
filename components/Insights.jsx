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
      captureRouteMetrics(url);
    };

    // Escutar mudanças de rota
    router.events.on('routeChangeComplete', handleRouteChange);
    
    // Escutar mudanças de rota via popstate (botões voltar/avançar)
    const handlePopState = () => {
      const newRoute = window.location.pathname;
      setCurrentRoute(newRoute);
      captureRouteMetrics(newRoute);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  // Atualizar também quando o pathname mudar diretamente
  useEffect(() => {
    setCurrentRoute(router.pathname);
  }, [router.pathname]);

  return <SpeedInsights route={currentRoute} />;
}
