import axios from 'axios';
axios.defaults.timeout = 60 * 1000; //请求超时时间
axios.defaults.baseURL = "/api";   // 请求默认路径前缀

export default{

    /**
     * get 请求
     * @param url  接口路由
     * @param {AxiosPromise<any>}
     */
    get(url,params,headers){
        let options = {};
        if(params){
            options.params = params;
        }
        if(headers){
            options.headers = headers
        }

        return axios.get(url,options)
    },
    
    /**
     * post 请求
     * @param url 接口路由
     * @param params 接口参数
     * @returns {AxiosPromise<any>}
     * 
     */

     post(url,headers,data){
        
        let options = {};

        if(headers){
            options.headers = headers
        }

        return axios.post(url,data,options);
     }


}



