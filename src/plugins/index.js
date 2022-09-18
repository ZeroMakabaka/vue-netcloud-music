import { Button,Swipe,SwipeItem,Popup} from 'vant';
// 将引入的组件放入数组中，然后遍历，依次使用
let plugins = [
    Button,Swipe,SwipeItem,Popup
]

export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}