<template>
    <div class="nav-top">
        <el-button v-on:click="changeMenu" size="mini" class="nav-btn-control"><span class="el-icon-tickets nav-btn-icon"></span></el-button>
        <el-row class="nav-top-right">
            <el-col :span="16">
                <span class="nav-top-welcome">欢迎使用车辆违章管理系统</span>
            </el-col>
            <el-col :span="4">
                <el-button class="nav-btn-notify">
                    <el-badge :value="5" :max="10" >
                        <span class="el-icon-bell"></span>
                    </el-badge>
                </el-button>
            </el-col>
            <el-col :span="4">
                <el-button class="nav-btn-notify">
                    <el-badge :value="8" :max="10" >
                        <span class="el-icon-message"></span>
                    </el-badge>
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import ElButton from "element-ui/packages/button/src/button";
    import ElBadge from "element-ui/packages/badge/src/main";

    export default {
        components: {
            ElBadge,
            ElButton},
        name: "nav-top",
        data:function(){
            return {
                MenuStatus : false
            };
        },
        methods:{
          changeMenu: function () {
              console.log(typeof this.MenuStatus);
              console.log(this.$store.state.isCollapse);
              if(this.MenuStatus){
                  this.$store.state.isCollapse = false;
                  this.MenuStatus = false;
              }else{
                  this.$store.state.isCollapse = true;
                  this.MenuStatus = true;
              }
          }
        }
    }
</script>

<style scoped>
    .nav-top{
        background: #F3F3F4;
        width: 100%;
        height: 53px;
        line-height: 53px;
        border-bottom: 1px #E7EAEC solid;
    }
    .nav-top button{
        border: none;
    }
    .nav-btn-control{
        margin-left: 20px;
        background: #409EFF;
        border: none;
    }
    .nav-btn-icon{
        font-size: 20px;
        color: white;
    }
    .nav-top-right{
        margin: 0 50px 0 0;
        padding: 0;
        width:400px;
        height:53px;
        float: right;
    }
    .nav-top-welcome{
        font-size: 16px;
        color: #888888;
        font-family: sans-serif;
        font-weight: bold;
    }
    .nav-btn-notify{
        height: 53px;
        width: 100%;
        background: transparent;
        font-size: 20px;
    }
</style>
