import { createApp } from 'vue'
import App from './App.vue'

//引入 piniaStore 和持久化插件 
import piniaStore  from "@/store" 
//引入 element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' 

import Router from '@/router' 
import   '@/router/beforeEach' 

//引入 vite-plugin-svg-icons
import 'virtual:svg-icons-register' 
import SvgIcon from '@/components/SvgIcon/index.vue'// svg component
import * as Icons from  '@element-plus/icons-vue' 

import '@/mock/login'


 
 


const app =createApp(App) 
// 注册svgIcon为全局组件
app.component('svg-icon', SvgIcon)
// 注册全局组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons])
    // console.log(key); 
  }) 

app.use(piniaStore)
app.use(ElementPlus)
app.use(Router)
app.mount('#app')
