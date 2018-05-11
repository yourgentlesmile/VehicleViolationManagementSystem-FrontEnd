<template>
    <div>
        <el-row class="input-area">
            <el-row style="height:80px;">
                <el-col :span="12" class="container-input">
                    <el-input placeholder="请输入内容" v-model="carNumber" class="input-box">
                        <template slot="prepend">车牌号</template>
                    </el-input>
                </el-col>
                <el-col :span="12" class="container-input">
                    <el-input placeholder="请输入内容" v-model="violationType" class="input-box">
                        <template slot="prepend">违章类型</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row style="height:80px;">
                <el-col :span="12" class="container-input">
                    <el-date-picker class="input-box" style="height: 60px"
                        v-model="violationTime"
                        type="datetime"
                        placeholder="输入违章日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="12" class="container-input">
                    <el-input placeholder="请输入内容" v-model.number="penaltyMoney" class="input-box">
                        <template slot="prepend">罚款金额</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row style="height:80px;">
                <el-col :span="12" class="container-input">
                    <el-input placeholder="请输入内容" :pattern="[0-12]" v-model.number="penaltyPoint" class="input-box">
                        <template slot="prepend">扣分</template>
                    </el-input>
                </el-col>
            </el-row>
            <el-row style="height: 100px; text-align: center">
                <el-input type="textarea" :rows="3" style="width: 800px;" placeholder="输入违章详情" v-model="detail">
                </el-input>
            </el-row>
            <el-row style="height: 60px;text-align: center">
                <el-button type="primary" size="medium" style="width: 150px;height: 50px" @click="submit">
                    提交
                </el-button>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    import ElInput from "element-ui/packages/input/src/input";
    import ElButton from "element-ui/packages/button/src/button";
    import api from "@/util/GlobalApi"
    export default {
        components: {
            ElButton,
            ElInput},
        name: "newvioinfo",
        data: function () {
            return {
                carNumber: '2',
                violationType: '',
                violationTime: '',
                penaltyMoney: 0,
                penaltyPoint: 0,
                detail: ''
            }
        },
        methods:{
            submit(){
                var o = {};
                o.carNumber = this.carNumber;
                o.violationType = this.violationType;
                o.violationTime = this.violationTime;
                o.penaltyMoney = this.penaltyMoney;
                o.penaltyPoint = this.penaltyPoint;
                o.detail = this.detail;
                api.addNewVioInformation(this,JSON.stringify(o));
            }
        }
    }
</script>

<style scoped>
    .input-area{
        margin: 10px 20px 0 20px;
        height: 400px;
    }
    .container-input{
        text-align: center;
        line-height: 80px;
    }
    .input-box{
        width: 300px;
    }

</style>
