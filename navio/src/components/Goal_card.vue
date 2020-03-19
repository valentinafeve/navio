<template lang="html">
  <div class="goal_card" :class="{invisible: isDeleted}">
    <div
      :id="id"
     class="max-w-sm rounded overflow-hidden shadow-lg w-full card"
     value="volvo"
     @click="onClick"
     >
       <div class="title">
         Hoy many {{ counter }} did I {{ name }} today?
       </div>
       <div class="">
         <input class="blue" id="inline-full-name" type="text" min="0" v-model="goal_data" @click="onClick" @input="validateValueGoalInput()" maxlength="6">
       </div>
       <div class="">
         <button @click="add_data_to_goal" class="button" :disabled="disableSubmit" type="button" :class="{disabled: disableSubmit}" name="button"> Add data</button>
       </div>
     </div>
     <div class="option_buttons" :class="{visible: buttons_visible}">
      <div class="delete_button" @click="button_delete_onClick">
        <img src="icons/bin.svg" alt="" style="height:30px;">
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
      key_pressed: '',
      goal_data: "",
      lastValid: '',
      buttons_visible: false,
      isDeleted: false,
      disableSubmit: true,
    }
  },
  methods:{
    add_data_to_goal(){
      this.buttons_visible = !this.buttons_visible;
      var goal_data = this.goal_data;
      this.goal_data = '';
      this.addValue(this.id, goal_data);
      this.disableSubmit = true;
      this.lastValid = '';
    },
    validateValueGoalInput(){
      const reg = /^([0-9]{1,10})$/
      if (reg.test( this.goal_data) && !this.goal_data.endsWith('.')){
        this.disableSubmit = false;
        this.lastValid = this.goal_data;
      }
      else{
        console.log(this.goal_data.length)
        if (this.goal_data.length > 0 ){
          this.goal_data = this.lastValid;
        }
        else{
          this.disableSubmit = true;
        }
      }
     },
    dragStart(e) {
      const target = e.target;
      e.dataTransfer.setData('goal_id', target.id);
    },
    onClick(){
      this.buttons_visible = !this.buttons_visible;
    },
    button_delete_onClick(){
      this.deleteGoal(this.id);
      this.isDeleted = true;
    }
  }

}
</script>

<style lang="css" scoped>
.goal_card{
  width: auto;
}
.goal_card .card{
  padding: 20px;
  margin: 0 auto;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  background: #f3f3fa;
}
.goal_card .card input{
  width: 80px;
}
.goal_card .card button{
  margin-top: 20px;
}
.goal_card.invisible{
  display: none;
}
.goal_card .title{
  margin: 18px;
  font-size: 22px;
}
.goal_card .option_buttons{
  display: none;
}
.goal_card .delete_button{
  margin: 0 auto;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  display: inline-block;
  background: #cd2323;
  position: relative;
}
.goal_card .delete_button img{
  position: absolute;
  top: 13px;
  left: 15px;
}
.goal_card .visible{
  display: block;
}
</style>
