<template>
  <div class="home">
    
      <Header></Header>
      <el-container class="content">     
            <Menu></Menu>
        <el-container>
          <Breadcrumb></Breadcrumb>
            <el-main>
              
              <div class="cont">
                <router-view></router-view>
              </div>
            </el-main>
            <el-footer><Footer></Footer></el-footer>
        </el-container>
      </el-container>
  </div>
</template>

<script>
import Header from "@/components/Common/Header"
import Footer from "@/components/Common/Footer"
import Menu from "@/components/Common/Menu"
import Breadcrumb from "@/components/Common/Breadcrumb"
export default {
  name: 'home',
  components:{
    Header,Footer,Menu,Breadcrumb
  },
  props: {
  
  }
}
</script>


<style scoped>
  .content{
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
  }
  .cont{
    margin: 20px 0;
  }
</style>
