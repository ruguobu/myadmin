import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import './common/css/reset.css' 
import router from './router'
import store from './store'

import 'element-plus/lib/theme-chalk/index.css';


createApp(App).use(router).use(ElementPlus).use(store).mount('#app')
