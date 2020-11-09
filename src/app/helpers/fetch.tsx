export type MethodCallType = 'GET' | 'POST' | 'PUT' | 'DELETE';

const baseUrl = process.env.API_APP_URL;

export const appFetch = (endpoint: string, method: MethodCallType = 'GET', data?: any, headers: Record<string, string> = {}) => {
  const url = `${baseUrl}/${endpoint}`;
  if (method === 'GET') {
    fetch(url,{
      method,
      headers,
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data ? data : ''),
    });
  }
}

export const appFetchWithToken = (endpoint: string, method: MethodCallType = 'GET', data?: any, headers: Record<string, string> = {}) => {
  const token = localStorage.getItem('token');
  if (token) {
    return appFetch(endpoint, method, data, { ...headers, 'x-token': token})
  }
}
