<template>
    <el-row class="mother-container">
        <el-col :span="5" :offset="5">
            <el-card style="width: 600px;height: 340px;" :body-style="{padding:'0px'}">
                <el-row style="border-bottom: 1px gainsboro solid;margin-top: 30px;padding-bottom: 30px;">
                    <el-col :span="12" style="text-align: center">
                        实名认证
                    </el-col>
                    <el-col :span="12" style="text-align: center">
                        <span style="color: #44ACDB;cursor: pointer">实名认证</span>
                    </el-col>
                </el-row>
                <el-row style="border-bottom: 1px gainsboro solid;margin-top: 30px;padding-bottom: 30px;">
                    <el-col :span="12" style="text-align: center">
                        绑定手机号
                    </el-col>
                    <el-col :span="12" style="text-align: center">
                        <span style="color: #44ACDB;cursor: pointer">绑定手机</span>
                    </el-col>
                </el-row>
                <el-row style="border-bottom: 1px gainsboro solid;margin-top: 30px;padding-bottom: 30px;">
                    <el-col :span="12" style="text-align: center">
                        绑定邮箱
                    </el-col>
                    <el-col :span="12" style="text-align: center">
                        <span style="color: #44ACDB;cursor: pointer">绑定邮箱</span>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 30px;padding-bottom: 30px;">
                    <el-col :span="12" style="text-align: center">
                        设置密码
                    </el-col>
                    <el-col :span="12" style="text-align: center">
                        <span style="color: #44ACDB;cursor: pointer">修改密码</span>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-button type="primary" @click="$store.commit('setRole',false);"></el-button>
    </el-row>
</template>

<script>
    import ElCard from "element-ui/packages/card/src/main";
    import ElButton from "element-ui/packages/button/src/button";

    export default {
        components: {
            ElButton,
            ElCard
        },
        name: "account-security"
    }
</script>

<style scoped>
    .mother-container{
        padding-top: 130px;
        height: 565px;
        background: url('/static/img/background.jpg');
        background-size: 100% 100%;
    }
</style>
