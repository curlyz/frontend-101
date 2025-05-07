import axios from "axios";
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
// Remove old context import
// import { useSessionToken } from './contexts/session-context'
// Import the provider helper
// import { getKeycloakInstance } from "@/services/keycloak-provider";
import consola from "consola"; // Add consola for logging

// Placeholder: Assume Supabase client is exported from here.
// You might need to adjust this import path based on your project structure.
// import { supabase } from '@/lib/supabase/client'; // TODO: Verify this import path

/**
 * Subset of AxiosRequestConfig
 */
export type RequestConfig<TData = unknown> = {
  url?: string;
  method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE" | "OPTIONS";
  params?: unknown;
  data?: TData | FormData;
  responseType?:
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream";
  signal?: AbortSignal;
  headers?: AxiosRequestConfig["headers"];
};
/**
 * Subset of AxiosResponse
 */
export type ResponseConfig<TData = unknown> = {
  data: TData;
  status: number;
  statusText: string;
  headers?: AxiosResponse["headers"];
};

export type ResponseErrorConfig<TError = unknown> = {
  error: TError;
  status: number;
  statusText: string;
  headers?: AxiosResponse["headers"];
};

const logger = consola.withTag("AxiosClient"); // Create logger instance

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL, // Ensure this env var is set, or use a default
});

// --- Remove Token Refresh Queue Logic ---
// let isRefreshing = false
// let failedQueue: {
//   resolve: (value: AxiosResponse<any, any> | PromiseLike<AxiosResponse<any, any>>) => void // Explicitly type resolve
//   reject: (reason?: any) => void
//   config: AxiosRequestConfig
// }[] = []
// const processQueue = (error: Error | null, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error)
//     } else {
//       // Add the new token to the queued request's config
//       if (token && prom.config.headers) {
//         prom.config.headers['Authorization'] = 'Bearer ' + token
//       }
//       // Retry the request and resolve the queue promise with the result
//       prom.resolve(axiosInstance(prom.config))
//     }
//   })
//   failedQueue = []
// }
// --- End Remove Token Refresh Queue Logic ---

// Add Axios request interceptor to inject Supabase token
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Skip auth for specific headers if needed (e.g., public endpoints)
    // ONLY allow skipping in development environment
    if (
      config.headers?.["X-Skip-Auth"] &&
      process.env.NODE_ENV === "development"
    ) {
      logger.debug(
        "Skipping auth in DEVELOPMENT for request with X-Skip-Auth header:",
        config.url,
      );
      delete config.headers["X-Skip-Auth"];
      return config;
    } else if (config.headers?.["X-Skip-Auth"]) {
      logger.warn(
        "X-Skip-Auth header found outside development environment. Header ignored. Proceeding with authentication for:",
        config.url,
      );
      delete config.headers["X-Skip-Auth"];
    }

    return config;
  },
  (error: AxiosError) => {
    logger.error("Error in request interceptor setup:", error);
    return Promise.reject(error);
  },
);

// Add response interceptor for handling 401s that might slip through
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response, // Pass through successful responses
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Check for 401 Unauthorized and avoid infinite loops
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !(originalRequest as any)._retry
    ) {
      logger.warn(
        "Received 401 Unauthorized. Potentially stale Supabase token. Attempting to refresh session...",
      );
      (originalRequest as any)._retry = true; // Mark as retried
    }
    // For non-401 errors or if retry failed, reject the promise
    return Promise.reject(error);
  },
);

// Will be used by kubb.config.ts
export const client = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData>> => {
  // Remove console log
  // console.log(`axios/client`, config)
  const promise = axiosInstance
    .request<TVariables, ResponseConfig<TData>>({ ...config })
    .catch((e: AxiosError<TError>) => {
      // Log the error before throwing
      logger.error(`API Request Failed [${config.method} ${config.url}]:`, {
        status: e.response?.status,
        statusText: e.response?.statusText,
        data: e.response?.data,
        message: e.message,
      });
      throw e;
    });

  return promise;
};

export default client;
