<template>
  <div class="mapview">
      <div id="main"></div>
  </div>
</template>
<script>
import geoJson from "@/assets/china.json"
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    let myChart = this.$echarts.init(document.getElementById("main"))
    this.$echarts.registerMap("china" , geoJson)

    // console.log("geoJson:",geoJson);
    let option ={
      backgroundColor:"rgb(121,145,209)",
      geo: {
          map: 'china',
          regions:[{
            name:"南海诸岛"
          }],
          zoom:1.1,
          itemStyle:{
            normal:{
              areaColor:{
                type:"radial",
                x:0.5,
                y:0.5,
                r:0.8,
                colorStops:[
                  {
                    offset:0,
                    color:"red",    
                  },
                  {
                    offset:1,
                    color:"blue",
                  }
                ],
                globalCoord:true
              },
              shadowColor:"rgb(58,115,192)",
              shadowOffsetX:10,
              shadowOffsetY:11,
            },
            emphasis:{ 
              areaColor:"rgb(46,229,206)",
              borderWidth:0.1
            }
          },
          aspectScale:0.75,
      },
      series:[
        {
          type:"map",
          label:{
            normal:{
              show:true,
              textStyle:{
                color:"#1DE9B6"
              }
            },
            emphasis:{
              textStyle:{
                color:"rgb(183,185,14)"
              }
            }
          },
          zoom:1.1,
          map:"china",
          itemStyle:{
            normal:{
              backgroundColor:"rgb(147,235,248)",
              borderWidth:1,
              areaColor:{
                type:"radial",
                x:0.5,
                y:0.5,
                r:0.8,
                colorStops:[
                  {
                    offset:0,
                    color:"rgb(31,54,150)",
                    
                  },
                  {
                    offset:1, 
                    color:"rgb(89,128,142)",
                    
                  }
                ],
                globalCoord:true
              }
            },
          },
        }
      ]
    }
    myChart.setOption(option)
  },
}
</script>

<style>
.mapview{
  width: 100%;
}
#main{
  width: 100%;
  height: 600px;
}
</style>