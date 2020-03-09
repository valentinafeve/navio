<template lang="html">
<div class="add">
  <div class="card">
    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Jane Doe" v-model="goal_name">
    <div class="inverted_sel">
      <div class="ui toggle checkbox">
        <input type="checkbox" name="public">
        <label>Inverted</label>
      </div>
    </div>
    <div class="button">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="add_goal" type="button" name="button"> Add new goal</button>
    </div>
  </div>
  <div class="goals">
    <GoalCard v-for="goal in goals" :key="goal.goal.name" :name="goal.goal.name"/>
  </div>
</div>
</template>

<script>
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import GoalCard from '../components/Goal_card.vue'

const { Filesystem } = Plugins;

async function fileWrite(text) {
  try {
    await Filesystem.writeFile({
      path: 'data.json',
      data: text,
      directory: FilesystemDirectory.Application,
      encoding: FilesystemEncoding.UTF8
    })
  } catch(e) {
    console.error('Unable to write file', e);
  }
}

async function fileRead() {
  let contents = await Filesystem.readFile({
    path: 'data.json',
    directory: FilesystemDirectory.Application,
    encoding: FilesystemEncoding.UTF8
  });
  return contents;
}

export default {
  components:{
    GoalCard,
  },
  data(){
    return {
      goal_name:"",
      data:"",
      goals: [],
    }
  },
  created(){
    console.log("Add page created")
  },
  mounted(){
    console.log("Add page mounted")
    fileRead().then((contents)=>{
      var to_parse = contents.data;
      var data = JSON.parse(to_parse);
      this.goals = data.goals;
    });
  },
  methods:{
    add_goal(){

      var goal_struct = {
        name: "",
        inverse: false,
        days:[
        ],
      }

      var goal_name = this.goal_name;
      var goal = goal_struct;
      goal.name = goal_name;

      fileRead().then((contents)=>{
        this.goals.push({goal});
        var to_parse = contents.data;
        var data = JSON.parse(to_parse);
        data.goals.push({goal});
        fileWrite(JSON.stringify(data))
      });
    }
  }
}
</script>

<style lang="css" scoped>
.goals{
  display: inline-block;
  margin: 0 auto;
}
.add .card{
  padding-top: 40px;
  padding-bottom: 20px;
  background: #f7f7ff;
}
.add button{
  margin-top: 20px;
}
.add .inverted_sel{
  margin-top: 10px;
  margin-bottom: 10px;
}

.add{
  padding-bottom: 80px;
}

</style>
