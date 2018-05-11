<template>
    <div>
        <el-container v-bind:class="[{'nav-minisize' : isCollapsed},'nav-left-header']">
            <el-header style="display: none"></el-header>
            <img class="nav-left-header-avatar" :src="default_avatar"/>
            <div v-show="!isCollapsed">
                <el-row :span="24" class="profile-name" v-if="isLogin">{{name}}</el-row>
                <el-row :span="24" class="profile-dropdown" v-if="isLogin">
                    <el-dropdown>
                       <span class="el-dropdown-link">
                           <span v-if="isAdmin">管理员</span>
                           <span v-else>用户</span>
                           <i class="el-icon-caret-bottom el-icon--right"></i>
                       </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item ><span @click="logout">退出登录</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-row>
                <el-row :span="24" class="profile-dropdown" v-else>
                    <span style="cursor: pointer" @click="loginDialogVisible = true">登 录</span>
                </el-row>
            </div>
        </el-container>
        <el-menu v-bind:default-active="indexActive" v-bind:default-openeds="indexOpened" class="main-nav-left" :collapse="isCollapsed" v-bind:unique-opened="true"
                 background-color="#2F4050" text-color="#A7B1C2" style="border: none" v-bind:router="true">
            <el-menu-item index="Main">
                <i class="el-icon-setting"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="vioinfoquery">
                <i class="el-icon-setting"></i>
                <span slot="title">违章查询</span>
            </el-menu-item>
            <el-menu-item index="register" v-if="!isLogin">
                <i class="el-icon-setting"></i>
                <span slot="title">注册</span>
            </el-menu-item>
            <el-submenu index="3" v-if="isLogin && isAdmin">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">公告管理</span>
                    </template>
                <el-menu-item-group>
                    <el-menu-item index="newbulletin">新增公告</el-menu-item>
                    <el-menu-item index="changebulletin">公告修改</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" v-if="isLogin && isAdmin">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">数据统计</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="vioview">违章情况总览</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5" v-if="isLogin && isAdmin">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">违章信息管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="newvioinfo">违章信息录入</el-menu-item>
                    <el-menu-item index="modifyvioinfo">违章信息修改</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6" v-if="isLogin">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">咨询与意见</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="consultationview">查看</el-menu-item>
                    <el-menu-item index="newconsultation">新增</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7" v-if="isLogin">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">个人中心</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="setting">我的信息</el-menu-item>
                    <el-menu-item index="avatar">我的头像</el-menu-item>
                    <el-menu-item index="security">账号安全</el-menu-item>
                    <el-menu-item index="record">我的记录</el-menu-item>
                    <el-menu-item index="registercar" v-if="!isAdmin">登记车辆</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <el-dialog
            title="登录"
            :visible.sync="loginDialogVisible"
            width="30%"
            center>
            <el-form label-position="right" label-width="80px" :model="loginForm" ref="ref_loginForm">
                <el-form-item label="用户名">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="登录角色">
                    <el-radio-group v-model="loginForm.userType">
                        <el-radio label="用户"></el-radio>
                        <el-radio label="管理员"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" >
                <el-button type="primary" @click="Login">登 录</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import ElMenuItemGroup from "element-ui/packages/menu/src/menu-item-group";
    import ElDropdownMenu from "element-ui/packages/dropdown/src/dropdown-menu";
    import ElDropdownItem from "element-ui/packages/dropdown/src/dropdown-item";
    import urlCollection from "@/util/RequestUrl";
    import ElRadioButton from "element-ui/packages/radio/src/radio-button";
    import ElRadioGroup from "element-ui/packages/radio/src/radio-group";
    import ElContainer from "element-ui/packages/container/src/main";
    import ElDropdown from "element-ui/packages/dropdown/src/dropdown";
    import ElMenuItem from "element-ui/packages/menu/src/menu-item";
    import ElFormItem from "element-ui/packages/form/src/form-item";
    import ElSubmenu from "element-ui/packages/menu/src/submenu";
    import ElDialog from "element-ui/packages/dialog/src/component";
    import ElHeader from "element-ui/packages/header/src/main";
    import ElButton from "element-ui/packages/button/src/button";
    import ElInput from "element-ui/packages/input/src/input";
    import ElRadio from "element-ui/packages/radio/src/radio";
    import ElMenu from "element-ui/packages/menu/src/menu";
    import ElForm from "element-ui/packages/form/src/form";
    import api from "@/util/GlobalApi"

    export default {
        name:"nav-left",
        components: {
            ElButton,
            ElRadio,
            ElInput,
            ElFormItem,
            ElForm,
            ElDialog,
            ElDropdownItem,
            ElDropdownMenu,
            ElDropdown,
            ElHeader,
            ElContainer,
            ElMenu,
            ElMenuItemGroup,
            ElSubmenu,
            ElMenuItem,
            ElRadioButton,
            ElRadioGroup
        },
        data: function () {
            return {
                loginDialogVisible: false,
                loginForm: {
                    username: '',
                    password: '',
                    userType: ''
                }
            }
        },
        computed: {
            indexActive() {
                return this.$store.state.indexActive;
            },
            indexOpened(){
                return this.$store.state.indexOpened;
            },
            isCollapsed() {
                return this.$store.state.isCollapse;
            },
            isAdmin() {
                return this.$store.state.isadmin;
            },
            isLogin() {
                return this.$store.state.islogin;
            },
            name() {
                if(this.$store.getters.getRole) {
                    return this.$store.state.adminInformation.adminName;
                }else {
                    return this.$store.state.userInformation.userName;
                }
            },
            default_avatar() {
                if(this.$store.state.islogin){
                    if(this.$store.state.isadmin) {
                        return urlCollection.urlPrefix + "/avatar/" + this.$store.state.adminInformation.avatar;
                    }else {
                        return urlCollection.urlPrefix + "/avatar/" + this.$store.state.userInformation.avatar;
                    }
                }else {
                    return "/static/img/akari.jpg";
                }
            }
        },
        methods: {
            Login() {
                var s = this.loginForm;
                s.userType = s.userType == "用户" ? '0' : '1';
                var url = "http://localhost:8080/login?username=" + s.username + "&password=" + s.password + "&userType=" + s.userType;
                var callerContext = this;
                api.requestMethod("POST",url,null,function (respEntity) {
                    if(respEntity.code == "-2") {
                        callerContext.$notify.error({
                            title: '登录信息',
                            message: '登录失败，用户名或密码错误'
                        });
                        return;
                    }
                    if(respEntity.code == "0") {
                        callerContext.$notify({
                            title: '登录信息',
                            message: '登录成功',
                            type: 'success'
                        });
                        callerContext.$store.commit("setLoginStatus",true);
                        if(callerContext.loginForm.userType == "0"){
                            callerContext.$store.commit('setRole',false);
                            callerContext.$store.commit('setUserInformation',respEntity.data);
                        }else {
                            callerContext.$store.commit("setRole",true);
                            callerContext.$store.commit('setAdminInformation',respEntity.data);
                        }
                        callerContext.loginDialogVisible = false;
                    }
                })
                // console.log(JSON.stringify(s));
                // api.login(this,JSON.stringify(s));
            },
            logout() {
                this.$store.commit("setLoginStatus",false);
                this.$store.commit("setAdminInformation",null);
                this.$store.commit("setUserInformation",null);
                this.$store.commit("setRole",null);
                this.loginForm.username = '';
                this.loginForm.password = '';
                this.loginForm.userType = '';
                api.logout(this, null);

            }
        },
        mounted: function () {
            this.$store.getters.awakeAll;
        }
    }
</script>

<style scoped>
    .main-nav-left:not(.el-menu--collapse){
        width: 200px;
        min-height: 400px;
        border: none;
    }
    .nav-left-header{
        background-image: url("../../assets/img/header-profile.png");
        width: 200px;
        height: 155px;
        transition-duration: 0.3s;
        transition-delay: 0s;
    }
    .nav-left-header-avatar{
        width: 40%;
        border-radius: 128px;
        text-align: center;
        margin:10px auto 10px auto;
    }
    .nav-minisize{
        width: 64px;
        height: 53px;
    }
    .profile-name{
        color: #DFE4ED;
        text-align: center;
        font-weight: 600;
        font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;;
    }
    .profile-dropdown{
        margin-top: 8px;
        text-align: center;
        color: #9FA1A5;
        font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;;
        font-size: 13px;
    }
</style>
