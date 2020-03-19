<template>
  <div id="app">
    <div id="header">
      Navio
    </div>
    <div class="container">
      <router-view />
    </div>
    <div class="tabs">
      <div class="buttons">
        <div class="button_tab" @click="go_to('more')">
          <img src="/icons/info.svg" alt="" style="height:30px;">
        </div>
        <div class="button_tab" @click="go_to('/')">
          <img src="/icons/home.svg" alt="" style="height:30px;">
        </div>
        <div class="button_tab" @click="go_to('goals')">
          <img src="/icons/clock.svg" alt="" style="height:30px;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import router from './router'

const { Filesystem } = Plugins;
const { StatusBar } = Plugins;

export default {
  name: 'App',
  components: {
  },
  methods:{
    go_to(to){
      router.push(to);
    }
  },
  created(){
    try {
      StatusBar.setBackgroundColor({color: '#176be8'});
      Filesystem.readFile({
        path: 'goals.json',
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      }).then().catch(()=>{
        Filesystem.writeFile({
          path: 'goals.json',
          data: '[]',
          directory: FilesystemDirectory.Data,
          encoding: FilesystemEncoding.UTF8
        })
      });

    } catch(e) {
      console.error(e);
    }
  },
}
</script>

<style>
body{
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  padding: 0px;
  margin: 0px;
  width: 100%;
  position: relative;
}
#header{
  margin-top: 0px;
  padding-top: 20px;
  top: 0;
  background: rgb(0,102,189);
  color: white;
  background: #176be8;
  width: 100%;
  vertical-align: middle;
  font-size: 26px;
  z-index: 10;
  height: 60px;
}
#header{
  color: white;
}
.container{
  width: 100%;
}
.tabs{
  display: block;
  height: 80px;
  background: #fbfbfb;
  bottom: 0;
  width: inherit;
  position: fixed;
  padding: 0px;
}
.tabs .buttons{
  margin: 0 auto;
  padding: 0px;
}
.tabs .button_tab{
  display: inline-block;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 25px;
  padding-bottom: 10px;
  width: 10%;
}
</style>
