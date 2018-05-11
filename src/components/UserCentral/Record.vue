<template>
    <div v-bind:class="[{'window-smallsize' : isCollapsed}]">
        <el-row>
            <el-table class="table-data-area" :data="tableData">
                <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                width="100px">
                </el-table-column>
                <el-table-column
                    prop="loginUserIdentifier"
                    label="登录用户名"
                    align="center" width="170%">
                </el-table-column>
                <el-table-column
                    prop="loginIp"
                    label="登录IP"
                    align="center" width="270%">
                </el-table-column>
                <el-table-column
                    prop="loginTime"
                    label="登录时间"
                    align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ new Date(scope.row.loginTime).toLocaleString()}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="data-area-pagination-Controller">
            <el-pagination
                background
                layout="total,prev,pager,next"
                :total="totalData"
                :page-size="8"
                @current-change="pageChange"
            ></el-pagination>
        </el-row>
    </div>
</template>

<script>
    import ElTable from "element-ui/packages/table/src/table";
    import api from "@/util/GlobalApi";
    export default {
        components: {ElTable},
        name: "record",
        data: function () {
            return {
                tableData: [],
                totalData: 0
            };
        },
        methods: {
            pageChange(currentPage){
                api.getRecord(this,currentPage,this.$store.state.isadmin);
            }
        },
        computed:{
            isCollapsed() {
                return !this.$store.state.isCollapse;
            }
        },
        mounted: function () {
            api.getRecord(this,1,this.$store.state.isadmin);
        }
    }
</script>

<style scoped>
    .data-area-pagination-Controller{
        text-align: right;
        padding: 10px 50px 0 0;
    }
    .window-smallsize{
        width: 1149px;
    }
</style>
