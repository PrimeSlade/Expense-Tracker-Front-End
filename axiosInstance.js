import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
});

//same as middleware
export const setupInterceptors = (dispatch) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");

        setTimeout(() => {
          dispatch({ type: "LOGOUT" });
          localStorage.removeItem("user");
        }, 3000);
      }

      // Reject the promise to propagate the error
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
