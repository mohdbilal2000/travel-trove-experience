/**
 * API Service Layer
 * Handles all API calls with fallback to static data
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/admin/api';
const USE_STATIC_FALLBACK = process.env.NEXT_PUBLIC_USE_STATIC_FALLBACK !== 'false';

// Helper function to check if API is available
async function checkApiAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth.php?action=check`, {
      method: 'GET',
      credentials: 'include'
    });
    return response.ok;
  } catch {
    return false;
  }
}

// API Request wrapper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${API_BASE_URL}/${endpoint}`;
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`API returned non-JSON: ${text.substring(0, 100)}`);
    }

    const data = await response.json();

    // Check for API-level errors
    if (!response.ok) {
      const errorMsg = data.error || data.message || response.statusText;
      throw new Error(`API Error (${response.status}): ${errorMsg}`);
    }

    return data as T;
  } catch (error: any) {
    console.error('API Request failed:', {
      endpoint,
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
}

// Auth API
export const authAPI = {
  login: async (username: string, password: string) => {
    return apiRequest<{ success: boolean; user?: any; message?: string; error?: string }>(
      'auth.php?action=login',
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }
    );
  },

  logout: async () => {
    return apiRequest<{ success: boolean; message?: string }>(
      'auth.php?action=logout',
      {
        method: 'POST',
      }
    );
  },

  check: async () => {
    return apiRequest<{ authenticated: boolean; user?: any }>(
      'auth.php?action=check',
      {
        method: 'GET',
      }
    );
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    return apiRequest<{ success: boolean; message?: string; error?: string }>(
      'auth.php?action=change-password',
      {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      }
    );
  },
};

// Plans API
export const plansAPI = {
  getAll: async (params?: { page?: number; limit?: number; category?: string; active?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.active) queryParams.append('active', 'true');

    const query = queryParams.toString();
    return apiRequest<{ success: boolean; data: any[]; pagination?: any }>(
      `plans.php${query ? `?${query}` : ''}`,
      { method: 'GET' }
    );
  },

  getById: async (id: number) => {
    return apiRequest<{ success: boolean; data: any }>(
      `plans.php?id=${id}`,
      { method: 'GET' }
    );
  },

  create: async (plan: any) => {
    return apiRequest<{ success: boolean; message?: string; id?: number; error?: string }>(
      'plans.php',
      {
        method: 'POST',
        body: JSON.stringify(plan),
      }
    );
  },

  update: async (id: number, plan: any) => {
    return apiRequest<{ success: boolean; message?: string; error?: string }>(
      `plans.php?id=${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(plan),
      }
    );
  },

  delete: async (id: number) => {
    return apiRequest<{ success: boolean; message?: string; error?: string }>(
      `plans.php?id=${id}`,
      {
        method: 'DELETE',
      }
    );
  },
};

// Blogs API
export const blogsAPI = {
  getAll: async (params?: { page?: number; limit?: number; category?: string; published?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.published) queryParams.append('published', 'true');

    const query = queryParams.toString();
    return apiRequest<{ success: boolean; data: any[]; pagination?: any }>(
      `blogs.php${query ? `?${query}` : ''}`,
      { method: 'GET' }
    );
  },

  getById: async (id: number) => {
    return apiRequest<{ success: boolean; data: any }>(
      `blogs.php?id=${id}`,
      { method: 'GET' }
    );
  },

  getBySlug: async (slug: string) => {
    // This would need a separate endpoint or we filter client-side
    const all = await blogsAPI.getAll({ limit: 1000 });
    const post = all.data?.find((p: any) => p.slug === slug);
    return { success: !!post, data: post };
  },

  create: async (post: any) => {
    return apiRequest<{ success: boolean; message?: string; id?: number; error?: string }>(
      'blogs.php',
      {
        method: 'POST',
        body: JSON.stringify(post),
      }
    );
  },

  update: async (id: number, post: any) => {
    return apiRequest<{ success: boolean; message?: string; error?: string }>(
      `blogs.php?id=${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(post),
      }
    );
  },

  delete: async (id: number) => {
    return apiRequest<{ success: boolean; message?: string; error?: string }>(
      `blogs.php?id=${id}`,
      {
        method: 'DELETE',
      }
    );
  },
};

// SEO API
export const seoAPI = {
  getAll: async (params?: { page?: number; limit?: number; type?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.type) queryParams.append('type', params.type);

    const query = queryParams.toString();
    return apiRequest<{ success: boolean; data: any[]; pagination?: any }>(
      `seo.php${query ? `?${query}` : ''}`,
      { method: 'GET' }
    );
  },

  getByPath: async (path: string) => {
    return apiRequest<{ success: boolean; data: any }>(
      `seo.php?path=${encodeURIComponent(path)}`,
      { method: 'GET' }
    );
  },

  save: async (seo: any) => {
    return apiRequest<{ success: boolean; message?: string; error?: string }>(
      'seo.php',
      {
        method: 'POST',
        body: JSON.stringify(seo),
      }
    );
  },

  delete: async (path: string) => {
    return apiRequest<{ success: boolean; message?: string; error?: string }>(
      `seo.php?path=${encodeURIComponent(path)}`,
      {
        method: 'DELETE',
      }
    );
  },
};

// Export API availability checker
export { checkApiAvailable, USE_STATIC_FALLBACK };

