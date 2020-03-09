<template lang="html">
<div class="home">
  <GoalTable v-for="goal in goals" :key="goal.goal.name" :name="goal.goal.name">
  </GoalTable>
</div>
</template>

<script>
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import GoalTable from '../components/Goal_table.vue';

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

const { Filesystem } = Plugins;
export default {
  components:{
    GoalTable,
  },
  data(){
    return{
      goals:[],
    }
  },
  mounted(){
    console.log("mounted")
    fileRead().then((contents)=>{
      var to_parse = contents.data;
      var data = JSON.parse(to_parse);
      console.log("data",data);
      this.goals = data.goals;
      console.log("data.goals",data.goals)
      fileWrite(JSON.stringify(data))
    });
  }
}
</script>

<style lang="css" scoped>

.home{
  padding-top: 40px;
}

</style>
