import { loginByPhone } from '@/axios/api/home';
export default {
    namespaced: true,
    state() {
        return {
            isLogin: false,    
            token: ' ',
            userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
        }
    },

    mutations: {
        updateIsLogin(state, value) {
            state.isLogin = value
        },
        updateToken(state,value){
            state.token = value;
            localStorage.setItem('token',state.token);
        },
        updateUserInfo(state,value){
            state.userInfo = value;
            localStorage.setItem('userInfo',JSON.stringify(state.userInfo));
        }
    },

    actions: {
        async getLoginByPhone(context,value){
            let res = await loginByPhone(value)
            console.log(res);
            return res;
        }
    }
}