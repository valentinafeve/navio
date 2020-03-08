<template lang="html">
<div class="home">
  <table>
    <tr v-for="week in weeks" :key="week.num">
      <td><div :class="week.data.mon"></div></td>
      <td><div :class="week.data.tue"></div></td>
      <td><div :class="week.data.wed"></div></td>
      <td><div :class="week.data.thu"></div></td>
      <td><div :class="week.data.mon"></div></td>
      <td><div :class="week.data.mon"></div></td>
      <td><div :class="week.data.mon"></div></td>
    </tr>
  </table>
</div>
</template>

<script>
export default {
  data(){
    return{
      weeks:[
        {
          num: 1,
          data:{
            mon:"four",
            tue:"four",
            wed:"four",
            thu:"four",
            fri:"four",
            sat:"four",
            sun:"four",
          }
        },
        {
          num: 2,
          data:{
            mon:"one",
            tue:"one",
            wed:"two",
            thu:"three",
            fri:"one",
            sat:"four",
            sun:"one",
          }
        },
        {
          num: 3,
          data:{
            mon:"one",
            tue:"three",
            wed:"three",
            thu:"four",
            fri:"three",
            sat:"three",
            sun:"three",
          }
        },
        {
          num: 4,
          data:{
            mon:"three",
            tue:"three",
            wed:"three",
            thu:"three",
            fri:"three",
            sat:"three",
            sun:"three",
          }
        },
        {
          num: 5,
          data:{
            mon:"two",
            tue:"two",
            wed:"two",
            thu:"three",
            fri:"three",
            sat:"three",
            sun:"two",
          }
        },
        {
          num: 6,
          data:{
            mon:"one",
            tue:"two",
            wed:"two",
            thu:"four",
            fri:"one",
            sat:"four",
            sun:"two",
          }
        },
        {
          num: 7,
          data:{
            mon:"one",
            tue:"one",
            wed:"one",
            thu:"four",
            fri:"one",
            sat:"one",
            sun:"one",
          }
        },
        {
          num: 8,
          data:{
            mon:"one",
            tue:"one",
            wed:"one",
            thu:"four",
            fri:"one",
            sat:"one",
            sun:"one",
          }
        },
      ]
    }
  }
}
</script>

<style lang="css" scoped>
table{
  margin: 20px;
  transform: rotate(-90deg);
}
table tr{
  padding: 0px;
  margin: 0px;
}
table td{
  transform: rotate(90deg);
  height: 24px;
  width: 24px;
}
div.four{
  width: 100%;
  height: 100%;
  display: block;
  background-color: #19d44b;
}
div.three{
  width: 100%;
  height: 100%;
  display: block;
  background-color: #63ff8d;
}
div.two{
  width: 100%;
  height: 100%;
  display: block;
  background-color: #a1ffba;
}
div.one{
  width: 100%;
  height: 100%;
  display: block;
  background-color: #e8e8e8;
}

</style>
