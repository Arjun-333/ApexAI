const API_URL = "http://localhost:8000/api";

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }

  return response;
}

export const api = {
  auth: {
    register: (data: any) => fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

    login: (formData: FormData) => fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json()),
  },

  user: {
    getProfile: () => fetchWithAuth('/user/profile').then(res => res.json()),
    updateProfile: (data: any) => fetchWithAuth('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(res => res.json()),
  },

  workout: {
    getPlan: () => fetchWithAuth('/workout/plan').then(res => res.json()),
    logSession: (data: any) => fetchWithAuth('/workout/log', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(res => res.json()),
  },

  nutrition: {
    getPlan: () => fetchWithAuth('/nutrition/plan').then(res => res.json()),
  },

  ai: {
    chat: (query: string, history: any[]) => fetchWithAuth('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ query, history }),
    }).then(res => res.json()),
  }
};
