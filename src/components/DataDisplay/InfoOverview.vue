<!--
**
* 数据展示
*
* @Author XiongCheng
* @version V1.0
* @Date 2018-05-01 19:28.
*
-->
<template>
    <div v-bind:class="[{'window-smallsize' : isCollapsed}]" id="graph">
        <el-row type="flex" justify="space-around">
            <el-col :span="13">
                <el-card style="width: 100%;height: 340px;" :body-style="{padding:'0px'}">
                    <div id="viomonthly" class="first-row-chart">

                    </div>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card style="width: 100%;height: 340px;" :body-style="{padding:'0px'}">
                    <div id="ratioviotype" class="first-row-chart">

                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row type="flex" justify="space-around" style="margin-top: 10px">
        <el-col :span="8">
            <el-card style="width: 100%;height: 400px;" :body-style="{padding:'0px'}">
                <el-row class="middle-chart-title">
                    实时违章情况
                </el-row>
                <div id="realtimevio" class="first-row-chart"></div>
            </el-card>
        </el-col>
        <el-col :span="7">
            <el-card style="width: 100%;height: 400px;" :body-style="{padding:'0px'}">
                <el-row class="middle-chart-title">
                    违章车辆类型占比
                </el-row>
                <div id="ratioviocartype" class="first-row-chart"></div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card style="width: 100%;height: 400px;" :body-style="{padding:'0px'}">
                <el-row class="middle-chart-title">
                    车辆扣分信息
                </el-row>
                <div id="ratioviopoint" class="first-row-chart"></div>
            </el-card>
        </el-col>
    </el-row>
    </div>
</template>

<script>

    import ElCard from "element-ui/packages/card/src/main";
    import echarts from 'echarts'
    export default {
        components: {
            ElCard
        },
        name: "infooverview",
        data: function () {
             return {
                 viomonthlyChart:null,
                 ratioChart:null
             }
        },
        mounted: function(){
            window.onresize = function () {
                window.viomonthlyChart.resize();
                window.ratioChart.resize();
                window.realtimevioChart.resize();
                window.viocartypeChart.resize();
                window.viopointChart.resize();
            }
            var callback = function(records) {
                //当侧边栏收缩的时候，发出一个window的resize事件，让echart能够重新适应新的div大小
                setTimeout("window.onresize()",400);
            };
            var mo = new MutationObserver(callback);
            var element = document.getElementById('graph');
            var option = {
                'attribute': true,
                'attributeOldValue': true
            };
            mo.observe(element, option);
            this.viomonthlyChartFunction();
            this.ratioVioType();
            this.realTimeVio();
            this.vioPoint();
            this.ratioVioCarType();

        },
        computed:{
            isCollapsed() {
                return !this.$store.state.isCollapse;
            }
        },
        methods:{
            resize(){
                this.viomonthlyChart.resize();
                this.ratioChart.resize();
                this.realtimevioChart.resize();
                this.viocartypeChart.resize();
                this.viopointChart.resize();
            },
            viomonthlyChartFunction(){
                var dom = document.getElementById("viomonthly");
                this.viomonthlyChart = echarts.init(dom);
                var option = {
                    title: {
                        left: 'center',
                        text: '当月每日违章数'
                    },
                    xAxis: {
                        data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                        axisLabel:{
                            interval: 0
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                };
                this.viomonthlyChart.setOption(option);
                window.viomonthlyChart = this.viomonthlyChart;
            },
            ratioVioType(){
                var chartDom = document.getElementById("ratioviotype");
                this.ratioChart = echarts.init(chartDom);
                var option = {
                    title: {
                        text: '违章类型占比',
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: '#000'
                        }
                    },

                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series : [
                        {
                            name:'违章类型',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data:[
                                {value:345, name:'超速违章'},
                                {value:310, name:'超载违章'},
                                {value:274, name:'违规变道违章'},
                                {value:235, name:'乱停车违章'},
                                {value:400, name:'闯红灯违章'}
                            ].sort(function (a, b) { return a.value - b.value; }),
                            roseType: 'radius',
                            label: {
                                normal: {
                                    textStyle: {
                                        color: 'rgba(0, 0, 0, 1)'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: 'rgba(0, 0, 0, 1)'
                                    },
                                    smooth: 0.2,
                                    length: 10,
                                    length2: 20
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#c23531',
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                };
                this.ratioChart.setOption(option);
                window.ratioChart = this.ratioChart;
            },
            realTimeVio(){
                var dom = document.getElementById("realtimevio");
                this.realtimevioChart = echarts.init(dom);

                var date = [];
                var data = [];
                var temps = new Date();
                temps.setMinutes((new Date()).getMinutes() - 10);
                function addData(shift) {
                    var minutes = temps.getMinutes();
                    var now = [temps.getHours(), minutes >= 10 ? minutes : '0' + minutes].join(':');
                    date.push(now);
                    data.push(Math.floor(Math.random() * 30));

                    if (shift) {
                        date.shift();
                        data.shift();
                    }
                    temps.setMinutes(temps.getMinutes() + 1);
                }
                for (var i = 1; i < 10; i++) {
                    addData();
                }

                var option = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            params = params[0];
                            return params.name + ' -> ' + params.value + ' 次';
                        },
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: date,
                        axisLabel:{
                            interval: 0
                        }
                    },
                    yAxis: {
                        boundaryGap: [0, '50%'],
                        type: 'value'
                    },
                    series: [
                        {
                            name:'成交',
                            type:'line',
                            smooth:true,
                            symbol: 'none',
                            stack: 'a',
                            data: data
                        }
                    ]
                };
                var temp = this.realtimevioChart;
                setInterval(function () {
                    addData(true);
                    temp.setOption({
                        xAxis: {
                            data: date
                        },
                        series: [{
                            name:'违章次数',
                            data: data
                        }]
                    });
                }, 2000);
                this.realtimevioChart.setOption(option);
                window.realtimevioChart = this.realtimevioChart;
            },
            ratioVioCarType(){
                var dom = document.getElementById("ratioviocartype");
                this.viocartypeChart = echarts.init(dom);
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['大型汽车','中型汽车','挂车','摩托车','小型汽车']
                    },
                    series: [
                        {
                            name:'车辆类型',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'大型汽车'},
                                {value:310, name:'中型汽车'},
                                {value:234, name:'挂车'},
                                {value:135, name:'摩托车'},
                                {value:1548, name:'小型汽车'}
                            ]
                        }
                    ]
                };
                this.viocartypeChart.setOption(option);
                window.viocartypeChart = this.viocartypeChart;
            },
            vioPoint(){
                var dom = document.getElementById("ratioviopoint");
                this.viopointChart = echarts.init(dom);
                var option = {
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['1分', '2分', '3分', '6分', '12分'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'区间人数',
                            type:'bar',
                            barWidth: '60%',
                            data:[ 400, 290, 250, 140, 100]
                        }
                    ]
                };
                this.viopointChart.setOption(option);
                window.viopointChart = this.viopointChart;
            }

        }
    }

</script>

<style scoped>
    .first-row-chart{
        width: 100%;
        height: 340px
    }
    .middle-chart-title{
        height: 38px;
        line-height: 38px;
        vertical-align: center;
        padding: 0 0 0 10px;
        border-bottom: 1px silver solid;
        font-size: 20px;
        font-stretch: normal;
        font-variant-caps: normal;
        font-variant-numeric: normal;
        font-variant-ligatures: normal;
        font-family: "Microsoft YaHei", Helvetica, Arial, Verdana, sans-serif;
    }
    .window-smallsize{
        width: 1149px;
    }
</style>
