<template lang="html">
  <div class="goal_card">
    <div
      :id="id"
     style="width:100%;"
     class="max-w-sm rounded overflow-hidden shadow-lg w-full card"
     value="volvo"
     draggable="true"
     >
       <div class="title">
         Hoy many {{ counter }} did I {{ name }} today?
       </div>
       <div class="">
         <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number" min="0" v-model="goal_data">
       </div>
       <div class="">
         <button @click="add_data_to_goal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" name="button"> Add data</button>
       </div>
     </div>
  </div>
</template>

<script>
import { goalsUtils } from "@/scripts/goals_utils";

export default {
  props: ['id', 'name', 'counter' ,'inverse'],
  mixins: [
    goalsUtils
  ],
  data(){
    return {
      goal_data: "",
    }
  },
  methods:{
    add_data_to_goal(){
      var goal_data = this.goal_data;
      this.goal_data = '';
      this.addValue(this.id, goal_data);
    },
    dragStart(e) {
      const target = e.target;
      e.dataTransfer.setData('goal_id', target.id);
    }
  }

}
</script>

<style lang="css" scoped>
.goal_card .card{
  padding: 20px;
  margin-top: 20px;
}
.goal_card .card button{
  margin-top: 20px;
}
.goal_card .title{
  margin: 18px;
  font-size: 22px;
}
</style>
