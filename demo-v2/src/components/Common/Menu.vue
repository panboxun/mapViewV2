<template>
  <div class="menu">
  <el-aside width="210px">
    <el-menu
      router
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#2578b5"
      text-color="#fff"
      active-text-color="#ffd04b">
      <template v-for="(item, index) in menus" >
        <el-submenu :index="index + ' ' " :key="index"  v-if="!item.hidden">
          <template slot="title">
            <i :class="item.iconClass"></i> &nbsp;
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group v-for="(child ,i) in item.children" :key="i">       
            <el-menu-item :index="child.path "  style="text-align: center; height: 60px;">
            <i :class="child.iconClass"></i> &nbsp;
            {{child.name}}
            </el-menu-item>
          </el-menu-item-group>   
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
  </div>
</template>

<script>
export default {
    data() { 
        return {
          menus:[]  
        }
    },
    
    created(){
      //  console.log(this.$router.options.routes);
       this.menus=[...this.$router.options.routes]
  
    },
    methods: {
       
    } 
}
</script>

<style>
.el-aside{
    height: 100%;
}
.el-menu{
    height: 100%;
}
</style>