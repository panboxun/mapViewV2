<template>
  <div class="user">
    <el-tree
      :data="menus"
      show-checkbox
      node-key="name"
      :props="defaultProps"
      ref="tree">
    </el-tree>
    <el-button @click="getCheckedNodes">通过node节点获取</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus:[],
      defaultProps:{
        label:"name",
        children:"children"
      }
    }
  },
  methods:{ 
    getCheckedNodes(){
      let arr = this.$refs.tree.getCheckedNodes()
      console.log("arr" , arr);
    }
  },
  created(){
    this.menus = [...this.$router.options.routes]
    //权限管理和动态路由的思路：
    // 根据不同的用户登录上来，返回对应的路由权限菜单
     
  }
}
</script>

<style>

</style>