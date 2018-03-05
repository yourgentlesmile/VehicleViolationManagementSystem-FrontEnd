<template>
    <div>
        <el-row style="background-color: white">
            <el-col :span="12">
                <el-carousel height="200px" class="main-page-carousel">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3>{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <el-col :span="12">
                <el-col :span="24" class="my-car-text">我的车辆</el-col>
                <el-col class="my-car-content-area">
                    <el-col :span="18" class="my-car-Number">
                        <h2>{{carNumber}}</h2>
                    </el-col>
                    <el-col :span="6">
                        <el-row style="">
                            驾照分数
                        </el-row>
                        <el-row class="my-car-point-value">
                            <h2>9</h2>
                        </el-row>
                    </el-col>
                </el-col>
            </el-col>
        </el-row>
    </div>

</template>

<script>


    import ElCarousel from "element-ui/packages/carousel/src/main";
    import ElCarouselItem from "element-ui/packages/carousel/src/item";

    export default {
        components: {
            ElCarouselItem,
            ElCarousel

        },
        data:function (){
            return {
                carNumber: "123" //后面将会从vuex中取得
            }
        },
        name: "main-page"
    }
</script>

<style scoped>
    .main-page-carousel{
        width: 85%;
        height: 230px;
        text-align: center;
        margin: 20px auto 0 auto;
    }
    /*useless*/
    .el-carousel__item h3{
        color: #475669;
        font-size: 14px;
        line-height: 150px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .el-carousel__indicator{
        background-color: green;
    }

    .my-car-text{
        width: 85%;
        font-family: 微软雅黑;
        font-weight: bolder;
        margin: 20px 0 0 10px;
    }
    .my-car-content-area{
        height:178px;
        width: 95%;
    }
    .my-car-Number{
        line-height: 178px;
        text-align: center;
        height: 178px;
    }
    .my-car-Number h2{
        margin: 0;
    }
    .my-car-point{
        height: 80px;
        line-height: 80px;
    }
    .my-car-point-value{
        border-left: red 2px solid;margin: -10px 0 0 -10px;text-align: center
    }
</style>
