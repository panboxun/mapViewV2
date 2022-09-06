<template>
  <div class="trvalmap">
      <div id="main"></div>
  </div>
</template>
<script>
import geoJson from "@/assets/china.json"
import {travel} from "@/api/api"
export default {
  data() {
    return {
      
    }
  },
  created(){
    travel().then(res  =>{
      if(res.data.status == 200){
        let { points, linesData} = res.data.data
        this.draw(points,linesData)
      }
    });
  },
  methods:{
    draw(points,linesData) {
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
              // show:true, //省份名称显示与关闭
              textStyle:{
                color:"red"
              }
            },
            emphasis:{
              textStyle:{
                color:"red"
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
        },
        // 关于散点图的配置
        {
          type:"effectScatter",
          coordinateSystem:"geo",
          showEffectOn: "render",
          symbolSize:10,
          zlevel:1,
          data:points,
          rippleEffect:{
            period:15,
            scale:4,
            brushType:"fill"
          }

        },
        // 关于线路图的配置
        {
          type:"lines",
          zlevel:2,
          effect:{
            show:true,
            period:4,
            symbol:"arrow",
            symbolSize:7,
            trailLength:0.4
          },
          lineStyle:{
            normal:{
              color:"#1DE9B6",
              width:1,
              opacity:0.1,
              curveness:0.3
            }
          },
          data:linesData,
            
        }
      ]
    }
    myChart.setOption(option)
  },
  }
}
</script>

<style> 
.trvalmap{
  width: 100%;
}
#main{
  width: 100%;
  height: 600px;
}
</style>