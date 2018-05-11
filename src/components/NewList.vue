<!-- 小型的消息显示组件 -->
<template>
    <div class="list-panel">
        <el-row>
            <h2>{{title}}</h2>
        </el-row>
        <ul class="list">
            <li v-for="item in items" style="width: 100%">
                <router-link :to="{path: 'main', query: { id : item.id}}" class="content">{{item.context}}</router-link>
                <span style="width: 20%;">{{new Date(item.gmtCreate).toLocaleDateString()}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: "new-list",
        props:['items','title'],
    }
</script>
<style scoped>
    .list-panel{
        min-height: 100px;
    }
    .list{
        width: 100%;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .list a{
        width: 80%;
        display: inline-block;
        text-decoration: none;
        color:black;
    }
    .list a:hover{
        text-decoration: underline;
        cursor: pointer;
    }
    .content{
        max-width: 236px;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }
</style>
