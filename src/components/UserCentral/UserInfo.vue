<template>
    <el-row class="mother-container">
        <el-row style="margin-top: 100px">
            <el-col :span="2" :offset="8" class="element-options">
                昵称：
            </el-col>
            <el-col :span="3">
                <el-input style="width: 150px" v-model="nickname"></el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-col :span="2" :offset="8" class="element-options">
                用户名：
            </el-col>
            <el-col :span="3">
                <el-input style="width: 150px" v-model="username" disabled></el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-col :span="2" :offset="8" class="element-options">
                性别：
            </el-col>
            <el-col :span="4" style="line-height: 40px">
                <el-radio v-model="sex" :label="0" disabled>男</el-radio>
                <el-radio v-model="sex" :label="1" disabled>女</el-radio>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-col :span="3" :offset="8" class="element-options">
                出生日期：
            </el-col>
            <el-col :span="3">
                <el-date-picker
                    v-model="birthDate"
                    type="date"
                    disabled
                    >
                </el-date-picker>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;text-align: center">
            <el-col :span="2" :offset="9" class="element-options">
                <el-button type="primary" @click="saveModify">保存</el-button>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
    import ElInput from "element-ui/packages/input/src/input";
    import ElRadio from "element-ui/packages/radio/src/radio";
    import ElButton from "element-ui/packages/button/src/button";
    import api from "@/util/GlobalApi"
    export default {
        components: {
            ElButton,
            ElRadio,
            ElInput},
        name: "user-info",
        data: function () {
            return {
                value1:null,
                sex: '1',
                nickname: '',
                username: '',
                birthDate: '',
                transferDataAdmin: {},
                transferDataUser: {}

            }
        },
        mounted: function(){
            var admin = this.$store.state.isadmin;
            if(admin){
                this.transferDataAdmin = this.$store.getters.getAdminInformation;
                this.username = this.transferDataAdmin.identifier;
                this.nickname = this.transferDataAdmin.adminName;
                this.sex = this.transferDataAdmin.sex;
                this.birthDate = this.transferDataAdmin.birthDate;
            }else{
                this.transferDataUser = this.$store.getters.getUserInformation;
                this.username = this.transferDataUser.identifier;
                this.nickname = this.transferDataUser.nickName;
                this.sex = this.transferDataUser.sex;
            }
        },
        methods: {
            saveModify() {
                var admin = this.$store.state.isadmin;
                if(admin){
                    this.transferDataAdmin.adminName = this.nickname;
                }else{
                    this.transferDataUser.nickName = this.nickname;
                }
                api.modifyUserOrAdminInfor(this,this.$store.state.isadmin ? this.transferDataAdmin:this.transferDataUser,this.$store.state.isadmin);
            }
        }
    }
</script>

<style scoped>
    .element-options{
        height: 40px;
        line-height: 40px;
    }
    .mother-container{
        padding-top: 100px;
        height: 565px;
        background: url('/static/img/background.jpg');
        background-size: 100% 100%;
    }
</style>
