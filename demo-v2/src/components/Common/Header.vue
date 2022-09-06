<template>
  <div class="header">
       <el-header>
            <div class="title">通用后台管理系统</div>
            <div>{{name}}</div>
       </el-header>
  </div>
</template>

<script>
import { getToken } from '@/utils/setToken'
export default {
    data() { 
        return {
            name:""
        }
    },
    created(){
      this.name = getToken("username")
    }
}
</script>

<style>
    .header .el-header {
        background: #409eff;
        color:#fff;
        line-height:60px;
        display: flex;
        justify-content: space-between;

    }
    .title{
        font-size: 24px;
        width: 200px;
    }
</style>