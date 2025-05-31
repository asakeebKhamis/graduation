import axios from "axios";

// Base URL for API
export const BaseUrlApi = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: BaseUrlApi,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Error handler function
export const ErrorMessage = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.data && error.response.data.error) {
      return error.response.data.error;
    }
    if (error.response.data && error.response.data.errors) {
      return error.response.data.errors;
    }
    return "Error";
  } else if (error.request) {
    // The request was made but no response was received
    return "Network error. Please check your connection.";
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message;
  }
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response;
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response;
    } catch (error) {
      throw error;
    }
  },

  checkResetCode: async (email, resetCode) => {
    try {
      const response = await api.post("/auth/check-code", {
        email,
        reset_code: resetCode,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (password, password_confirmation) => {
    try {
      const response = await api.post("/auth/reset-password", {
        password,
        password_confirmation,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  resendCode: async (email) => {
    try {
      const response = await api.post("/auth/resend-code", { email });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getMe: async () => {
    try {
      const response = await api.get("/auth/me");
      return response;
    } catch (error) {
      throw error;
    }
  },
};

// Presentations API
export const presentationAPI = {
  getAll: async () => {
    try {
      const response = await api.get("/presentations");
      return response;
    } catch (error) {
      throw error;
    }
  },

  getTrash: async () => {
    try {
      const response = await api.get("/presentations/trash");
      return response;
    } catch (error) {
      throw error;
    }
  },

  getShared: async () => {
    try {
      const response = await api.get("/presentations/shared");
      return response;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/presentations/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  create: async (presentationData) => {
    try {
      const response = await api.post("/presentations", presentationData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, presentationData) => {
    try {
      const response = await api.put(`/presentations/${id}`, presentationData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateSlides: async (id, slides) => {
    try {
      const response = await api.put(`/presentations/${id}/slides`, slides);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateTheme: async (id, themeName) => {
    try {
      const response = await api.put(`/presentations/${id}/theme`, {
        themeName,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/presentations/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  shared: async (id) => {
    try {
      const response = await api.put(`/presentations/${id}/shared`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  recover: async (id) => {
    try {
      const response = await api.put(`/presentations/${id}/recover`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  permanentDelete: async (id) => {
    try {
      const response = await api.delete(`/presentations/${id}/permanent`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  emptyTrash: async () => {
    try {
      const response = await api.delete("/presentations/trash");
      return response;
    } catch (error) {
      throw error;
    }
  },
};

// AI API
export const aiAPI = {
  generatePrompt: async (prompt) => {
    try {
      const response = await api.post("/ai/generate-prompt", { prompt });
      return response;
    } catch (error) {
      throw error;
    }
  },

  generateLayouts: async (projectId, outlines, themeName) => {
    try {
      const response = await api.post("/ai/generate-layouts", {
        projectId,
        outlines,
        themeName,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getPrompts: async () => {
    try {
      const response = await api.get("/ai/prompts");
      return response;
    } catch (error) {
      throw error;
    }
  },

  savePrompt: async (promptData) => {
    try {
      const response = await api.post("/ai/prompts", promptData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

// Themes API
export const themeAPI = {
  getAll: async () => {
    try {
      const response = await api.get("/themes");
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
