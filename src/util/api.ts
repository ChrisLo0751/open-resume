export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

const BASE_URL = '/api';

const fetchApi = async <T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || '请求失败' };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: (error as Error).message || '网络错误' };
  }
};

export const get = async <T>(url: string): Promise<ApiResponse<T>> => {
  return fetchApi<T>(url, { method: 'GET' });
};

export const post = async <T>(url: string, body: any): Promise<ApiResponse<T>> => {
  return fetchApi<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};