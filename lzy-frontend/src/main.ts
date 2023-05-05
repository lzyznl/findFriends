import { createApp } from 'vue'
import App from './App.vue'
import { NavBar } from 'vant';
import { Button } from 'vant';
import {Icon,Tabbar, TabbarItem } from "vant";
import * as VueRouter from 'vue-router';
import router from "./config/route"
import { Search ,Toast,Divider,Tag,TreeSelect,Col, Row,Cell, CellGroup,Card,Empty,DatePicker,Stepper,Radio,Uploader} from 'vant';
// import myAxios from '../src/plugin/myAxios'

// myAxios.defaults.withCredentials = true

// const router = VueRouter.createRouter({
//     // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
//     history: VueRouter.createWebHashHistory(),
//     routes, // short for `routes: routes`
// })

const app = createApp(App);
app.use(NavBar)
app.use(Button)
app.use(Icon)
app.use(Tabbar)
app.use(TabbarItem)
app.use(router)
app.use(Search)
app.use(Toast)
app.use(Divider)
app.use(Tag)
app.use(TreeSelect)
app.use(Col)
app.use(Row)
app.use(Cell)
app.use(CellGroup)
app.use(Card)
app.use(Empty)
app.use(DatePicker)
app.use(Stepper)
app.use(Radio)
app.use(Uploader)
app.mount('#app')






