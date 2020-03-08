<template>
  <div id="app">
    <router-view />
    <div class="tabs">
      <a href="#/more">More</a>
      <a href="#/">Home</a>
      <a href="#/add">Add</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
