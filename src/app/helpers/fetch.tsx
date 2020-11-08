export type MethodCallType = 'GET' | 'POST' | 'PUT' | 'DELETE';

const baseUrl = process.env.API_APP_URL;

export const appFetch = (endpoint: string, method: MethodCallType = 'GET', data?: any,) => {
  const url = `${baseUrl}/${endpoint}`;
  if (method === 'GET') {
    fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data ? data : ''),
    });
  }
}
