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
  <div class="table_panel">
    <div class="table" >
      <div v-for="day in days" :key="day.date" class="day_square" @click="show_info(day)">
        <Day class="" :max="maximum" :value="day.value" :date="day.date" :isInverted="isInverted">
        </Day>
      </div>
    </div>
  </div>
  <div class="info_panel" :class="{visible: infoVisible}">
    <div class="">
      On
      <b>
        {{date}}
      </b>
      at
      {{ time }}
      I did
      {{ name }}
      <b>
      {{ value }}
      </b>
      {{ counter}}
    </div>
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
      date: '',
      time: '',
      value: 0,
      infoVisible: false,
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
  methods:{
    show_info(info){
      var date = new Date(info.date);
      this.date = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
      this.time = date.getHours()+':'+date.getMinutes();
      this.value = info.value;
      this.infoVisible = !this.infoVisible;
      console.log(info)
    }
  },
  mounted(){
    var thisa = this;
    this.getGoals().then((goals)=>{
      for (var goal of goals){
        if (thisa.id == goal.id){
          thisa.days = goal.days;
          for(var day of goal.days){
            if (parseFloat(day.value) > parseFloat(thisa.maximum)){
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
.goal_table{
  padding: 0px;
}
.goal_table .title{
  font-size: 1.2em;
  margin: 10px;
  margin-top: 20px;
}
.table{
  display: block;
  width: 168px;
  margin-top: 110px;
  margin-bottom: 130px;
  margin-left: -60px;
  border-top: 1px solid #efefef;
  border-left: 1px solid #efefef;
  border-right: 1px solid #efefef;
  transform: scale(1, -1) rotate(-90deg);
}
.info_panel{
  background: #bedeff;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 60px;
  display: none;
}
.info_panel.visible{
  display: block;
}
</style>
