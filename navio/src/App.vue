<template>
  <div id="app">
    <div id="header">
      Navio
    </div>
    <router-view />
    <div class="tabs">
      <div class="buttons">
        <div class="button_tab" @click="go_to('more')">
          <img src="/icons/info.svg" alt="" style="height:40px;">
        </div>
        <div class="button_tab" @click="go_to('home')">
          <img src="/icons/home.svg" alt="" style="height:40px;">
        </div>
        <div class="button_tab" @click="go_to('goals')">
          <img src="/icons/clock.svg" alt="" style="height:40px;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import router from './router'

const { StatusBar } = Plugins;
const { Filesystem } = Plugins;

StatusBar.setBackgroundColor({options:
{  StatusBarBackgroundColorOptions : {
  color : "#efefef",
  }}
});

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
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      }).then().catch(()=>{
        console.log("File doesn't exist.")
        Filesystem.writeFile({
          path: 'data.json',
          data: '[]',
          directory: FilesystemDirectory.Data,
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
  margin-top: 0px;
  padding: 0px;

  position: relative;
}
#header{
  margin-top: 0px;
  padding-top: 20px;
  top: 0;
  background: rgb(0,102,189);
  color: white;
  background: #fbfbfb;
  height: 80px;
  width: 100%;
  vertical-align: middle;
  font-size: 26px;
  z-index: 10;
}
#header{
  color: #9f9f9f;
}
.tabs{
  display: block;
  width: 100%;
  height: 80px;
  background: #fbfbfb;
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
