//定义一些路由
import BasicLayout from "../Layouts/basicLayout.vue";

import index from "../page/index.vue";
import team from "../page/team.vue";
import userPage from "../page/userPage.vue";
import SearchPage from "../page/SearchPage.vue";
import userEditPage from "../page/userEditPage.vue"
import SearchResultPage from "../page/SearchResultPage.vue"
import userLoginPage from "../page/userLoginPage.vue"
import addTeamPage from "../page/addTeamPage.vue"
import updateTeamPage from "../page/updateTeamPage.vue"
import user from "../page/user.vue"
import UserCreateTeam from "../page/UserCreateTeam.vue"
import UserJoinTeam from "../page/UserJoinTeam.vue"
import UserMoreInfo from '../components/componentMoreUserInfo.vue'
import ComponetRecomentUserInfo from '../components/ComponetRecomentUserInfo.vue'
import ChatRoom from '../page/PageChatRoom.vue'
import Friends from '../page/PageFriends.vue'
import ComponentUserTeams from '../components/ComponentUserTeams.vue'
import ComponentTeamDetails from '../components/ComponentTeamDetails.vue'
import ComponentEditGender from '../components/ComponentEditGender.vue'
import { createRouter, createWebHashHistory } from "vue-router";
// import * as VueRouter from 'vue-router';
import * as VueRouter from "vue-router";
const routes = [
    
    { path: '/',component: userLoginPage},
    {
        path: '/home',
        component: BasicLayout,
        children:[
            { path: '', component: index, redirect:'/home/index',meta: {title: '首页'}},
            { path: 'index', component: index, meta: {title: '首页'}},
            { path: 'team', component: team, meta: {title: '队伍'} },
            { path: 'chat', component: ChatRoom, meta: {title: '聊天室'}},
            { path: 'friend/chat', component: ChatRoom, meta: {title: '好友聊天 '}},
            { path: 'friends', component:Friends, meta: {title: '好友'} },
            { path: 'userPage',component: userPage, meta: {title: '个人界面'}},
            { path: 'SearchPage',component: SearchPage, meta: {title: '搜索'}},
            { path: 'user/edit',component: userEditPage, meta: {title: '编辑'}},
            { path: 'user/editGender', component: ComponentEditGender , meta: {title: '编辑'}},
            { path: 'user/search',component: SearchResultPage, meta: {title: '搜索'}},
            { path: 'team/add',component: addTeamPage, meta: {title: '添加队伍'}},
            { path: 'team/update',component: updateTeamPage, meta: {title: '更新队伍'}},
            { path: 'team/details', component: ComponentTeamDetails, meta: {title: '队伍详情'}},
            { path: 'user',component: user, meta: {title: '个人界面'}},
            { path: 'user/list/my/create',component: UserCreateTeam, meta: {title: '我创建的'}},
            { path: 'user/list/my/join',component: UserJoinTeam, meta: {title: '我加入的'}},
            { path: 'user/more', component: UserMoreInfo, meta: {title: '详细信息'}},
            { path: 'index/user', component: ComponetRecomentUserInfo, meta: {title: '详情'}},
            { path: 'user/list/teams', component: ComponentUserTeams , meta: {title: '他的队伍'}}
        ]
    }
    
]
const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})




export default router