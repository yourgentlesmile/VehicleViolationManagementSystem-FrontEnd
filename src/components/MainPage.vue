<template>
    <div>
        <el-row style="background-color: white">
            <el-col :span="12">
                <el-carousel height="200px" class="main-page-carousel">
                    <el-carousel-item v-for="item in picCollection" :key="item">
                        <img :src="'/static/img/' + item" style="width: 495.55px;height: 200px;">
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <el-col :span="12">
                <el-col :span="24" class="my-car-text">我的车辆</el-col>
                <el-col class="my-car-content-area">
                    <el-col :span="18" class="my-car-Number">
                        <h2>{{carNumbers}}</h2>
                    </el-col>
                    <el-col :span="6">
                        <el-row style="">
                            驾照分数
                        </el-row>
                        <el-row class="my-car-point-value">
                            <h2>12</h2>
                        </el-row>
                    </el-col>
                </el-col>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 0;background: white">
            <el-col :span="8" class="list-panel">
                <new-list :items="bulletinBoards" title="公告板"></new-list>
            </el-col>
            <el-col :span="8" class="list-panel">
                <new-list :items="latestNews" title="最新消息"></new-list>
            </el-col>
            <el-col :span="8" class="list-panel">
                <new-list :items="information" title="信息公告"></new-list>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import ElCarousel from "element-ui/packages/carousel/src/main";
    import ElCarouselItem from "element-ui/packages/carousel/src/item";
    import NewList from "./NewList";
    import api from "../util/GlobalApi"
    import ElButton from "element-ui/packages/button/src/button";
    export default {
        components: {
            ElButton,
            NewList,
            ElCarouselItem,
            ElCarousel

        },
        data:function(){
            return {
                bulletinBoard: null,
                latestNew: null,
                info: null,
                picCollection: ["pic1.jpg","pic2.jpg","pic3.jpg"]
            }
            },
        computed: {
            carNumbers() {
                if(this.$store.state.userInformation == null || this.$store.state.userInformation.carNumber == undefined) {
                    return "";
                }
                return this.$store.state.userInformation.carNumber;
            },
            bulletinBoards() {
                return this.bulletinBoard;
            },
            latestNews() {
                return this.latestNew;
            },
            information() {
                return this.info;
            }
        },
        mounted:function () {
            //this.update();
            api.getBulletinBoards(this,1);
            api.getInformation(this,1);
            api.getLatestNews(this,1);
            console.log(this.bulletinBoard);
        },
        name: "main-page",
        methods: {
        }
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
    .list-panel{
        height: 290px;
        padding-left: 20px;
    }
</style>
