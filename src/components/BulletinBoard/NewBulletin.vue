<!--
* 新增公告模块，详细修改模块
*
* @Author XiongCheng
* @version V1.0
* @Date 2018-05-01 16:56.
*
-->
<template>
    <div>
        <el-row class="input-bulletin-title">
            <span style="width: 100px">公告标题</span>
                <el-input v-model="bulletinTitle" placeholder="请输入公告标题" style="width: 400px;"></el-input>
        </el-row>
        <el-row class="input-bulletin-type">
            <span style="width: 100px">公告类型</span>
            <el-select v-model="bulletinType" placeholder="请选择">
                <el-option value="1" label="公告板"></el-option>
                <el-option value="2" label="最新消息"></el-option>
                <el-option value="3" label="信息公告"></el-option>
            </el-select>
        </el-row>
        <el-row class="edit-area">
            <quill-editor ref="myTextEditor"
                          :content="content"
                          style="height: 500px">
            </quill-editor>
        </el-row>
        <el-row style="height: 60px;text-align: center">
            <el-button type="primary" size="medium" style="width: 150px;height: 50px" @click="submit">
                提交
            </el-button>
        </el-row>
    </div>
</template>

<script>

    import QuillEditor from "vue-quill-editor/src/editor";
    import ElInput from "element-ui/packages/input/src/input";
    import ElSelect from "element-ui/packages/select/src/select";
    import ElOption from "element-ui/packages/select/src/option";
    import api from "@/util/GlobalApi"
    export default {
        components: {
            ElOption,
            ElSelect,
            ElInput,
            QuillEditor},
        name: "new-bulletin",
        props: ['mode'],
        data: function () {
            return {
                content:"",
                bulletinType:"1",
                bulletinTitle: ""
            }
        },
        mounted: function() {
            var cachedData = this.$store.state.preModifyBulletin;
            if(this.mode == 1 && cachedData != null) {
                this.bulletinType = cachedData.type;
                this.bulletinTitle = cachedData.title;
                this.content =  cachedData.context
            }else {
                //如果从修改模块过来的数据为空，则转换为新增模式
                this.bulletinType = null;
                this.bulletinTitle = null;
                this.content =  null;
                this.mode = 0;
            }
        },
        methods: {
            submit(){
                //mode == 1 修改模式 mode == 0 新增模式
                var o = {};
                o.title = this.bulletinTitle;
                o.type = this.bulletinType;
                o.context = this.$refs.myTextEditor.quill.getText();
                o.publisherId = this.$store.getter.getAdminInformation.id;
                console.log(this.bulletinTitle,this.bulletinType,this.content);
                if(this.bulletinTitle == null||this.bulletinType == null||this.content == null) {
                    this.$notify.error({
                        title: '提交失败',
                        message: '所有项都不允许为空'
                    })
                    return;
                }
                var formatedData = JSON.stringify(o);
                if(this.mode == 1) {
                    api.modifyBulletin(this,formatedData);
                }else {
                    api.addBulletin(this,formatedData);
                }
            }
        }

    }
</script>

<style scoped>
    .input-bulletin-title{
        width: 600px;
        margin: 30px auto 0 auto;
    }
    .input-bulletin-type{
        width: 600px;
        margin: 30px auto 0 auto;
        vertical-align: center;
    }
    .edit-area{
        width: 80%;
        margin: 20px auto 0 auto;
        height: 600px;
    }
</style>
