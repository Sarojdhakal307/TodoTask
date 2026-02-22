
import { clearTokens, getTokens, refreshToken } from "@/lib/authLib";
import axios, {
    AxiosError,
    AxiosHeaders,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

api.interceptors.request.use(async (config) => {
  const token = await getTokens();

  if (token?.access) {
    const headers = AxiosHeaders.from(config.headers ?? {});
    headers.set("Authorization", `Bearer ${token.access}`);
    config.headers = headers;
  }


  return config;
});


let isRefreshing = false;

let failedQueue: {
  resolve: (token: string | null) => void;
  reject: (error: AxiosError) => void;
}[] = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve(token);
  });
  failedQueue = [];
};


api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const original = error.config as CustomAxiosRequestConfig;

    if (!original) {
      return Promise.reject(error);
    }


    if (error.response?.status === 401 && !original._retry) {
      // ---- queue while refreshing ----
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              const headers = AxiosHeaders.from(original.headers ?? {});
              if (token) headers.set("Authorization", `Bearer ${token}`);
              original.headers = headers;
              resolve(api(original));
            },
            reject,
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshToken();

        processQueue(null, newAccessToken);

        const headers = AxiosHeaders.from(original.headers ?? {});
        headers.set("Authorization", `Bearer ${newAccessToken}`);
        original.headers = headers;

        return api(original);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        clearTokens();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
