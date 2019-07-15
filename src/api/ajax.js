import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
axios.interceptors.request.use(function (config) {
    const {method,data} = config;
    if(method.toLowerCase() === 'post' && typeof data === 'object'){
        config.data = qs.stringify(data)
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
  }, function (error) {
    // Do something with response error
    // return Promise.reject(error);
    message.error('请求出错'+ error)
    return new Promise(()=>{
        
    } )
  });




export default axios