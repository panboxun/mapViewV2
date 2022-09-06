<template>
    <div class="infolist">
    <el-form :inline="true"  class="demo-form-inline" size="small">
      <el-form-item>
        <el-button type="primary" @click="addStudents">新增</el-button>
      </el-form-item>
    </el-form>   
    <el-table
      :data="tableData"
      border
      style="width: 100%">
        <el-table-column prop="name" label="姓名" align= "center"> </el-table-column>
        <el-table-column prop="sexLabel" label="性别" align= "center"> </el-table-column>
        <el-table-column prop="age" label="年龄" align= "center"> </el-table-column>
        <el-table-column prop="father" label="父亲姓名" align= "center"> </el-table-column>
        <el-table-column prop="mather" label="母亲姓名" align= "center"> </el-table-column>
        <el-table-column prop="time" label="入校时间" align= "center"> </el-table-column>
        <el-table-column prop="address" label="家庭地址" align= "center"> </el-table-column>
        <el-table-column prop="phone" label="联系方式" align= "center"> </el-table-column>
        <el-table-column align= "center" label="操作">
        <template align= "center" slot-scope="scope" >
            <!-- 删除 -->
            <el-button type="danger" size="mini" icon="el-icon-delete"  @click="del(scope.row)"> </el-button>
            <!-- 修改 -->
            <el-button type="danger" size="mini" icon="el-icon-edit"  @click="edit(scope.row)"> </el-button>
        </template>  
        </el-table-column>
    </el-table>

        <el-dialog width="500px" :title="state? '添加学生信息': '修改学生信息'" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" >
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" :rules="[{required:true, message:'请输入姓名'}]">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="sex" :rules="[{required:true}]">
                    <el-radio  v-model="form.sex" label="1">男</el-radio>
                    <el-radio  v-model="form.sex" label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth" prop="age" :rules="[{required:true , message:'请输入年龄'}]">
                    <el-input v-model="form.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父亲姓名" :label-width="formLabelWidth" prop="father">
                    <el-input v-model="form.father" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="母亲姓名" :label-width="formLabelWidth" prop="mather">
                    <el-input v-model="form.mather" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="入校时间" :label-width="formLabelWidth" prop="time" :rules="[{required:true , message:'请输入入学时间'}]">
                    <el-date-picker
                        v-model="form.time"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期时间"
                        >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="家庭地址" :label-width="formLabelWidth" prop="address" :rules="[{required:true , message:'请输入地址 '}]">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone" :rules="[{required:true , message:'请输入联系方式'}]">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeInfo('form')">取 消</el-button>
                <el-button type="primary" @click="sure('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {info ,getinfo ,updateInfo , infoDel} from "@/api/api"
export default {
    
    data() {
        return {
            tableData: [],
            dialogFormVisible:false,
            form:{
                name:"",
                sex:"",
                age:"",
                father:"",
                mather:"",
                time:"",
                address:"",
                phone:"",
            },
            formLabelWidth:"80px",
            total:0,
            state:true
        }
    },
    created(){
        this.getData()
    },
    methods:{
        del(row){
            this.dialogFormVisible = false;
            this.$alert("是否删除", "提示", {
                confirmButtonText:"确定",
                callback: () =>{
                  infoDel(row.id) .then(res =>{ 
                        if(res.data.status ===200){
                            this.getData()// 重新获取数据
                            this.$message({
                                message:res.data.message,
                                type:"success"
                            })
                        }
                    })  
                }
            })
            infoDel(row)
        },
        edit(row){
            this.form ={...row}
            this.dialogFormVisible = true;       
            this.state = false
        },
        addStudents(){
            this.form={
                name:"",
                sex:"",
                age:"",
                father:"",
                mather:"",
                time:"",
                address:"",
                phone:"",
            }
            
            this.dialogFormVisible = true
            this.state = true
        },
        closeInfo(form){
            console.log(form);
            this.dialogFormVisible = false;
           
        },
        sure(form){
            this.$refs[form].validate(valid =>{
                if(valid){
                    if(this.state){
                        info(this.form).then(res =>{
                            console.log("add");
                         if(res.data.status == 200){
                            this.getData()
                            this.dialogFormVisible = false
                            console.log(res);
                            this.$message({
                                type:"success",
                                message:res.data.message,        
                            })
                       }
                    })     
                }else{
                    console.log("edit");
                    updateInfo(this.form).then(res =>{
                       if(res.data.status == 200){
                            this.getData()
                            this.dialogFormVisible = false
                            console.log(res);
                            this.$message({
                                type:"success",
                                message:res.data.message,        
                            })
                       }
                    })
                }
 
                }
            })
            
        },
        getData(){
            getinfo().then(res  =>{
                if(res.data.status == 200) {
                    this.tableData =res.data.data
                    this.tableData.map(item => item.sex ==1 ? item.sexLabel ="男" :item.sexLabel ="女")
                    this.total = res.data.total
                    console.log(res);
                }
            })
        }
    }
}   
</script>

<style>
.el-form-item{
  text-align: left;
}
</style>