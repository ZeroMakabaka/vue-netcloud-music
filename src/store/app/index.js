import axios from "axios"


export default {
    namespaced: true,
    state(){
        return {
            menuList: [],
            isLoading: false,   // 加载标识
        }
    },
    mutations: {
        initMenuList(state,value){
            state.menuList = value;
        },
        showLoading(state){
            state.isLoading = true;
        },
        hideLoading(state){
            state.isLoading = false;
        }
    },
    actions: {
        async getMenuList(context) {
            let {data} = await axios.get('./menu.json');
            console.log('store',data);
            context.commit('initMenuList',data.menuList)
         
        }
    }
}