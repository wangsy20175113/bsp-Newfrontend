<template>
  <el-container id="main-content" class="clearfix">
    <el-main>
      <el-form  class="register-container" ref="registerForm" :model="registerForm" :rules="ruleValidate" status-icon >
        <el-form-item label="Account Name" label-width="14%" prop="account_name" style="margin-left: 30%;margin-top: 8%; ">
          <el-input v-model="registerForm.account_name" style="width:25%" clearable></el-input>
        </el-form-item>
        <el-form-item label="Email" label-width="14%" prop="email" style="margin-left: 30%">
          <el-input  v-model="registerForm.email" style="width:25%" clearable></el-input>
        </el-form-item>

        <el-form-item label="Password" label-width="14%" prop="password" style="margin-left:30%">
          <el-input type="password" v-model="registerForm.password" style="width:25%" clearable></el-input>
        </el-form-item>
        <el-form-item label="Enter Password Again" label-width="20%" prop="againPassword" style="margin-left:25%">
          <el-input type="password" v-model="registerForm.againPassword" style="width:25%" clearable></el-input>
          <Icon type="ios-checkmark-circle" v-if="changeAgainFlag == 1" color="#35B449"/>
          <Icon type="md-close-circle" v-else-if="changeAgainFlag == 2" color="#f00"/>
        </el-form-item>
        <el-form-item style="margin-left:430px;">
          <el-button type="primary" style="margin-left: 18%; margin-top: 2%" @click="register">Register</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  import rules from '@/api/rules'
  export default {
    name:'bvo_wallet_register',
    data(){
      // 重复密码验证
      const pwdAgainCheck = async(rule, value, callback) => {
        if(this.registerForm.password != this.registerForm.againPassword){
          this.changeAgainFlag = 2;
          return callback(new Error('Password do not match with your first input!'));
        }else{
          this.changeAgainFlag = 1;
          callback()
        }
      };
      return{
        changeFlag: 0,
        changeAgainFlag: 0,
        ruleValidate: {
          password: [
            { required: true, trigger: 'blur' }
          ],
          againPassword: [
            { required: true, validator: pwdAgainCheck, trigger: 'blur' }
          ],
          account_name:[
            {required:true, message:'Account name is required',trigger:'blur'}
            ],
          email:[
            {required:true,message:'Email is required',trigger:'blur'},
            {validator:rules.FormValidate.Form().validateEmail,trigger:'blur'}
            ]
          ,
        },
        registerForm: {
          account_name:'',
          email:'',
          password:'',
          passwordAgain:''
        }
      }
    },
    methods:{
      register() {
        this.$store.dispatch('Register', this.registerForm).then((result) => {
          if (result.code == 200) {
            this.$message({
              type: 'info',
              message: `Register Succeeded`
            });
            console.log("注册")
            console.log(result.code)
            this.$router.push({
              name: 'bvo_wallet_login',
            })
          } else {
            this.$message({
              type: 'info',
              message: `Register Failed`
            })
          }
        })
      },
    }
  }
</script>

<style scoped>
  .main-content {
    padding-left: 30%;
    padding-right: 30%;
  }
</style>
