<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>通用后台管理系统</span>  
            </div>
            <el-form  label-width="80px" :model="form" ref="form">
                <el-form-item label="用户名" prop="username"
                            :rules="[
                            {required:true ,message:'请输入用户名' , trigger:'blur'},
                            {min:4, max:10 ,message:'长度在4到10位字符之间',trigger:'blur'}
                            ]" >
                    <el-input v-model="form.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password"
                            :rules="[
                            {required:true ,message:'请输入密码' , trigger:'blur'},
                            {min:6, max:12 ,message:'长度在6到12位字符之间',trigger:'blur'}
                            ]" >
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>

                <el-form-item >
                    <el-button type="primary" @click="login('form')">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>     
    </div>
</template>

<script>
export default {
    name:"login",
    data() {
        return {
            form:{
                username:"",
                password:"",
            }
        }
    },
    methods: {
        login(form){      
            this.$refs[form].validate((valid) =>{
                console.log(valid); //valid是一个布尔值
                if(valid){
                     this.service.post("/login",this.form)
                     .then( res =>{
                        
                        console.log(res);
                     })
                    if(this.form.username==="admin" && this.form.password==="admin123"){
                        this.$router.push("/home")
                        localStorage.setItem("username",this.form.username)
                        localStorage.setItem("password",this.form.password)
                        }else{
                            this.$message({
                                message:"账号或密码错误，请重新输入",
                                type:"error",
                            })            
                    }
                }else{
                     console.error(this.form);
                }
            });
        }
    }
}
</script>

<style >
    .login{
        width: 100%;
        height: 100%;
        position: absolute;
        background: #409EFF;
    }
    .box-card{
        width: 450px;
        margin: 200px auto;
        border-radius: 15px;
        /* box-shadow: 0 0 50px; */
    }
    .el-button{
        width: 100%;     
    }
    .el-card__header{
        font-size: 34px;
        text-align: center;
    }
</style>