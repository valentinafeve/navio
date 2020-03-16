<template lang="html">
<div class="goals">

  <!-- Delete draggable -->
  <div class="delete_panel" @change="onChange">
    <div class="relative">
      {{ isDragging }}
      <div class="visible">
        <img src="icons/bin.svg" alt="" style="height:32px">
      </div>
      <div class="nonvisible">
        <draggable ghost-class="ghost" element="span" v-model="goals_to_delete" v-bind="dragOptions" :move="onMove" @drop="onDrop" @start="isDragging=true" @end="isDragging=false">
          <GoalCard v-for="goal in goals_to_delete" :key="goal.id">
            {{ goal.name }}
          </GoalCard>
        </draggable>
        <div class="col-md-3">
        </div>
      </div>
    </div>
  </div>
  <!-- End delete draggable -->

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
    <div class="col-md-3">
      <draggable tag="div" v-model="goals" v-bind="dragOptions">
        <GoalCard v-for="goal in goals" :key="goal.id" :name="goal.name" :counter="goal.counter"/>
      </draggable>
    </div>
  </div>
  <!-- End board of goals -->

</div>
</template>

<script>
import GoalCard from '../components/Goal_card.vue'
import { goalsUtils } from "@/scripts/goals_utils";
import draggable from "vuedraggable";

export default {
  components:{
    GoalCard,
    draggable,
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
    onMove({ relatedContext, draggedContext }) {
      console.log("Moving")
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      console.log(relatedElement);
      console.log(draggedElement);
      // return (
      //   (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      // );
    },
    onChange(){
      console.log("change")
      var goal = this.goals_to_delete.pop();
      this.deleteGoal(goal.id);
    },
    onDrop(){
      console.log("drop")
      console.log("re")
    }
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
.goals .delete_panel{
  z-index: 200;
  border-radius: 30px;
  height: 60px;
  width: 60px;
  background: #eb4343;
  position: fixed;
  bottom: 85px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
.goals .delete_panel .relative{
  position: relative;
  height: 60px;
  width: 60px;
}
.goals .delete_panel .visible{
  position: absolute;
  height: 60px;
  width: 60px;
}
.goals .delete_panel .nonnvisible{
  position: absolute;
  top: 0;
  height: 60px;
  width: 60px;
  background: yellow;

}
.goals .delete_panel img{
  margin: 0 auto;
  vertical-align: middle;
}

.goals .delete_panel:hover{
  background: green;
}
.goals .delete_panel:focus{
  background: blue;
}
.goals .delete_panel:target{
  background: yellow;
}

.ghost {
  /* display: none; */
  background: red;
}
</style>
