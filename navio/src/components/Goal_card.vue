<template lang="html">
  <div class="goal_card">
    <div style="width:100%;" class="max-w-sm rounded overflow-hidden shadow-lg w-full card" value="volvo">
       <div class="title">
         {{ name }}
       </div>
       <div class="">
         <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number" value="Jane Doe" v-model="goal_data">
       </div>
       <div class="">
         <button @click="add_data_to_goal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" name="button"> Add data</button>
       </div>
     </div>
  </div>
</template>

<script>
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const { Filesystem } = Plugins;

async function fileWrite(text) {
  try {
    await Filesystem.writeFile({
      path: 'data.json',
      data: text,
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    })
  } catch(e) {
    console.error('Unable to write file', e);
  }
}

async function fileRead() {
  let contents = await Filesystem.readFile({
    path: 'data.json',
    directory: FilesystemDirectory.Documents,
    encoding: FilesystemEncoding.UTF8
  });
  return contents;
}

export default {
  props: ['name', 'inverse'],
  data(){
    return {
      goal_data: "",
    }
  },
  methods:{
    add_data_to_goal(){
      var goal_data = this.goal_data;
      this.goal_data = '';

      fileRead().then((contents)=>{
        var to_parse = contents.data;
        var data = JSON.parse(to_parse);

        var i = 0;
        for(var goal of data.goals){
          if( goal.goal.name == this.name ){
            var today = new Date();
            var date_str = today.getUTCDay().toString()+'-'+ today.getUTCMonth().toString()+'-'+today.getUTCFullYear().toString();
            var updated = false;
            var j = 0;
            for ( var day of goal.goal.days ){
              if (day.date == date_str){
                day.value = goal_data;
                data.goals[i].goal.days[j].value=goal_data;
              }
              updated = true;
              j+=1;
            }
            if (!updated){
              goal.days = [];
              data.goals[i].goal.days.push({
                date: date_str,
                value: goal_data,
              })
              goal.days.push(
                { date: date_str,
                  value: goal_data,
                }
              )
            }
          }
          i+=1;
        }
        fileWrite(JSON.stringify(data))
      });
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
