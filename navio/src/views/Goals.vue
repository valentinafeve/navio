<template lang="html">
<div class="goals">

<!-- Add goal card -->
  <div class="card">
    <div v-if="inverted_goal">
      <div class="title">I promise not to...</div>
      <div class="subcard">
        <input placeholder="smoke" id="id_goal_name" type="text" v-model="goal_name" @input="validateNewGoalInput" maxlength="30">
      </div>
      <div class="subcard">
        any <input placeholder="cigarettes" id="id_goal_counter" type="text" value="Jane Doe" v-model="goal_counter" @input="validateNewGoalInput" maxlength="30">
      </div>
    </div>
    <div v-else>
      <div class="title">I promise to...</div>
      <div class="subcard">
        <input placeholder="drink" id="id_goal_name" type="text" v-model="goal_name" @input="validateNewGoalInput">
      </div>
      <div class="subcard">
        many <input placeholder="glasses of water" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="id_goal_counter" type="text" value="Jane Doe" v-model="goal_counter" @input="validateNewGoalInput">
      </div>
    </div>

    <div class="inverted_sel">
      <div class="ui toggle checkbox" draggable="true">
        <input type="checkbox" name="checkbox" v-model="inverted_goal">
        <label>
          <div v-if="inverted_goal">Bad</div>
          <div v-else>Good</div>
        </label>
      </div>
    </div>
    <div
    class="button"
    >
      <button class="button" :class="{disabled: disableSubmit}" :disabled="disableSubmit" @click="add_goal" type="button" name="button"> Add</button>
    </div>
  </div>
<!-- End add goal card -->

<!-- Board of goals -->
  <div class="board">
      <GoalCard v-for="goal in goals" :key="goal.id" :id="goal.id" :name="goal.name" :counter="goal.counter"/>
  </div>
  <!-- End board of goals -->

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
      cont : 0,
      goal_name:"",
      goal_counter:"",
      data:"",
      goals: [],
      to_delete: [],
      inverted_goal: false,
      goals_to_delete: [],
      disableSubmit: true,
      lastValidGC: '',
      lastValidGN: '',
    }
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
        name: this.goal_name.toLowerCase(),
        counter: this.goal_counter.toLowerCase(),
        created : date.getDate(),
        inverse: this.inverted_goal,
        days:[
        ],
      }
      var thisa = this;
      this.goal_name = '';
      this.goal_counter = '';
      this.disableSubmit = true;
      this.lastValid = '';
      this.addGoal(goal).then(()=>{
        this.getGoals().then((goals)=>{
          thisa.goals = goals;
        });
      });
    },
    validateNewGoalInput(){
      this.cont = this.cont +1;
      const reg = /^((([a-zA-Z])([\s]?)){1,30})$/
      var nameisValid = false;
      var counterisValid = false;
      console.log('Regex result counter',reg.test( this.goal_counter))
      if (reg.test( this.goal_counter) && !this.goal_counter.endsWith('.')){
        this.lastValidGC = this.goal_counter;
        counterisValid = true;
      }
      else{
        if (this.goal_counter.length > 0 ){
          this.goal_counter = this.lastValidGC
        }
        else{
          this.lastValidGC = '';
          this.disableSubmit = true;
        }
      }
      console.log('Regex result name',reg.test( this.goal_name))
      if (reg.test( this.goal_name) && !this.goal_name.endsWith('.')){
        this.lastValidGN = this.goal_name;
        nameisValid = true;
      }
      else{
        if (this.goal_name.length > 0 ){
          this.goal_name = this.lastValidGN
        }
        else{
          this.lastValidGN = '';
          this.disableSubmit = true;
        }
      }
      if (nameisValid && counterisValid){
        this.disableSubmit = false;
      }
     },
  }
}
</script>

<style lang="css" scoped>
.goals{
  display: inline-block;
  margin: 0px;
  padding: 0px;
  width: 100%;
  position: relative;
}
.goals .card{
  padding-top: 40px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
  background: #f0f5fc;
}
.goals input{
  text-transform: lowercase;
  width: 60%;
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
.ghost {
  /* display: none; */
  position: absolute;
  top: 0;
  height: 60px;
  width: 60px;
  margin: 0px;
  padding: 0px;
}
</style>
