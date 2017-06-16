<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import api from '@/services/user'
  export default {
    name: 'app',
    mounted () {
      api.checkLogin()
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }
  #app {

    font-family: '微软雅黑', Helvetica, Arial, sans-serif;
  }
  textarea input button {
    outline:none;
  }
  a {
    text-decoration: none;
  }
</style>
