import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入自定义插件：获取vant组件
import getVant from './plugins'

// 引入第三方组件库

const app = createApp(App)
/*  
    这里需要注意的是，再使用第三方组件库时，因为这里是按需引入，
    所以每引入一个控件就要通过app.user去添加，
    在实际开发中，针对这些第三方库编写插件实现集中式管理
    import { Button,Swipe } from 'vant';
    app.use(Button)
    app.use(Swipe)
 */

// 调用
getVant(app)
app.use(store)
app.use(router).mount('#app')
