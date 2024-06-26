import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosPrivate.interceptors.request.use(
  (config: any) => {
    if (!config.headers["Authorization"]) {
      let accessToken = localStorage.getItem("accessToken");
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
        {
          withCredentials: true,
        }
      );

      let accessToken = res.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;

      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
