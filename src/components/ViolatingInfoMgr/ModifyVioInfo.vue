<template>
    <div v-bind:class="[{'window-smallsize' : isCollapsed}]">
        <el-row class="query-area">
            <el-col :span="4" style="text-align: right">
                <span style="display: inline">车牌号:</span>
                <el-input size="small" style="width: 90px"></el-input>
            </el-col>
            <el-col :span="9">
                <span style="display: inline">违章时间:</span>
                <el-date-picker size="small" style="width: 300px" v-model="queryRange"
                                type="daterange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
            </el-col>
            <el-col :span="7">
                <span style="display: inline">违章类型:</span>
                <el-select v-model="selectedVioType" placeholder="请选择">
                    <el-option v-for="item in vioType"
                               :key="item.name"
                               :label="item.name"
                               :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-button type="primary">查询</el-button>
            </el-col>
        </el-row>
        <el-row class="data-area">
            <el-table
                :data="tableData"
                style="width: 100%;height: 452px;">
                <el-table-column
                    type="index"
                    label="序号"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="carNumber"
                    label="违章车牌号"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="violationTime"
                    label="违章时间"
                    align="center" width="180%">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ new Date(scope.row.violationTime).toLocaleString()}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="violationType"
                    label="违章类型" align="center">
                </el-table-column>
                <el-table-column
                    prop="penaltyPoint"
                    label="扣分情况" align="center">
                </el-table-column>
                <el-table-column
                    prop="penaltyMoney"
                    label="罚款金额" align="center">
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
                            @click="handleDelete(scope.$index,tableData,scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <div style="text-align: left">
                        违章详情: <span>{{ props.row.detail }}</span>
                        </div>
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
        <el-dialog title="违章信息" :visible.sync="dialogFormVisible">
            <el-form :model="modifyTempData">
                <el-form-item label="违章车牌号" >
                    <el-input v-model="modifyTempData.carNumber"></el-input>
                </el-form-item>
                <el-form-item label="违章时间">
                    <el-date-picker style="height: 60px"
                                    v-model="modifyTempData.violationTime"
                                    type="datetime"
                                    placeholder="输入违章日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="违章类型:">
                    <el-select v-model="modifyTempData.violationType" placeholder="请选择">
                        <el-option v-for="item in vioType"
                                   :key="item.name"
                                   :label="item.name"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="扣分">
                    <el-input v-model="modifyTempData.penaltyPoint"></el-input>
                </el-form-item>
                <el-form-item label="罚款金额">
                    <el-input v-model="modifyTempData.penaltyMoney"></el-input>
                </el-form-item>
                <el-form-item label="违章详情">
                    <el-input v-model="modifyTempData.detail" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateVioInfo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ElInput from "element-ui/packages/input/src/input";
    import ElOption from "element-ui/packages/select/src/option";
    import ElButton from "element-ui/packages/button/src/button";
    import ElTable from "element-ui/packages/table/src/table";
    import api from "@/util/GlobalApi"
    import ElDialog from "element-ui/packages/dialog/src/component";
    export default {
        components: {
            ElDialog,
            ElTable,
            ElButton,
            ElOption,
            ElInput},
        name: "modify-vio-info",
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
                modifyTempData:{},
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
                this.dialogFormVisible = true;
                this.modifyTempData = row;
                console.log(index, row);
            },
            handleDelete(index, rows,row) {
                console.log(index, row);
                var data = [];
                data.push(row.id);
                api.deleteVioInformation(this,JSON.stringify(data));
                rows.splice(index, 1);

            },
            updateVioInfo(){
                this.dialogFormVisible = false;
                api.modifyVioInformtion(this,JSON.stringify(this.modifyTempData));
            }
        },
        mounted:function () {
            this.dialogFormVisible = false;
            api.adminGetViolatinData(this,1);
        }
    }
</script>

<style scoped>
    .query-area{
        margin: 0 20px 0 20px;
        height: 50px;
        /*background: pink;*/
        text-align: center;
        line-height: 50px;
    }
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
