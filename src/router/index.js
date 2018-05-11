import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import VioInfoQuery from '@/components/ViolatingInfoMgr/QueryPage'
import newvioinfo from '@/components/ViolatingInfoMgr/CreateNewVioInfo'
import modifyvioinfo from '@/components/ViolatingInfoMgr/ModifyVioInfo'
import consultationview from '@/components/Consultation/ListConsultation'
import newbulletin from '@/components/BulletinBoard/NewBulletin'
import modifybulletin from '@/components/BulletinBoard/ModifyBulletin'
import viooverview from '@/components/DataDisplay/InfoOverview'
import userinfo from '@/components/UserCentral/UserInfo'
import avatar from '@/components/UserCentral/Avatar'
import accountsecurity from '@/components/UserCentral/AccountSecurity'
import record from '@/components/UserCentral/Record'
import register from '@/components/Register'
import registercar from '@/components/UserCentral/CarRegister'
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
        },
        {
            path: '/newvioinfo',
            name: 'newvioinfo',
            component: newvioinfo
        },
        {
            path: '/modifyvioinfo',
            name: 'modifyvioinfo',
            component: modifyvioinfo
        },
        {
            path: '/consultationview',
            name: 'consultationview',
            component: consultationview
        },
        {
            path: '/newbulletin',
            name: 'newbulletin',
            component: newbulletin,
            props: (route) => ({mode: route.query.mode})
        },
        {
            path: '/changebulletin',
            name: 'changebulletin',
            component: modifybulletin
        },
        {
            path: '/vioview',
            name: 'vioview',
            component: viooverview
        },
        {
            path: '/setting',
            name: 'userinfo',
            component: userinfo
        },
        {
            path: '/avatar',
            name: 'avatar',
            component: avatar
        },
        {
            path: '/security',
            name: 'security',
            component: accountsecurity
        },
        {
            path: '/record',
            name: 'record',
            component: record
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/registercar',
            name: 'registercar',
            component: registercar
        }
    ]
})
