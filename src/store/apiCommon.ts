import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { hideLoader, showLoader } from './loader.slice';
import { message } from 'antd';

interface ErrorData {
  errorMessage: string;
}

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any = {}) => {
  const baseUrl = 'https://silky-wakeful-fifth.glitch.me';
  const dynamicBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  });
  api.dispatch(showLoader());
  let result;

  try {
    result = await dynamicBaseQuery(args, api, extraOptions);

    if (result.error) {
      const { status, data } = result.error as {
        status: number | string;
        data: ErrorData;
      };

      switch (status) {
        case 'FETCH_ERROR':
          console.error('FETCH_ERROR occurred:', result.error);
          message.error('Network error. Please check your connection.');
          break;
        case 401:
        case 403:
          message.error('Session expired. Redirecting to login...');
          //handleLogout(); /**TO DO - Im using simple authentication machnism i will do this later */
          break;
        case 409:
          message.warning(data?.errorMessage || 'Conflict occurred.');
          break;
        default:
          console.error('Unexpected error:', result.error);
          message.error(data?.errorMessage || 'Something went wrong.');
          break;
      }

      throw data;
    }

    return result;
  } catch (err) {
    console.error('Request failed:', err);
    throw err;
  } finally {
    api.dispatch(hideLoader());
  }
};
