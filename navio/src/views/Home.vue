<template lang="html">
<div class="home">
  <div v-if="no_goals" class="message">
    You'll see your goals here.
  </div>
  <GoalTable v-for="goal in goals" :key="goal.id" :id="goal.id" :name="goal.name" :counter="goal.counter" :isInverted="goal.inverse">
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
  computed:{
    no_goals(){
      return (this.goals.length < 1)
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
  padding: 20px;
  padding-top: 40px;
  padding-bottom: 80px;
}

.home .message{
  padding-top: 10px;
  padding-bottom: 10px;
  color: #656565;
  background-color: #efefef;
  border-radius: 15px;
  width: auto;
  margin: 0 auto;
  margin-right: 20px;
  margin-left: 15px;
}

</style>
