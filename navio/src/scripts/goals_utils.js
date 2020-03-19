import { fileUtils } from "@/scripts/file_utils";

export const goalsUtils = {
    mixins: [ fileUtils ],
    methods: {
      show_hidden_buttons(){
        var buttons = document.getElementById("hidden_buttons");
        buttons.style.display = "block";
      },
      generateId() {
            var len = 20;
            var arr = '1234567890abcdefghijklmnopqrstuvwxyz';
            var ans = '';
            for (var i = len; i > 0; i--) {
                ans +=
                  arr[Math.floor(Math.random() * arr.length)];
            }
            return ans;
      },
      async getGoals(){
        const contents = await this.fileRead();
        var to_parse = contents.data;
        var data = JSON.parse(to_parse);
        return data;
      },
      async updateGoals(data){
        await this.fileWrite(JSON.stringify(data))
      },
      async addGoal(goal){
        var goals = await this.getGoals()
        goals.push(goal);
        await this.updateGoals(goals);
      },
      async addValue(goal_id, goal_value){
        console.log("Ading..."+goal_value+' to '+goal_id)
        var goals = await this.getGoals();
        for(var goal of goals){
          if( goal.id == goal_id ){
            var today = new Date();
            var updated = false;
            for ( var day_ of goal.days ){
              var day =  new Date(day_.date)
              if (day.getDate() == today.getDate() && day.getMonth() == today.getMonth() && day.getFullYear == today.getFullYear){
                day_.value = goal_value;
                updated = true;
              }
            }
            if (!updated){
              goal.days.push({
                date: today,
                value: goal_value,
              })
            }
          }
        }
        await this.updateGoals(goals)

      },
      async deleteGoal(id){
        var goals = await this.getGoals();
        var i = 0;
        for(var goal of goals){
          if(goal.id == id){
            break;
          }
          i++;
        }
        goals.splice(i);
        await this.updateGoals(goals)
      },
    }
}
