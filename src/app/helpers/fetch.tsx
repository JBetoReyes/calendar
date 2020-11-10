/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type MethodCallType = 'GET' | 'POST' | 'PUT' | 'DELETE';

const baseUrl = process.env.API_APP_URL;

export const appFetch = (
  endpoint: string,
  method: MethodCallType = 'GET',
  data?: any,
  headers: Record<string, string> = {},
) => {
  const url = `${baseUrl}/${endpoint}`;
  if (method === 'GET') {
    return fetch(url, {
      method,
      headers,
    });
  }
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data ? JSON.stringify(data) : null,
  });
};

export const appFetchWithToken = (
  endpoint: string,
  method: MethodCallType = 'GET',
  data?: any,
  headers: Record<string, string> = {},
): Promise<Response> | undefined => {
  const token = localStorage.getItem('token');
  if (token) {
    return appFetch(endpoint, method, data, {...headers, 'x-token': token});
  }
};
