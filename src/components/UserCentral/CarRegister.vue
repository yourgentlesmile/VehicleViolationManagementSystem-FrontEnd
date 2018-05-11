<<template>
    <el-row type="flex" justify="space-around" class="mother-container">
        <el-col :span="13">
            <el-row>
                <el-col :span="18" :offset="5">
                    <el-card style="width: 100%;height: 340px;">
                        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="车牌号" prop="carNumber">
                                <el-input v-model="ruleForm2.carNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="车架号" prop="frameNumber">
                                <el-input v-model="ruleForm2.frameNumber" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="发动机号" prop="engineNumber">
                                <el-input v-model="ruleForm2.engineNumber" auto-complete="off"></el-input>
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
            ElButton
            },
        name: "register",
        data: function () {
            var checkCarNumber = (rule, value, callback) => {
                value = value.trim();
                if (!value) {
                    return callback(new Error('车牌号不能为空'));
                }
                setTimeout(() => {
                    var regex = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
                    if (!regex.test(value)) {
                        callback(new Error('车牌号格式不正确'));
                    }else{
                        callback();
                    }
                }, 500);
            };
            var checkFrameNumber = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('车架号不能为空'));
                }
                setTimeout(() => {
                    if (value.length > 5) {
                        callback(new Error('请输入车架号后五位'));
                    }
                    else {
                        callback();
                    }
                }, 500);
            };
            var checkEngineNumber = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('发动机号不能为空'));
                }
                setTimeout(() => {
                    if (value.length > 5) {
                        callback(new Error('请输入发动机号后五位'));
                    } else {
                        callback();
                    }
                }, 500);
            };
            return {
                ruleForm2: {
                    carNumber: '',
                    frameNumber: '',
                    engineNumber: ''
                },
                rules2: {
                    carNumber: [
                        { validator: checkCarNumber, trigger: 'blur' }
                    ],
                    frameNumber: [
                        { validator: checkFrameNumber, trigger: 'blur' }
                    ],
                    engineNumber: [
                        { validator: checkEngineNumber, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var o = {};
                        o.carNumber = this.ruleForm2.carNumber;
                        o.frameNumber = this.ruleForm2.frameNumber;
                        o.engineNumber = this.ruleForm2.engineNumber;
                        api.carRegister(this,$.param(o));
                    } else {
                        this.$notify.error({
                            title: '表单信息',
                            message: '输入内容错误，请检查'
                        })
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
