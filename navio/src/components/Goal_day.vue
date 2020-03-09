<template lang="html">
<div class="day" :class="class_color">
</div>
</template>

<script>
export default {
  props:['value', 'max'],
  computed:{
    class_color(){
      var perc = this.value/this.max;
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
  background-color: #19d44b;
}
.day.three{
  background-color: #63ff8d;
}
.day.two{
  background-color: #a1ffba;
}
.day.one{
  background-color: #e8e8e8;
}
</style>
