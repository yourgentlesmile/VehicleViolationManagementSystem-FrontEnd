<template>
    <div v-bind:class="[{'window-smallsize' : isCollapsed}]">
        <el-row>
            <el-table class="table-data-area" :data="tableData">
                <el-table-column
                    type="index"
                    label="序号"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="violationTime"
                    label="标题"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="detail"
                    label="创建时间"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="violationType"
                    label="创建人" align="center">
                </el-table-column>
                <el-table-column
                    prop="penaltyPoint"
                    label="状态" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <div v-if="isAdmin">
                            <el-button
                                size="mini"
                                @click="handleResponse(scope.$index, scope.row)">
                                回应
                            </el-button>
                        </div>
                        <div v-else>
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">
                                编辑
                            </el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">
                                删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="modifyTempData">
                <el-form-item label="活动名称" >
                    <el-input v-model="modifyTempData.id"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-input v-model="modifyTempData.violationTime"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ElDialog from "element-ui/packages/dialog/src/component";
    export default {
        components: {
            ElDialog
        },
        name: "list-consultation",
        data: function () {
            return {
                tableData:[{violationTime:1}],
                dialogFormVisible:true,
                modifyTempData:{}
            }
        },
        computed: {
            isAdmin() {
                return this.$store.state.isadmin;
            },
            isCollapsed() {
                return !this.$store.state.isCollapse;
            }
        },
        method: {
            handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.modifyTempData = row;
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleResponse(index, row) {

            }
        }
    }
</script>

<style scoped>
    .table-data-area{
        width: 100%;
        text-align: center;
    }
    .window-smallsize{
        width: 1149px;
    }
</style>
