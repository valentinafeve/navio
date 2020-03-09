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
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import Day from '../components/Goal_day.vue'

const { Filesystem } = Plugins;

async function fileRead() {
  let contents = await Filesystem.readFile({
    path: 'data.json',
    directory: FilesystemDirectory.Data,
    encoding: FilesystemEncoding.UTF8
  });
  return contents;
}

export default {
  props: ['name', 'counter', 'isInverted'],
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
    fileRead().then((contents)=>{
      var to_parse = contents.data;
      var data = JSON.parse(to_parse);
      for (var goal of data.goals){
        if (this.name == goal.goal.name){
          this.days = goal.goal.days;
          for(var day of goal.goal.days){
            if (day.value > this.maximum){
              this.maximum = day.value;
            }
          }
        }
      }
    });
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
