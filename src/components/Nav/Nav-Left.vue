<template>
    <div>
        <el-container v-bind:class="[{'nav-minisize' : isCollapsed},'nav-left-header']">
            <el-header style="display: none"></el-header>
            <img class="nav-left-header-avatar" src="../../assets/img/a6.jpg"/>
            <div v-show="!isCollapsed">
                <el-row :span="24" class="profile-name">name</el-row>
                <el-row :span="24" class="profile-dropdown">
                    <el-dropdown>
                       <span class="el-dropdown-link">
                           <span v-if="isAdmin">管理员</span>
                           <span v-else>用户</span>
                           <i class="el-icon-caret-bottom el-icon--right"></i>
                       </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
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
            <el-submenu index="3" v-if="isAdmin">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">公告管理</span>
                    </template>
                <el-menu-item-group>
                    <el-menu-item index="newbulletin">新增公告</el-menu-item>
                    <el-menu-item index="changebulletin">公告修改</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" v-if="isAdmin">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">数据统计</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="viorank">违章排行榜</el-menu-item>
                    <el-menu-item index="vioview">违章情况总览</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5" v-if="isAdmin">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">违章信息管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="newvioinfo">违章信息录入</el-menu-item>
                    <el-menu-item index="changevioinfo">违章信息修改</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">咨询与意见</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="consultationview">查看</el-menu-item>
                    <el-menu-item index="newconsultation">新增</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
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
    </div>
</template>

<script>
    import ElRadioGroup from "element-ui/packages/radio/src/radio-group";
    import ElRadioButton from "element-ui/packages/radio/src/radio-button";
    import ElMenuItem from "element-ui/packages/menu/src/menu-item";
    import ElSubmenu from "element-ui/packages/menu/src/submenu";
    import ElMenuItemGroup from "element-ui/packages/menu/src/menu-item-group";
    import ElMenu from "element-ui/packages/menu/src/menu";
    import ElContainer from "element-ui/packages/container/src/main";
    import ElHeader from "element-ui/packages/header/src/main";
    import ElDropdown from "element-ui/packages/dropdown/src/dropdown";
    import ElDropdownMenu from "element-ui/packages/dropdown/src/dropdown-menu";
    import ElDropdownItem from "element-ui/packages/dropdown/src/dropdown-item";

    export default {
        name:"nav-left",
        components: {
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
            }
        }
    }
</script>

<style scoped>
    .main-nav-left:not(.el-menu--collapse){
        width: 201px;
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
        text-align: center;
        color: #9FA1A5;
        font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;;
        font-size: 13px;
    }
</style>
