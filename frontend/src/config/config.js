import Cookies from "js-cookie";

export const config = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  APP_VERSION: import.meta.env.VITE_APP_VERSION,

  API_URL: import.meta.env.VITE_API_URL,
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL,

  NODE_ENV: import.meta.env.VITE_NODE_ENV,

  PAGE_LIMIT: Number(import.meta.env.VITE_PAGE_LIMIT),

  DEBUG: import.meta.env.VITE_DEBUG === "true",
};

// Dont need to set Content-Type manually axios automaticaly handle headers content type
export const api = api.create({
  baseURL: config?.API_URL,
});

// Interceptors in axios is a middleware,
// api.interceptors.request.use() runs before calling API
// api.interceptors.response.use() runs after calling API

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
