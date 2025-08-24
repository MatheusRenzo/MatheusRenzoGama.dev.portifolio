export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Verifica se as variáveis de ambiente estão sendo carregadas
  const envInfo = {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN ? '✅ Configurado' : '❌ Não configurado',
    GITHUB_TOKEN_LENGTH: process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN.length : 0,
    GITHUB_TOKEN_START: process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN.substring(0, 10) + '...' : 'N/A',
    NODE_ENV: process.env.NODE_ENV,
    ALL_ENV_KEYS: Object.keys(process.env).filter(key => key.includes('GITHUB')),
    timestamp: new Date().toISOString()
  };

  res.status(200).json(envInfo);
}
