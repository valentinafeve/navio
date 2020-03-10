<template lang="html">
<div class="goals">
  <div
  class="hidden_buttons"
  @dragover.prevent
  @drop.prevent="drop"
  >
  <button type="button" name="button">
    <img src="/icons/bin.svg" alt="" style="height: 42px;">
  </button>
  </div>
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
    <div
    id="hidden_buttons"
    class="button"
    >
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="add_goal" type="button" name="button"> Add</button>
    </div>
  </div>
  <div
  class="board"
  >
    <GoalCard v-for="goal in goals" :key="goal.id" :id="goal.id" :name="goal.name" :counter="goal.counter"/>
  </div>
</div>
</template>

<script>
import GoalCard from '../components/Goal_card.vue'
import { goalsUtils } from "@/scripts/goals_utils";

export default {
  components:{
    GoalCard,
  },
  mixins: [
    goalsUtils
  ],
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
    var thisa = this;
    this.getGoals().then((goals)=>{
      thisa.goals = goals;
    });
  },
  methods:{
    add_goal(){

      var date = new Date();
      var goal = {
        id: this.generateId(),
        name: this.goal_name,
        created : date.getDate(),
        counter: this.goal_counter,
        inverse: this.inverted_goal,
        days:[
        ],
      }
      var thisa = this;
      this.addGoal(goal).then(()=>{
        this.getGoals().then((goals)=>{
          thisa.goals = goals;
        });
      });
    },
    drop(e){
      const goal_id = e.dataTransfer.getData('goal_id');
      var thisa = this;
      this.deleteGoal(goal_id).then(()=>{
        this.getGoals().then((goals)=>{
          thisa.goals = goals;
        });
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
.goals .card{
  padding-top: 40px;
  padding-bottom: 20px;
  background: #f7f7ff;
}
.goals .subcard{
  padding-top: 5px;
  padding-bottom: 5px;
}
.goals .card .title{
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 5px;
}
.goals button{
  margin-top: 20px;
}
.goals .inverted_sel{
  margin-top: 10px;
  margin-bottom: 10px;
}

.goals{
  padding-bottom: 80px;
}

.goals .hidden_buttons {
  position: fixed;
  bottom: 120px;
  left: 47%;
  z-index: 90;
}

</style>
