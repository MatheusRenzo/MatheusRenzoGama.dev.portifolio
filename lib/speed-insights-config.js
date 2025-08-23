// Configuração otimizada para Vercel Speed Insights
export const speedInsightsConfig = {
  // Configurações para melhor captura de métricas
  debug: process.env.NODE_ENV === 'development',
  
  // Configurações específicas para mobile
  mobileOptimizations: {
    // Capturar métricas mais frequentemente em dispositivos móveis
    captureInterval: 1000,
    // Métricas específicas para mobile
    mobileSpecificMetrics: [
      'first-contentful-paint',
      'largest-contentful-paint',
      'first-input-delay',
      'cumulative-layout-shift'
    ]
  },
  
  // Configurações para todas as rotas
  routeTracking: {
    // Capturar métricas em todas as mudanças de rota
    trackAllRoutes: true,
    // Delay para captura após mudança de rota
    routeChangeDelay: 1000,
    // Capturar métricas de recursos
    trackResources: true,
    // Capturar métricas de layout
    trackLayout: true
  },
  
  // Configurações de performance
  performance: {
    // Métricas principais a capturar
    coreMetrics: [
      'navigation',
      'paint',
      'largest-contentful-paint',
      'first-input',
      'layout-shift'
    ],
    // Timeout para captura de métricas
    captureTimeout: 5000,
    // Aguardar página carregar completamente
    waitForLoad: true
  }
};

// Função para configurar o Speed Insights
export function configureSpeedInsights() {
  if (typeof window === 'undefined') return;

  // Configurar observadores de performance
  if ('PerformanceObserver' in window) {
    try {
      // Observer para Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('🎯 LCP Captured:', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Observer para First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('🎯 FID Captured:', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Observer para Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('🎯 Layout Shift Captured:', entry.value);
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Observer para Paint
      const paintObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            console.log('🎯 FCP Captured:', entry.startTime);
          }
        });
      });
      paintObserver.observe({ entryTypes: ['paint'] });

    } catch (error) {
      console.error('Error setting up Performance Observers:', error);
    }
  }

  // Configurar captura manual de métricas
  if (window.performance && window.performance.getEntriesByType) {
    // Capturar métricas iniciais
    setTimeout(() => {
      try {
        const navigationEntries = window.performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0) {
          const navEntry = navigationEntries[0];
          console.log('📊 Initial Navigation Metrics:', {
            route: window.location.pathname,
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
            totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
          });
        }
      } catch (error) {
        console.error('Error capturing initial metrics:', error);
      }
    }, 2000);
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
            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
            totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
            userAgent: navigator.userAgent,
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
          };
          
          console.log('🔄 Route Metrics Captured:', metrics);
          
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
      console.error('Error capturing route metrics:', error);
    }
  }, 1000);
}
