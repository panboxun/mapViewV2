    //获取表单数据
export  function getData(root,url , params){
    root.service.get(url,{params: params || {}})
    .then(res =>{
        if(res.data.status === 200){
            root.tableData = res.data.data;
            root.total = res.data.total;
        }
    })
    .catch(err => {
        throw err 
    })
} 
    //新增和修改
import qs from "qs"
export  function changeInfo(root ,method,url,form,callback){
    let  data = qs.stringify(form)
    root.service[method](url,data)
    .then(res =>{
        if(res.data.status === 200){
            callback(root , url)
            root.dialogFormVisible = false
            root.$message({
                type:"success",
                message:res.data.message,        
            })
        }
    })
    .catch(err => {
        throw err 
    })
} 

//删除
export function delData(root , url, id , callFun){
    root.dialogFormVisible = false;
    root.$alert("是否删除", "提示", {   
        confirmButtonText:"确定",
        callback: () =>{
            root.service.delete(`${url}/${id}`).then (res => {
                    if(res.data.status ===200){
                        callFun(root ,url)
                        root.$message({
                            message:res.data.message,
                            type:"success"
                        })
                    }  
                })
                .catch(err => {
                    throw err 
                })
        }
    })
}

//作业列表获取表格数据方法
export  function getTableData(root, url, params ,arr){
    root.service.get(url, { params : params || {}})
    .then(res => {
        if(res.data.status ===200){
            root.tableData = res.data.data
            root.total = res.data.total
            root.tableData.map(item =>{
                arr.map(aitem =>{
                    item[aitem] ? item[aitem + "_text"] = "是" :  item[aitem + "_text"] = "否"
                })
            })
            root.loading = false
        }
    })
    .catch(err => {
        throw err
    })
}