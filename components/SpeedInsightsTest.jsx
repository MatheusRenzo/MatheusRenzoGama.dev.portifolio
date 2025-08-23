'use client';

import { useEffect } from 'react';

export function SpeedInsightsTest() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Função para capturar métricas de performance
    const capturePerformanceMetrics = () => {
      if (!window.performance) return;

      // Aguardar a página carregar completamente
      setTimeout(() => {
        try {
          // Capturar métricas de navegação
          const navigationEntries = window.performance.getEntriesByType('navigation');
          if (navigationEntries.length > 0) {
            const navEntry = navigationEntries[0];
            
            // Métricas principais
            const metrics = {
              route: window.location.pathname,
              timestamp: Date.now(),
              userAgent: navigator.userAgent,
              isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
              
              // Métricas de tempo
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
              domInteractive: navEntry.domInteractive,
              firstByte: navEntry.responseStart - navEntry.requestStart,
              totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
              
              // Métricas de recursos
              resourceCount: window.performance.getEntriesByType('resource').length,
              
              // Métricas de layout
              layoutShift: window.performance.getEntriesByType('layout-shift').length,
              firstInputDelay: 0,
            };

            // Capturar First Input Delay se disponível
            if (window.performance.getEntriesByType) {
              const firstInputEntries = window.performance.getEntriesByType('first-input');
              if (firstInputEntries.length > 0) {
                metrics.firstInputDelay = firstInputEntries[0].processingStart - firstInputEntries[0].startTime;
              }
            }

            // Capturar Largest Contentful Paint se disponível
            if (window.performance.getEntriesByType) {
              const lcpEntries = window.performance.getEntriesByType('largest-contentful-paint');
              if (lcpEntries.length > 0) {
                const lcpEntry = lcpEntries[lcpEntries.length - 1];
                metrics.lcp = lcpEntry.startTime;
              }
            }

            // Capturar First Contentful Paint se disponível
            if (window.performance.getEntriesByType) {
              const fcpEntries = window.performance.getEntriesByType('paint');
              fcpEntries.forEach(entry => {
                if (entry.name === 'first-contentful-paint') {
                  metrics.fcp = entry.startTime;
                }
              });
            }

            console.log('📊 Performance Metrics Captured:', metrics);
            
            // Enviar métricas para o Vercel (se disponível)
            if (window.gtag) {
              window.gtag('event', 'performance_metrics', {
                event_category: 'performance',
                event_label: metrics.route,
                value: Math.round(metrics.totalTime),
                custom_parameters: {
                  is_mobile: metrics.isMobile,
                  dom_content_loaded: Math.round(metrics.domContentLoaded),
                  first_byte: Math.round(metrics.firstByte),
                  resource_count: metrics.resourceCount,
                  lcp: metrics.lcp ? Math.round(metrics.lcp) : 0,
                  fcp: metrics.fcp ? Math.round(metrics.fcp) : 0,
                }
              });
            }
          }
        } catch (error) {
          console.error('Error capturing performance metrics:', error);
        }
      }, 2000);
    };

    // Capturar métricas iniciais
    capturePerformanceMetrics();

    // Capturar métricas quando a rota mudar
    const handleRouteChange = () => {
      setTimeout(capturePerformanceMetrics, 1000);
    };

    // Escutar mudanças de rota
    if (window.history && window.history.pushState) {
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;

      window.history.pushState = function(...args) {
        originalPushState.apply(this, args);
        handleRouteChange();
      };

      window.history.replaceState = function(...args) {
        originalReplaceState.apply(this, args);
        handleRouteChange();
      };
    }

    // Capturar métricas quando a janela ganhar foco (útil para mobile)
    const handleFocus = () => {
      setTimeout(capturePerformanceMetrics, 500);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handleFocus);
    };
  }, []);

  return null; // Componente não renderiza nada visualmente
}
