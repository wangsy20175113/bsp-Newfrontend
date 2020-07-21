<template>
  <el-container id="main-content" class="clearfix">
    <el-main>
      <el-form  class="register-container" ref="registerForm" :model="registerForm" :rules="ruleValidate" status-icon >
        <el-form-item label="Account Name" label-width="20%" prop="account_name" style="margin-left: 25%;margin-top: 8%; ">
          <el-input v-model="registerForm.account_name" style="width:25%" clearable></el-input>
        </el-form-item>
        <el-form-item label="Email" label-width="14%" prop="email" style="margin-left: 30%">
          <el-input  v-model="registerForm.email" style="width:25%" clearable></el-input>
        </el-form-item>

        <el-form-item label="Password" label-width="14%"prop="password" style="margin-left:30%">
          <el-input :type="passw" v-model="registerForm.password" style="width:25%" clearable>
            <i slot="suffix" :class="icon" @click="showPass"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="Enter Password Again" label-width="20%" prop="againPassword" style="margin-left:25%">
          <el-input :type="passw" v-model="registerForm.againPassword" style="width:25%" clearable>
            <i slot="suffix" :class="icon" @click="showPass"></i>
          </el-input>

        </el-form-item>
        <el-form-item style="margin-left:430px;">
          <el-button type="primary" style="margin-left: 18%; margin-top: 2%" @click="register()">Register</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  path: 'mvo-myWalletRegister',
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
      passw:"password",
      icon:"el-input__icon el-icon-view",
      changeFlag: 0,
      changeAgainFlag: 0,
      ruleValidate: {
        password: [
          { required: true, trigger: 'blur' }
        ],
        againPassword: [
          { required: true, validator: pwdAgainCheck, trigger: 'blur' }
        ],
        account_name:[{required:true, message:'Account name is required',trigger:'blur'}],
        email:[{required:true,message:'Email is required',trigger:'blur'}],
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
    showPass(){
      //点击图标是密码隐藏或显示
      if( this.passw=="text"){
        this.passw="password";
        //更换图标
        this.icon="el-input__icon el-icon-view";
      }else {
        this.passw="text";
        this.icon="el-input__icon el-icon-minus";
      };
    },
    register() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          console.log('===================================')
          console.log(this.addFormData)
          console.log('===================================')
          this.$store.dispatch('AddAccount', this.registerForm).then((result) => {
            if (result.code == 200) {
              alert("Register succeed!")
              this.$router.push({
                name: 'mvo-myWallet'
              })
            } else {
              alert("Register failed")
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .main-content {
    padding-left: 30%;
    padding-right: 30%;
  }




</style>
