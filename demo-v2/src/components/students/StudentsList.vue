<template>
  <div class="studentList">
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="请输入姓名查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
  </el-form>
    <el-table
      :data="compData"
      border
      style="width: 100%">
    <el-table-column prop="name" label="姓名" align= "center"> </el-table-column>
    <el-table-column prop="sexLabel" label="性别" align= "center"> </el-table-column>
    <el-table-column prop="age" label="年龄" align= "center"> </el-table-column>
    <el-table-column prop="number" label="学号" align= "center"> </el-table-column>
    <el-table-column prop="class" label="班级" align= "center"> </el-table-column>
    <el-table-column prop="state_text" label="状态" align= "center"> </el-table-column>
    <el-table-column prop="address" label="地址" align= "center"> </el-table-column>
    <el-table-column prop="phone" label="联系方式" align= "center"> </el-table-column>
    <el-table-column align= "center" label="操作">
      <template align= "center" slot-scope="scope" >
        <el-button type="danger" size="mini" icon="el-icon-delete"  @click="del(scope.row)"> </el-button>
      </template>  
    </el-table-column>
  </el-table>
  <!-- 分页 -->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {students,studentDel,} from "@/api/api.js"
export default {
  data() {
      return {
        tableData: [],
        currentPage:1, //当前页数
        pageSize:10, //每页显示条数
        total:0, // 总条数
        formInline: {
          name: '',
          
        }
      }
    },
  
  methods:{
      getData(params){
       students(params).then( res =>{
        console.log(res);
        if(res.data.status ===200){
          this.tableData = res.data.data;
          this.total = res.data.total 
          this.tableData.map(item => item.sex ==1 ? item.sexLabel ="男" :item.sexLabel ="女")
          this.tableData.forEach(item => {
            item.state ==="1"
            ?(item.state_text = "已入学") 
            :item.state ==="2" 
            ? (item.state_text = "未入学") 
            :(item.state_text = "休学中")
          });
        }
       
      })
      },
      //删除学生
      del(row){
        // console.log(row);
        studentDel(row.id).then( res => {
            //console.log(res); 
            if(res.data.status === 200){
              this.$message({ message:"删除成功", type:"success" }),
              this.getData()
            }
        })
      },
      //修改页距
      handleSizeChange(val) {
        this.pageSize = val
        this.currentPage = 1
        console.log(`每页 ${val} 条`);
      },
      //修改当前页目
      handleCurrentChange(val) {
        this.currentPage = val
        console.log(`当前页: ${val}`);
      },
      //查询学生
      find(){
        //getData接受的是一个对象
        this.getData(this.formInline)
      },
      //重置
      reset(){
          this.formInline={}
          console.log(this.formInline);
          this.getData(this.formInline)
      }
  },
  created(){
    this.getData() 
  },
  computed:{
    compData(){
      return this.tableData.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize)
    }
  }
}
</script>

<style>
.el-pagination{
  text-align: left;
  margin-top: 20px;
}
.el-form-item{
  text-align: left;
}
</style>