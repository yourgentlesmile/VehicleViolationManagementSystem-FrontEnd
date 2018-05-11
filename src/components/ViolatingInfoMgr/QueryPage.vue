<template>
    <div v-bind:class="[{'window-smallsize' : isCollapsed}]">
        <el-row class="query-area">
            <el-select v-model="carNumberQuerySelected" placeholder="请选择" size="mini" @change="selectBtnQuery">
                <el-option
                    v-for="item in carNumberData"
                    :key="item.value"
                    :value="item.value">
                </el-option>
            </el-select>
            <span>或</span>
            <el-select v-model="provinceSelected" placeholder="赣" style="text-align: center;width: 100px" size="mini">
                <el-option v-for="item in provinceData" :key="item.value" :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="markSelected" placeholder="A" style="text-align: center;width: 100px" size="mini">
                <el-option v-for="item in markData" :key="item.value" :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="carNumberInput" placeholder="车牌号后5位" size="mini" style="width: 100px"></el-input>
            <el-input v-model="engineNumberInput" placeholder="发动机号后5位" size="mini" style="width: 150px"></el-input>
            <el-input v-model="identityNumberInput" placeholder="车辆识别号后5位" size="mini" style="width: 150px"></el-input>
            <el-button type="primary" size="mini" class="query-button" @click="queryClick">查询</el-button>
        </el-row>
        <div class="table-area">
            <el-row>
                <el-table class="table-data-area" :data="tableData">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center" width="60%">
                    </el-table-column>
                    <el-table-column
                        prop="violationTime"
                        label="违章时间"
                        align="center" width="200%">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ new Date(scope.row.violationTime).toLocaleString()}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="detail"
                        label="违章详情"
                        align="center">
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
                    <el-table-column
                        prop="isDeleted"
                        label="是否处理" align="center">
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
    </div>
</template>

<script>
    import ElInput from "element-ui/packages/input/src/input";
    import ElButton from "element-ui/packages/button/src/button";
    import ElTable from "element-ui/packages/table/src/table";
    import api from "@/util/GlobalApi";

    export default {
        components: {
            ElTable,
            ElButton,
            ElInput},
        name: "query-page",
        data: function(){
            return {
                carNumberData: [],
                carNumberQuerySelected: '',
                provinceSelected:'',
                provinceData : [
                    {value:'京'},{value:'津'},{value:'沪'},{value:'渝'},{value:'冀'},{value:'豫'},{value:'云'},
                    {value:'辽'},{value:'黑'},{value:'湘'},{value:'皖'},{value:'鲁'},{value:'新'},{value:'苏'},
                    {value:'浙'},{value:'赣'},{value:'鄂'},{value:'桂'},{value:'甘'},{value:'晋'},{value:'蒙'},
                    {value:'陕'},{value:'吉'},{value:'闽'},{value:'贵'},{value:'粤'},{value:'青'},{value:'藏'},
                    {value:'川'},{value:'宁'},{value:'琼'},{value:'使'},{value:'领'}
                    ],
                markSelected: '',
                markData: [
                    {value:'A'},{value:'B'},{value:'C'},{value:'D'},{value:'E'},{value:'F'},
                    {value:'G'},{value:'H'},{value:'I'},{value:'J'},{value:'K'},{value:'L'},
                    {value:'M'},{value:'N'},{value:'O'},{value:'P'},{value:'Q'},{value:'R'},
                    {value:'S'},{value:'T'},{value:'U'},{value:'V'},{value:'W'},{value:'X'},
                    {value:'Y'},{value:'Z'}
                ],
                tableData:[],
                carNumberInput: '',
                engineNumberInput: '',
                identityNumberInput: '',
                totalData: 0

            }
        },
        methods: {
            selectBtnQuery(value) {
                console.log(value);
            },
            queryClick() {
                this.pageChange(1);
            },
            pageChange(currentPage){
                let carNumber = this.provinceSelected + this.markSelected + this.carNumberInput;
                let o = {};
                o.carNumber = carNumber;
                o.engineNumber = this.engineNumberInput;
                o.identityNumber = this.identityNumberInput;
                o.page = currentPage;
                api.getViolationData(this,o,currentPage);
            }
        },
        computed:{
            isCollapsed() {
                return !this.$store.state.isCollapse;
            }
        },
    }
</script>

<style scoped>
    .query-area{
        /*background: pink;*/
        height: 43px;
        margin-top: 15px;
        line-height: 43px;
        padding-left: 10px;
        text-align: center;
    }
    .query-button{
        width: 100px;
        border-radius: 30px;

    }
    .table-area{
        margin: 10px 20px 0 20px;
        height: 497px;
    }
    .table-data-area{
        width: 100%;

    }
    .data-area-pagination-Controller{
        text-align: right;
        padding: 10px 50px 0 0;
    }
    .window-smallsize{
        width: 1149px;
    }
</style>
