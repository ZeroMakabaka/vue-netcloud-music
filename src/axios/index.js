import axios from "axios";
import store from '@/store/index'

let service = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 3000
})

// 请求拦截器
service.interceptors.request.use((config)=>{
    // 展示loading效果
    store.commit('m_app/showLoading')
    return config;
},(err)=>{
    store.commit('m_app/hideLoading');
    return Promise.reject(err)
})
// 请求响应拦截器
service.interceptors.response.use((response)=>{
    // 隐藏loading效果
    store.commit('m_app/hideLoading')
    console.log('关闭');
    return response
})
export default service