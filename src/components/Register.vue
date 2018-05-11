<template>
    <el-row type="flex" justify="space-around" class="mother-container">
        <el-col :span="13">
            <el-row>
                <el-col :span="18" :offset="5">
                    <el-card style="width: 100%;height: 340px;">
                        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="ruleForm2.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="password2">
                                <el-input type="password" v-model="ruleForm2.password2" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm2')" style="margin-left: 90px">注册</el-button>
                                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    import myUpload from 'vue-image-crop-upload/upload-2.vue';
    import ElButton from "element-ui/packages/button/src/button";
    import ElForm from "element-ui/packages/form/src/form";
    import ElFormItem from "element-ui/packages/form/src/form-item";
    import ElInput from "element-ui/packages/input/src/input";
    import api from "@/util/GlobalApi"
    export default {
        components: {
            ElInput,
            ElFormItem,
            ElForm,
            ElButton,
            myUpload},
        name: "register",
        data: function () {
            var checkUsername = (rule, value, callback) => {
                value = value.trim();
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }
                setTimeout(() => {
                    if (value.length < 6 || value.length > 12) {
                        callback(new Error('用户名长度只能在6-12之间'));
                    }else{
                        api.checkUsernameUnique(this,value,callback);
                    }
                }, 500);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('请输入密码'));
                }
                setTimeout(() => {
                    if (value.length < 6 || value.length > 24) {
                        callback(new Error('密码长度只能在6-12之间'));
                    }
                    else {
                        if (this.ruleForm2.checkPass !== '') {
                            this.$refs.ruleForm2.validateField('password2');
                        }
                        callback();
                    }
                }, 500);
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    password: '',
                    password2: '',
                    username: ''
                },
                rules2: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    password2: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    username: [
                        { validator: checkUsername, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
                submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var o = {};
                        o.identifier = this.ruleForm2.username;
                        o.adminPassword = this.ruleForm2.password;
                        api.registe(this,JSON.stringify(o));
                    } else {
                        console.log('表单非法');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }

    }
</script>

<style scoped>
    .mother-container{
        padding-top: 100px;
        height: 565px;
        background: url('/static/img/background.jpg');
        background-size: 100% 100%;
    }
    .demo-ruleForm{
        margin-left: -30px;
    }
</style>
