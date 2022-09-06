import axios from "axios"
import {getToken} from "@/utils/setToken.js"
const service = axios.create({
    baseURL: "/api", //会自动加载请求地址上
    timeout: 3000, 
})

//添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么(获取并设置token)
    //在每次请求之前将token携带上去
    config.headers["token"]=getToken("token")
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
//添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么 
      
     let { status,message }  = response.data;
     if(status !==200){ 
       this.$message({ 
        message: message ||"error", 
        type:'warning'
       })
     }
     return response
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default service