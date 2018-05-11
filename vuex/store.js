import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        isCollapse: false,
        isadmin: true,
        indexActive: "Main",//左侧菜单焦点位置
        indexOpened: ["Main"], //左侧菜单当前展开位置
        preModifyBulletin: null,
        userInformation: null,
        userPointInformation: null,
        adminInformation: null,
        islogin: false
    },
    mutations: {
        changeIsCollapse (state){
            if(state.isCollapse == false){
                state.isCollapse = true;
            }else{
                state.isCollapse = false;
            }
        },
        setRole(state,isadmin){
            state.isadmin = isadmin;
            sessionStorage.setItem("isadmin",isadmin);
        },
        setAdminInformation(state,data){
            state.adminInformation = data;
            sessionStorage.setItem("adminInformation",JSON.stringify(data));
        },
        setUserInformation(state,data){
            state.userInformation = data;
            sessionStorage.setItem("userInformation",JSON.stringify(data));
        },
        setLoginStatus(state,status){
            state.islogin = status;
            sessionStorage.setItem("islogin",status);
        },
        setPreModifyBulletin(state,data){
            state.preModifyBulletin = data;
            state.preModifyBulletin.title = state.preModifyBulletin.context;
        }
    },
    getters: {
        getAdminInformation: state => {
            if(state.adminInformation == null) {
                state.adminInformation = JSON.parse(sessionStorage.getItem("adminInformation"));
            }
            return state.adminInformation;
        },
        getUserInformation: state => {
            if(state.userInformation == null) {
                state.userInformation = JSON.parse(sessionStorage.getItem("userInformation"));
            }
            return state.userInformation;
        },
        getLoginStatus: state => {
            if(sessionStorage.getItem("islogin") == null){
                state.islogin = false;
                sessionStorage.setItem("islogin",false);
                return false;
            }else {
                state.islogin = (sessionStorage.getItem("islogin") == "true");
                return state.islogin;
            }
        },
        getRole: state => {
            let roleStorage = sessionStorage.getItem("isadmin");
            if(roleStorage == null) {
                sessionStorage.setItem("isadmin",state.isadmin);
                return state.isadmin;
            }else {
                state.isadmin = (sessionStorage.getItem("isadmin") == "true");
                return state.isadmin;
            }
        },
        awakeAll: state => {
            this.default.getters.getAdminInformation;
            this.default.getters.getUserInformation;
            this.default.getters.getLoginStatus;
            this.default.getters.getRole;
        }
    }
})
export default store;
