<template lang="html">
<div class="add">
  <div class="card">
    <div v-if="inverted_goal">
      <div class="title">
        I promise not to...
      </div>
      <div class="subcard">
        <input placeholder="smoke" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" v-model="goal_name">
      </div>
      <div class="subcard">
        any <input placeholder="cigarettes" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Jane Doe" v-model="goal_counter">
      </div>
    </div>
    <div v-else>
      <div class="title">
        I promise to...
      </div>
      <div class="subcard">
        <input placeholder="drink" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" v-model="goal_name">
      </div>
      <div class="subcard">
        many <input placeholder="glasses of water" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Jane Doe" v-model="goal_counter">
      </div>
    </div>

    <div class="inverted_sel">
      <div class="ui toggle checkbox">
        <input type="checkbox" name="checkbox" v-model="inverted_goal">
        <label>
          <div v-if="inverted_goal">
            Bad
          </div>
          <div v-else>
            Good
          </div>
        </label>
      </div>
    </div>
    <div class="button">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="add_goal" type="button" name="button"> Add</button>
    </div>
  </div>
  <div class="goals">
    <GoalCard v-for="goal in goals" :key="goal.goal.name" :name="goal.goal.name" :counter="goal.goal.counter"/>
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
      directory: FilesystemDirectory.Data,
      encoding: FilesystemEncoding.UTF8
    })
  } catch(e) {
    console.error('Unable to write file', e);
  }
}

async function fileRead() {
  let contents = await Filesystem.readFile({
    path: 'data.json',
    directory: FilesystemDirectory.Data,
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
      goal_counter:"",
      data:"",
      goals: [],
      inverted_goal: false,
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

      var date = new Date();
      var goal = {
        name: this.goal_name,
        created : date.getDate(),
        counter: this.goal_counter,
        inverse: this.inverted_goal,
        days:[
        ],
      }

      fileRead().then((contents)=>{
        // Add the goal to this list
        this.goals.push({goal});
        var to_parse = contents.data;
        var data = JSON.parse(to_parse);
        // Insert the goal in the persistent list
        data.goals.push({goal});
        // Update persistent list
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
.add .subcard{
  padding-top: 5px;
  padding-bottom: 5px;
}
.add .card .title{
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 5px;
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
