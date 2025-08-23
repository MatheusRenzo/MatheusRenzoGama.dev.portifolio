// Configuração otimizada para Vercel Speed Insights
export const speedInsightsConfig = {
  debug: false,
  mobileOptimizations: {
    captureInterval: 1000,
    mobileSpecificMetrics: [
      'first-contentful-paint',
      'largest-contentful-paint',
      'first-input-delay',
      'cumulative-layout-shift'
    ]
  },
  routeTracking: {
    trackAllRoutes: true,
    routeChangeDelay: 1000,
    trackResources: true,
    trackLayout: true
  },
  performance: {
    coreMetrics: [
      'navigation',
      'paint',
      'largest-contentful-paint',
      'first-input',
      'layout-shift'
    ],
    captureTimeout: 5000,
    waitForLoad: true
  }
};

// Função para configurar o Speed Insights
export function configureSpeedInsights() {
  if (typeof window === 'undefined') return;

  // Configurar observadores de performance silenciosamente
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver(() => {});
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      const fidObserver = new PerformanceObserver(() => {});
      fidObserver.observe({ entryTypes: ['first-input'] });

      const clsObserver = new PerformanceObserver(() => {});
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      const paintObserver = new PerformanceObserver(() => {});
      paintObserver.observe({ entryTypes: ['paint'] });
    } catch (error) {
      // Silenciar erros
    }
  }
}

// Função para capturar métricas específicas de uma rota
export function captureRouteMetrics(route) {
  if (typeof window === 'undefined') return;

  setTimeout(() => {
    try {
      if (window.performance && window.performance.getEntriesByType) {
        const navigationEntries = window.performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0) {
          const navEntry = navigationEntries[0];
          const metrics = {
            route,
            timestamp: Date.now(),
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            loadComplete: navEntry.loadEventEnd - navEntry.loadStart,
            totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
            userAgent: navigator.userAgent,
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
          };
          
          // Enviar para analytics se disponível
          if (window.gtag) {
            window.gtag('event', 'route_performance', {
              event_category: 'performance',
              event_label: route,
              value: Math.round(metrics.totalTime),
              custom_parameters: {
                is_mobile: metrics.isMobile,
                dom_content_loaded: Math.round(metrics.domContentLoaded),
                load_complete: Math.round(metrics.loadComplete)
              }
            });
          }
        }
      }
    } catch (error) {
      // Silenciar erros
    }
  }, 1000);
}
