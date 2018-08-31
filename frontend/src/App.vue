<template>
  <div id="app">
    <div class="main">
      <router-view></router-view>
    </div>
    <p>Powered by&nbsp;&nbsp;&nbsp;<a target="_blank" href="https://www.aiyo.tech">AiYo.Tech</a></p>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  #app {
    font-family: '微软雅黑', Helvetica, Arial, sans-serif;
    font-weight: lighter;
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #f7f9ff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .main {
      width: 100%;
      height: calc(100% - 30px);
    }

    &>p {
      height: 30px;
      margin: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999;
      background-color: #f2f2f0;

      a {
        color: #333;
      }
      a:hover {
        color: #41b883;
      }
    }
  }
</style>