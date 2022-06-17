const BASE_URL = 'https://mockend.com/nillion/frontend-challenge/';

const EndPoints = {
  JOBS: 'jobs',
  ANNOUNCEMENTS: 'announcements',
  RESOURCES: 'resources',
};

export type MyResponse = {
  success: boolean;
  data: any;
  message: string;
};

export type MyError = {
  status: string;
  message: string;
  error: any;
};

export type Get = (endPoint: string, params?: any) => Promise<MyResponse>;

const getUrl = (url: string, data?: Record<string, string>) => {
  if (!data) return `${BASE_URL}${url}`;

  const search = Object.entries(data)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');
  return `${BASE_URL}${url}${search.length === 0 ? '' : `?${search}`}`;
};

/**
 * post method
 * @returns Promise
 *
 * ```javascript
 * eg:
 *
 * try {
 *  const response = get('http://localhost:8000/post/user');
 * } catch (error: MyError) {
 *    // handle error
 * }
 * ```
 */
const get: Get = async (url, params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fetchUrl = getUrl(url, params);
      const response = await fetch(fetchUrl, {
        method: 'GET',
      }).then((res) => res.json());
      resolve(response);
    } catch (error) {
      const err = processError(error);
      reject(err);
    }
  });
};

/**
 * process the error
 * @param error Error
 * @returns MyError
 */
export const processError = (error: any) => {
  const status = error.status;
  const message = error.message;
  return { status, message, error: JSON.stringify(error) };
};

export const Api = {
  get,
  EndPoints,
};
