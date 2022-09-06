<template>
  <div class="data-view">
      <el-card>
        <div id="main1">

        </div>
      </el-card>

      <el-card>
        <div id="main2">
          
        </div>
      </el-card>
  </div>
</template>

<script>
import {dataView} from "@/api/api"
export default {
  data(){
    return {}
  },
  mounted(){
    let maChart1 = this.$echarts.init(document.getElementById("main1"));
    maChart1.setOption({
      title:{
        text:"地图"
      },
      tooltip:{},
      xAxis:{
        data:['第一季度','第二季度','第三季度','第四季度']
      },
      yAxis:{},
      series:[{
          name:"人数",
          //type:"line",//折线图
          type:"bar",//柱状图
          data:[650,420,220,797]
        }]
    })
  },
  created(){
    // 第二个图表的绘制
    dataView().then(res =>{
      if (res.data.status === 200){
        let {legend,xAxis,series} = res.data.data
        this.draw(legend,xAxis,series)
      }
    }).catch(error =>{
        throw error
    })
  },
  methods:{
    draw(legend,xAxis,series){
      let maChart2 = this.$echarts.init(document.getElementById("main2"));
      let option = {
        title:{
          text:"会话量"
        },
        tooltip:{
          trigger: "axis"
        },
        legend:{
          data:legend
        },
        xAxis:{
          type:"category",
          data:xAxis
        },
        yAxis:{
          type:"value",
        },
        series:series
      }
      maChart2.setOption(option)
    }
  }
}
</script>

<style scoped>
  .data-view{
    width: 100%;
    display: flex;
    justify-content: space-between;

  }
  .el-card{
    width: 50%;
  }
  #main1 , #main2{
    height: 500px;
  }
</style>