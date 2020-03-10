<template lang="html">
<div class="home">
  <GoalTable v-for="goal in goals" :key="goal.id" :name="goal.name" :counter="goal.counter" :isInverted="goal.inverse">
  </GoalTable>
</div>
</template>

<script>
import GoalTable from '../components/Goal_table.vue';
import { goalsUtils } from "@/scripts/goals_utils";

export default {
  components:{
    GoalTable,
  },
  mixins: [
    goalsUtils
  ],
  data(){
    return{
      goals:[],
    }
  },
  created(){
    console.log("Home created.")
  },
  mounted(){
    var thisa = this;
    this.getGoals().then((goals)=>{
      thisa.goals = goals;
    });
  }
}
</script>

<style lang="css" scoped>

.home{
  padding-top: 40px;
  padding-bottom: 80px;
}

</style>
