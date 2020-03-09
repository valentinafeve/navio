<template lang="html">
<div class="day" :class="class_color">
</div>
</template>

<script>
export default {
  props:['value', 'max', 'isInverted'],
  computed:{
    class_color(){
      if (this.max == 0) {
        if(this.isInversed){
          return "four";
        }
        else{
          return "one";
        }
      }
      var perc = this.value/this.max;
      if (!this.isInverted){
        if( perc < 0.25){
          return "one"
        }
        if( perc < 0.5){
          return "two"
        }
        if( perc < 0.75){
          return "three"
        }
        return "four"
      }
      else{
        if( perc < 0.25){
          return "four"
        }
        if( perc < 0.5){
          return "three"
        }
        if( perc < 0.75){
          return "two"
        }
        return "one"
      }
    }
  }
}
</script>

<style lang="css" scoped>
.day{
  transform: scale(1, -1) rotate(-90deg);
  display: inline-block;
  height: 24px;
  width: 24px;
  border: 1px solid #efefef;
  background-color: #19d44b;
}
.day.four{
  background-color: #00BF5F;
}
.day.three{
  background-color: #66FF7F;
}
.day.two{
  background-color: #93FF9B;
}
.day.one{
  background-color: #D3D3D3;
}
</style>
