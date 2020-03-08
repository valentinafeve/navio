<template lang="html">
<div class="add">
  <div class="card">
    <input type="text" name="" v-model="goal_name">
    <button @click="add_goal" type="button" name="button"> Add </button>
  </div>
</div>
</template>

<script>
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const { Filesystem } = Plugins;

async function fileWrite(text) {
  try {
    await Filesystem.writeFile({
      path: 'data.json',
      data: text,
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    })
  } catch(e) {
    console.error('Unable to write file', e);
  }
}

async function fileRead() {
  let contents = await Filesystem.readFile({
    path: 'data.json',
    directory: FilesystemDirectory.Documents,
    encoding: FilesystemEncoding.UTF8
  });
  return contents;
}

var goal_struct = {
  name: "",
  inverse: false,
  days:[
  ],
}

export default {
  data(){
    return {
      goal_name:"",
    }
  },
  created(){
    try {
      Filesystem.writeFile({
        path: 'data.json',
        data: 'goals:[]',
        directory: '/home/vale/Git/Navio/navio/',
        encoding: FilesystemEncoding.UTF8
      })
    } catch(e) {
      console.error('Unable to write file', e);
    }
  },
  methods:{
    add_goal(){
      var today = new Date();
      var date_str = today.getUTCDay().toString()+'-'+ today.getUTCMonth().toString()+'-'+today.getUTCFullYear().toString();
      var goal_name = this.goal_name;
      var goal = goal_struct;
      goal.name = goal_name;
      goal.days.push(
        { date: date_str },
        { num : 0},
      )

      console.log(goal);
      var contents = fileRead();
      var goals = JSON.parse(contents);
      goals.push(goal);
      fileWrite(JSON.stringify(goals))
    }
  }
}
</script>

<style lang="css" scoped>

</style>
