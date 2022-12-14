import { Button,Swipe,SwipeItem,Popup,Progress,Search,Field, CellGroup,Picker,Form,Checkbox,Dialog,Loading } from 'vant';
// 将引入的组件放入数组中，然后遍历，依次使用
let plugins = [
    Button,Swipe,SwipeItem,Popup,Progress,Search,Field, CellGroup,Picker,Form,Checkbox,Dialog,Loading 
]

export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}