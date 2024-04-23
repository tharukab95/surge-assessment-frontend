import axios from "axios";

const axiosPrivate = axios.create({ baseURL: "http://localhost:4000" });

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

      const res = await axios.get("http://localhost:4000/auth/refresh", {
        withCredentials: true,
      });
      // .catch((err) => {
      //   localStorage.removeItem("accessToken");
      //   return Promise.reject(err);
      // });

      let accessToken = res.data.accessToken;

      localStorage.setItem("accessToken", accessToken);
      //   return axios(error.config);
      prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
