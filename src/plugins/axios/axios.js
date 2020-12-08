import axios from 'axios';

//请求拦截
axios.interceptors.request.use(

    config => {
        // 1. 这个位置就请求前最后的配置
        // 2. 当然你也可以在这个位置 加入你的后端需要的用户授权信息
        return config;
      },
      error => {
        return Promise.reject(error);
      }
)


