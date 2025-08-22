'use client';

import { SpeedInsights } from '@vercel/speed-insights/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function Insights() {
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState(router.pathname);

  useEffect(() => {
    // Atualizar a rota quando ela mudar
    const handleRouteChange = (url) => {
      setCurrentRoute(url);
      console.log('🔄 Rota mudou para:', url);
    };

    // Escutar mudanças de rota
    router.events.on('routeChangeComplete', handleRouteChange);
    
    // Escutar também mudanças de rota via navegação do navegador
    router.events.on('routeChangeStart', (url) => {
      console.log('🚀 Iniciando mudança de rota para:', url);
    });

    // Escutar mudanças de rota via popstate (botões voltar/avançar)
    const handlePopState = () => {
      const newRoute = window.location.pathname;
      setCurrentRoute(newRoute);
      console.log('📱 Mudança de rota via navegação do navegador:', newRoute);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeStart', handleRouteChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  // Atualizar também quando o pathname mudar diretamente
  useEffect(() => {
    setCurrentRoute(router.pathname);
    console.log('📍 Rota atual definida como:', router.pathname);
  }, [router.pathname]);

  console.log('🎯 Insights renderizando com rota:', currentRoute);

  return <SpeedInsights route={currentRoute} />;
}
