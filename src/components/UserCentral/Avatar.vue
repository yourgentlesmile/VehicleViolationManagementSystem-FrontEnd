<template>
    <el-row type="flex" justify="space-around" class="mother-container">
        <el-col :span="13">
            <el-row>
                <el-col :span="4" :offset="5">
                    <el-button type="primary" style="margin-left: 100px" @click="toggleShow">修改头像</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" :offset="5">
                    <el-card style="width: 100%;height: 340px;" :body-style="{padding:'0px'}">
                        <my-upload field="avatar"
                                   @crop-success="cropSuccess"
                                   @crop-upload-success="cropUploadSuccess"
                                   @crop-upload-fail="cropUploadFail"
                                   v-model="show"
                                   :width="300"
                                   :height="300"
                                   url="http://localhost:8080/Api/Public/avatar"
                                   img-format="png"
                                   :params="params"
                                   :withCredentials="true"></my-upload>
                        <img :src="imgDataUrl" style="width: 600px;height: 600px">
                    </el-card>
                </el-col>
                <el-col :span="12">

                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    import myUpload from 'vue-image-crop-upload/upload-2.vue';
    import ElButton from "element-ui/packages/button/src/button";
    import api from "@/util/GlobalApi"
    export default {
        components: {
            ElButton,
            myUpload},
        name: "avatar",
        methods: {
            toggleShow() {
                this.show = !this.show;
            },
            /**
             * crop success
             *
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccess(imgDataUrl, field){
                console.log('-------- crop success --------');
                this.imgDataUrl = imgDataUrl;
            },
            /**
             * upload success
             *
             * [param] jsonData   服务器返回数据，已进行json转码
             * [param] field
             */
            cropUploadSuccess(jsonData, field){
                console.log('-------- upload success --------');
                console.log(jsonData);
                if(this,this.$store.state.isadmin){
                    this.$store.state.adminInformation.avatar = jsonData.data;
                }else{
                    this.$store.state.userInformation.avatar = jsonData.data;
                }
                api.modifyUserOrAdminInfor(this,this.$store.state.isadmin ? this.$store.state.adminInformation:this.$store.state.userInformation,this.$store.state.isadmin);
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field){
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            }
        },
        data: function () {
            return {
                show: false,
                // params:{
                //     name:"avatars"
                // },
                imgDataUrl: '' // the datebase64 url of created image
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
</style>
