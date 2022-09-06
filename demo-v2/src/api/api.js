import service from "../axios";
import qs from "qs";

//学生列表的查询接口
export function students(params){
    return service({
        method: "get",
        url:"/students",
        params
    })
}
//学生列表的删除接口
export function studentDel(id){
    return service({
        method: "delete", 
        url:`/students/${id}`
    })
}
//信息列表的新增接口
export function info(data){
    data =  qs.stringify(data);
    return service({
        method:"post",
        url:'/info',
        data
    });
}    
//信息列表的修改接口
export function updateInfo(data){
    data =  qs.stringify(data);
    return service({
        method:"put",
        url:'/info',
        data:data
    });
}    
//信息列表的查询接口
export function getinfo(){
    return service({     
        method:"get",
        url:'/info',
    });
}
//信息列表的删除接口
export function infoDel(id){
    return service({     
        method:"delete",
        url:`/info/${id}`,
  
    });
}
//旅游地图接口
export function travel(){
    return service({     
        method:"get",
        url:`/travel/`,
  
    });
}


//数据概览接口
export function dataView(){
    return service({
        method:"get",
        url:"/dataview"
    })
}

