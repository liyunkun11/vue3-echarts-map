import axios from "axios";

// 创建axios实例
const instance = axios.create({
  baseURL: "https://geo.datav.aliyun.com",
  timeout: 0,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => config,
  async (error) => {
    return await Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  async (response) => {
    if (response.status === 200) {
      return await Promise.resolve(response.data);
    } else {
      return await Promise.reject(response.data);
    }
  },
  async (error) => {
    const { response } = error;
    if (response) {
      return await Promise.reject(response);
    }
    return await Promise.reject(error);
  },
);

export default instance;
