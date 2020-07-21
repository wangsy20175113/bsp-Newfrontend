<template>
  <el-container id="main-content" class="clearfix">
    
    <el-main>

    <el-form ref="ruleForm" :model="ruleForm" status-icon  class="ruleForm">
      <el-form-item label="User Name: " prop="username" style="margin-left:400px;margin-top:100px">
      <el-button type="text"  >{{this.ruleForm.username}} </el-button>
    </el-form-item>
    <el-form-item label="Name" prop="name" style="margin-left:434px;">
      <el-input v-model="ruleForm.name" style="width:200px" />
    </el-form-item>
    <el-form-item label="Email" prop="email" style="margin-left:434px;">
      <el-input v-model="ruleForm.email" style="width:200px" />
    </el-form-item>

    <el-form-item label="Phone" prop="phone" style="margin-left:429px;">
      <el-input v-model="ruleForm.phone" style="width:200px" />
    </el-form-item>
    <el-form-item style="margin-left:430px;">
      <el-button style="width:150px" type="danger" icon="el-icon-document" @click.native = 'submitForm'>save</el-button>
      <el-button type="info" @click="myshop">My Stores</el-button>
    </el-form-item>
  </el-form>
      </el-main>

  </el-container>
</template>

<script>
import {updateUser,searchUser} from "@/api/user"
export default {
data() {
    return {
       ProductData:{
         user_id: '',
         },
      ruleForm: {
        username: '',
        name: '',
        email: '',
        phone: ''
      }
    }
 },


 mounted: function () {
    this.loadData()
  },
  methods: {
      loadData() {
     this.ProductData.user_id=this.$store.getters.userid
      console.log( 'this.ProductData')
      console.log(this.ProductData)
      searchUser(this.ProductData).then((result) => {
      console.log("ruleForm:")

      this.ruleForm = result.data
        console.log(ruleForm)
      })
    },
       submitForm(){
       this.$refs.ruleForm.validate(valid => {
        if(valid) {
          // console.log('valid');
          updateUser(this.ruleForm).then((result) => {
            // console.log(result.code)
            if (result.code==200){
              this.$message({
                type: 'info',
                message: `update operation succeeded`
              })
             //     this.loadData()
            }else{
              this.$message({
                type: 'info',
                message: `update operation failed`
              })
            }

          })
        } else {
          // console.log('the parameter is invalid');
          return false
        }
      })
    }
    ,
     myshop() {
      this.$router.push({
        name: 'mystore',

      })
    }
  }
}
</script>

<style>
    .main-content {
        border:1px solid red;
        padding-left: 7px;
        padding-right: 7px;
    }
    .el-header {
        margin: 0 0 12px;
        border-bottom: 1px dotted #e2e2e2;
    }
    .Register {
        width: 50%;
        margin: auto;
    }
    .green {
        color: #69aa46!important;
    }
    .btn-success {
        background-color: #87b87f!important;
        border-color: #87b87f;
    }
    .btn {
        display: inline-block;
        padding: 0 12px 1px;
        line-height: 32px;
        color: #FFF!important;
        text-shadow: 0 -1px 0 rgba(0,0,0,0.25)!important;
        font-size: 14px;
        background-image: none!important;
        background-color: #abbac3!important;
        border: 5px solid #abbac3;
        border-radius: 0!important;
        box-shadow: none!important;
        -moz-transition: all .1s ease-in-out;
        -webkit-transition: all .1s ease-in-out;
        -o-transition: all .1s ease-in-out;
        -ms-transition: all .1s ease-in-out;
        transition: all .1s ease-in-out;
        cursor: pointer;
        vertical-align: middle;
        margin: 0;
        position: relative;
    }
    .div{
        margin: 0;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 14px;
        line-height: 20px;
        color: #333;
        background-color: #fff;

    }
</style>
