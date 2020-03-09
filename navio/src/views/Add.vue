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
    <GoalCard v-for="goal in goals" :key="goal.name" :name="goal.name"/>
  </div>
</div>
</template>

<script>
import { Plugins } from '@capacitor/core';
import GoalCard from '../components/Goal_card.vue'

const { Storage } = Plugins;


function saveData(obj){
  Storage.set({
    key: 'data',
    value: JSON.stringify({
      goals: obj,
    })
  });
}

async function getData() {
  const ret = await Storage.get({ key: 'data' });
  const goals = JSON.parse(ret.value);
  return goals;
}

export default {
  components:{
    GoalCard,
  },
  data(){
    return {
      goal_name:"",
      data:"",
      goals: []
    }
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

      var thisa = this;
      var res = getData();
      res.then((data)=>{
        thisa.goals.push(goal);
        data.goals.push(goal);
        saveData(data.goals)
      })

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

</style>
