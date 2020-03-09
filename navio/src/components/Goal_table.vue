<template lang="html">
<div class="goal_table">
  <div class="title">
      {{ name }}
  </div>
  <div class="table" >
    <Day class="" v-for="day in days" :key="day.date" :max="maximum" :value="day.value">
    </Day>
  </div>
</div>
</template>

<script>
import Day from '../components/Goal_day.vue'
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


async function getData() {
  const ret = await Storage.get({ key: 'data' });
  const goals = JSON.parse(ret.value);
  return goals;
}

export default {
  props: ['name'],
  data(){
    return {
      maximum: 0,
      days:[
      ]
    }
  },
  components:{
    Day
  },
  mounted(){
    var res = getData();
    res.then((data)=>{
      for (var goal of data.goals){
        if (this.name == goal.name){
          this.days = goal.days;
          for(var day of goal.days){
            if (day.value > this.maximum){
              this.maximum = day.value;
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
  margin: 60px;
  margin-top: 120px;
  margin-bottom: 120px;
  border-top: 2px solid #efefef;
  border-left: 2px solid #efefef;
  border-right: 2px solid #efefef;
  transform: scale(1, -1) rotate(-90deg);
}
</style>
