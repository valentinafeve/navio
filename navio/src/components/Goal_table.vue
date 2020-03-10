<template lang="html">
<div class="goal_table">
  <div class="title">
      <span v-if="isInverted" class="">
        History of {{ counter }} I've promised not to {{ name }}
      </span>
      <span v-else>
        History of {{ counter }} I've promised to {{ name }}
      </span>
  </div>
  <div class="table" >
    <Day class="" v-for="day in days" :key="day.date" :max="maximum" :value="day.value" :isInverted="isInverted">
    </Day>
  </div>
</div>
</template>

<script>
import Day from '../components/Goal_day.vue'
import { goalsUtils } from "@/scripts/goals_utils";

export default {
  props: ['id', 'name', 'counter', 'isInverted'],
  data(){
    return {
      maximum: 0,
      days:[
      ]
    }
  },
  mixins: [
    goalsUtils
  ],
  components:{
    Day
  },
  mounted(){
    var thisa = this;
    this.getGoals().then((goals)=>{
      for (var goal of goals){
        if (thisa.name == goal.name){
          thisa.days = goal.days;
          for(var day of goal.days){
            if (day.value > thisa.maximum){
              thisa.maximum = day.value;
            }
          }
        }
      }
    })
  },
}
</script>

<style lang="css" scoped>
.goal_table .title{
  font-size: 1.2em;
  margin: 20px;
}
.table{
  display: block;
  width: 168px;
  margin: 0px;
  margin-top: 120px;
  margin-bottom: 120px;
  border-top: 1px solid #efefef;
  border-left: 1px solid #efefef;
  border-right: 1px solid #efefef;
  transform: scale(1, -1) rotate(-90deg);
}
</style>
