<!--
* 修改模块
*
* @Author XiongCheng
* @version V1.0
* @Date 2018-05-01 16:56.
*
-->
<template>
    <div v-bind:class="[{'window-smallsize' : isCollapsed}]">
        <el-row class="data-area">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="序号"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="公告标题"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.context.substring(0,15) + "..."}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="公告类型"
                    align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">
                            编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click.native.prevent="handleDelete(scope.$index, tableData,scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="data-area-pagination-Controller">
            <el-pagination
                background
                layout="prev,pager,next"
                :total="totalPageNum"
                :page-size="8"
            ></el-pagination>
        </el-row>
    </div>
</template>

<script>
    import ElOption from "element-ui/packages/select/src/option";
    import ElButton from "element-ui/packages/button/src/button";
    import ElDialog from "element-ui/packages/dialog/src/component";
    import ElInput from "element-ui/packages/input/src/input";
    import ElTable from "element-ui/packages/table/src/table";
    import api from "@/util/GlobalApi"
    export default {
        components: {
            ElDialog,
            ElTable,
            ElButton,
            ElOption,
            ElInput},
        name: "modify-bulletin",
        data:function () {
            return {
                queryRange:[],
                vioType:[
                    {
                        name:'超速',
                        value:1
                    },
                    {
                        name:'违章停车',
                        value:2
                    }
                ],
                selectedVioType:null,
                tableData:null,
                totalPageNum:0,
                dialogFormVisible:false
            }
        },
        computed:{
            isCollapsed() {
                return !this.$store.state.isCollapse;
            }
        },
        methods: {
            handleEdit(index, row) {
                this.$store.commit("setPreModifyBulletin",row);
                this.$router.push("/NewBulletin?mode=1");
            },
            handleDelete(index, rows,row) {
                console.log(row);
                var data = [];
                data.push(row.id);

                api.deleteBulletin(this,JSON.stringify(data));
                rows.splice(index, 1);
            }
        },
        mounted:function () {
            this.$store.state.preModifyBulletin = null;
            api.getAllBulletin(this,1);
        }
    }
</script>

<style scoped>
    .data-area{
        margin: 12px 20px 0 20px;
        border-bottom: darkgrey solid 1px;
        /*background: pink;*/
        text-align: center;
    }
    .data-area-pagination-Controller{
        text-align: right;
        padding: 20px 50px 0 0;
    }
    .window-smallsize{
        width: 1149px;
    }
</style>
