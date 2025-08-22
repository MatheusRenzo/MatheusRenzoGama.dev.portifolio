'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function RouteTracker() {
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState(router.pathname);
  const [routeHistory, setRouteHistory] = useState([router.pathname]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      setCurrentRoute(url);
      setRouteHistory(prev => [...prev, url]);
      console.log('🔄 RouteTracker: Rota mudou para:', url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <div className="fixed bottom-4 right-4 p-3 bg-green-100 border border-green-300 rounded-lg shadow-lg z-50 max-w-xs">
      <h4 className="text-sm font-semibold text-green-800 mb-2">
        🧭 Rastreador de Rotas
      </h4>
      <p className="text-xs text-green-700 mb-2">
        <strong>Rota atual:</strong> {currentRoute}
      </p>
      <div className="text-xs text-green-600">
        <strong>Histórico:</strong>
        <ul className="mt-1 space-y-1">
          {routeHistory.slice(-5).map((route, index) => (
            <li key={index} className="truncate">
              {route}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-green-500 mt-2">
        Total: {routeHistory.length} rotas
      </p>
    </div>
  );
}
