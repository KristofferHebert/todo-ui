const API_BASE = process.env.DOMAIN_BASE || `http://localhost:${process.env.PORT ?? 3000}`;

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return API_BASE;
};

export const API_CONFIG = {
  baseUrl: getBaseUrl(),
  api: {
    todos: `${API_BASE}/api/todos`,
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  methods: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
} as const;