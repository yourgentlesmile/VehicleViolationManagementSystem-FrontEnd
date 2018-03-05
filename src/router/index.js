import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import VioInfoQuery from '@/components/ViolatingInfoQuery/QueryPage'
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
    {
        path: '/main',
        name: 'HelloWorld',
        alias: '/',
        component: MainPage
    },
    {
        path: '/vioinfoquery',
        name:'violatingInformationQuery',
        component: VioInfoQuery
    }
    ]
})
