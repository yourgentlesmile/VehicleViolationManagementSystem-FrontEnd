<template>
    <div style="display: flex;" id="app">
        <nav-left></nav-left>
        <div class="right-main-area">
            <el-row>
                <el-col :span="24">
                    <nav-top></nav-top>
                </el-col>
                <el-col>
                    <router-view/>
                </el-col>
            </el-row>
        </div>
    </div>

</template>

<script>
import NavLeft from "./components/Nav/Nav-Left";
import NavTop from "./components/Nav/Nav-Top";

export default {
    components: {
        NavTop,
        NavLeft},
    name: 'App'
}
</script>

<style>
    /*清除浏览器默认的padding和margin*/
    body{
        margin: 0;
        padding: 0;
        background-color: #2F4050;
    }
    .right-main-area{
        flex: 1;
    }
</style>
