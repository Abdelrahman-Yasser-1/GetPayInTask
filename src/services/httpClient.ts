import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { store } from '@src/store';
// import { setAccessToken, setRefreshToken } from '@src/store/slices';
import skip401Urls from './skip401Urls';
import { showToast } from '@src/components/general/Toast/config';
import { ToastTypes } from '@src/components/general/Toast/ToastBase';
import Toast from 'react-native-toast-message';

export const HttpClient = axios.create({
  baseURL: 'https://dummyjson.com',
});

// Request Interceptor
HttpClient.interceptors.request.use(
  config => checkConfig(config) as InternalAxiosRequestConfig,
);

function checkConfig(config: AxiosRequestConfig) {
  const newConfig: AxiosRequestConfig = { ...config };
  const authToken =
    store.getState().encrypted.userState.accessToken &&
    !skip401Urls.some(url => config.url?.includes(url))
      ? {
          Authorization: `Bearer ${
            store.getState().encrypted.userState.accessToken as string
          }`,
        }
      : {};
  newConfig.headers = {
    ...authToken,
  };
  return newConfig;
}

// Response Interceptor
HttpClient.interceptors.response.use(
  async res =>
    // API called successfully
    res,
  async (error: AxiosError) => {
    const statusCode = error.response?.status;
    const errorMsg =
      (error.response?.data as any)?.ErrorMessage || error.response?.data;

    // Handle different status codes
    switch (statusCode) {
      case 400:
        showToast({
          message: errorMsg ?? 'Bad Request.',
          type: ToastTypes.errorToast,
          hideToast: () => Toast.hide(),
        });
        break;

      case 401:
        if (!skip401Urls.some(url => error.config?.url?.includes(url))) {
          try {
            await updateTokens();
            return axios(error.config as AxiosRequestConfig); // Retry the request
          } catch {
            showToast({
              type: ToastTypes.errorToast,
              hideToast: () => Toast.hide(),
              message: errorMsg ?? 'Session expired. Please log in again.',
            });
            // handle logOut logic if required
          }
        }
        break;

      case 403:
        showToast({
          type: ToastTypes.errorToast,
          hideToast: () => Toast.hide(),
          message: errorMsg ?? 'Forbidden: Access denied.',
        });
        break;

      case 404:
        showToast({
          type: ToastTypes.errorToast,
          hideToast: () => Toast.hide(),
          message: errorMsg ?? 'Resource not found.',
        });
        break;

      case 500:
        showToast({
          type: ToastTypes.errorToast,
          hideToast: () => Toast.hide(),
          message: errorMsg ?? 'Internal Server Error. Please try again later.',
        });
        break;

      case 503:
        showToast({
          type: ToastTypes.errorToast,
          hideToast: () => Toast.hide(),
          message: errorMsg ?? 'Service Unavailable. Please try again later.',
        });
        break;

      default:
        if (!statusCode) {
          showToast({
            type: ToastTypes.errorToast,
            hideToast: () => Toast.hide(),
            message: errorMsg ?? 'Network error. Please check your connection.',
          });
        } else {
          showToast({
            type: ToastTypes.errorToast,
            hideToast: () => Toast.hide(),
            message: errorMsg ?? `Unhandled Error (${statusCode}).`,
          });
        }
        break;
    }

    return Promise.reject(error);
  },
);

// Token Refresh Logic
async function updateTokens() {
  // const state = store.getState();
  // const newToken = await AUTH_SERVICES.getRefreshToken({
  //   accessToken: state.encrypted.userState.accessToken as string,
  //   RefreshToken: state.encrypted.userState.refreshToken as string,
  // });
  // store.dispatch(setAccessToken(newToken.Result?.accessToken));
  // store.dispatch(setRefreshToken(newToken.Result?.refreshToken));
}
