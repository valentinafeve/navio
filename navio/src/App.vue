<template>
  <div id="app">
    <div id="header">
      Navio
    </div>
    <router-view />
    <div class="tabs">
      <div class="buttons">
        <div class="button_tab" @click="go_to('more')">
          <img src="/icons/info.svg" alt="" style="height:48px;">
        </div>
        <div class="button_tab" @click="go_to('/')">
          <img src="/icons/home.svg" alt="" style="height:48px;">
        </div>
        <div class="button_tab" @click="go_to('add')">
          <img src="/icons/clock.svg" alt="" style="height:48px;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import router from './router'

const { Filesystem } = Plugins;

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

      Filesystem.readFile({
        path: 'data.json',
        directory: FilesystemDirectory.Application,
        encoding: FilesystemEncoding.UTF8
      }).then().catch(()=>{
        console.log("File doesn't exist.")
        Filesystem.writeFile({
          path: 'data.json',
          data: '{"goals":[]}',
          directory: FilesystemDirectory.Application,
          encoding: FilesystemEncoding.UTF8
        })
        console.log("Created.")
      });

    } catch(e) {
      console.error('Unable to write file', e);
    }
  },
}
</script>

<style>
#app {
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 90px;
}
#header{
  position: fixed;
  top: 0;
  background: rgb(0,102,189);
  color: white;
  background: linear-gradient(90deg, rgba(0,102,189,1) 0%, rgba(0,168,255,1) 100%);
  height: 90px;
  width: 100%;
  vertical-align: middle;
  padding-top: 25px;
  font-size: 26px;
  z-index: 30;
}
.tabs{
  display: block;
  width: 100%;
  background: #ffffff;
  bottom: 0;
  position: fixed;
}
.tabs .buttons{
  display: inline-block;
  margin: 0 auto;
}
.tabs .button_tab{
  display: inline-block;
  padding-right: 30px;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 30%;
}
</style>
