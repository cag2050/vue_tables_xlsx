<template>
  <div id="app"><br/>
  路由列表：<br/>
  <router-link to='/'> 导出.xlsx（vue-data-tables结合js-xlsx实现导出.xlsx文件）</router-link><br/>
  <router-link to='/writexlsx'> writexlsx（官方例子改造：https://github.com/SheetJS/js-xlsx/tree/master/demos/vue）</router-link><br/>
  <router-link to='/csv'> 导出.csv（官方例子：https://njleonzhang.github.io/vue-data-tables/#/event?id=filtered-data）</router-link><br/>
  <router-link to='/hello'>hello页面</router-link><br/>
  <div>============以下是内容=============</div>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
