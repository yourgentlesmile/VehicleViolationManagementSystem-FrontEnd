import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        isCollapse: false,
        isadmin: false,
        indexActive : "Main",//左侧菜单焦点位置
        indexOpened :["Main"]//左侧菜单当前展开位置
    }
})
export default store;
