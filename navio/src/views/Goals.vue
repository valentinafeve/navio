<template lang="html">
<div class="goals">

<!-- Add goal card -->
  <div class="card">
    <div v-if="inverted_goal">
      <div class="title">I promise not to...</div>
      <div class="subcard">
        <input placeholder="smoke" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="id_goal_name" type="text" v-model="goal_name">
      </div>
      <div class="subcard">
        any <input placeholder="cigarettes" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="id_goal_counter" type="text" value="Jane Doe" v-model="goal_counter">
      </div>
    </div>
    <div v-else>
      <div class="title">I promise to...</div>
      <div class="subcard">
        <input placeholder="drink" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="id_goal_name" type="text" v-model="goal_name">
      </div>
      <div class="subcard">
        many <input placeholder="glasses of water" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="id_goal_counter" type="text" value="Jane Doe" v-model="goal_counter">
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
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="add_goal" type="button" name="button"> Add</button>
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
      goal_name:"",
      goal_counter:"",
      data:"",
      goals: [],
      to_delete: [],
      inverted_goal: false,
      goals_to_delete: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
    }
  },
  computed:{
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghostu"
      };
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
  width: 100%;
  padding-top: 40px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background: #dfe7f2;
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
