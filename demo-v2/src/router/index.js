import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
    routes:[
        {

            path:"/home",
            name:"学生管理",
            iconClass:"fa fa-users",
            redirect:"/home/student",
            component: () => import("@/components/Home"),
            children:[
                {
                    path:"/home/student",
                    name:"学生列表",
                    iconClass:"fa fa-list",
                    component: () => import("@/components/students/StudentsList"), 
                },
                {
                    path:"/home/info",
                    name:"信息列表",
                    iconClass:"fa fa-list-alt",
                    component: () => import("@/components/students/InfoList"), 
                },   
                {
                    path:"/home/work",
                    name:"作业列表",
                    iconClass:"fa fa-list-ul",
                    component: () => import("@/components/students/WorkList"), 
                },   
            
            ]
            //component:resolve => require(["@/components/Home"],resolve) //异步组件的加载
        },
        {
            path:"/home",
            name:"数据分析",
            iconClass:"fa fa-bar-chart",
            component: () => import("@/components/Home"),
            children:[
                {
                    path:"/home/dataview",
                    name:"数据概览",
                    iconClass:"fa fa-line-chart",
                    component: () => import("@/components/dataAnalysis/DataView"), 
                },
                {
                    path:"/home/mapView",
                    name:"地图概览",
                    iconClass:"fa fa-line-chart",
                    component: () => import("@/components/dataAnalysis/MapView"), 
                },   
               
                {
                    path:"/home/travel",
                    name:"旅游地图",
                    iconClass:"fa fa-line-chart",
                    component: () => import("@/components/dataAnalysis/TrvalMap"), 
                },   
                
            ]
            
        },
        {
            path:"/home",
            name:"用户中心",
            iconClass:"fa fa-user",
            component: () => import("@/components/Home") ,
            children:[
                {
                    path:"user",
                    name:"权限管理",
                    iconClass:"fa fa-user",
                    component: () => import("@/components/user/User"), 
                },
            ]
        },
        {
            path:"/",
            hidden:true,
            name:"首页",
            redirect:"/login", //重定向 跳转至login登录页
            component: () => import("@/components/Login") //路由懒加载
           
        },
        {
            path:"/login",
            name:"login",
            hidden:true,
            component: () => import("@/components/Login") //路由懒加载 
        },
        {
            path:"*",
            name:"Not Found",
            hidden:true,
            component: () => import("@/components/Not Found") //路由懒加载 
        },
    ],
    mode:"history",
});