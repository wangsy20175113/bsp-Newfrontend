<template>
  <el-container id="main-content" class="clearfix">
    <el-main>
      <el-form class="login-container" label-position="left" label-width="0px">
        <h3 class="login_title">Wallet Login</h3>
        <el-form-item>
          <el-input type="text" v-model="loginForm.account_name" auto-complete="off" placeholder="Account Name" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-input :type="passw" v-model="loginForm.password" auto-complete="off" placeholder="Password" clearable>
            <i slot="suffix" :class="icon" @click="showPass"></i>
          </el-input>
        </el-form-item>

        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 100%;border: none; font-family:sans-serif"  v-on:click="login">Login</el-button>
        </el-form-item>
        <el-row style="text-align: center; margin-top: -5%;font-family:sans-serif; margin-bottom: 5%">
          <el-link type="primary" @click="doRegister()">Have no account?  Click here to register</el-link>
        </el-row>
      </el-form>

    </el-main>

  </el-container>

</template>

<script>
  export default {
    path: 'bvo-myWallet',
    data(){
      return{
        passw:"password",
        icon:"el-input__icon el-icon-view",
        loginForm: {
          account_name:'',
          password:''
        }
      }
    },
    methods:{
      showPass(){
        if( this.passw=="text"){
          this.passw="password";
          this.icon="el-input__icon el-icon-view";
        }else {
          this.passw="text";
          this.icon="el-input__icon el-icon-minus";
        };
      },
      login() {
        this.$store.dispatch('WalletLogin', this.loginForm).then((result) => {
          if (result.code == 200) {
            this.$message({
              type: 'info',
              message: `Login Succeeded`
            })
            console.log("---钱包登录--");
            console.log(JSON.stringify(result));
            this.$router.push({
              name: 'bvo_wallet_fund',
              query:{
                'buyer_id':result.data.buyer_id,
                'account_name':result.data.account_name
              }
            })
          } else {
            this.$message({
              type: 'info',
              message: `Login Failed`
            })
          }
        })
      },
      doRegister() {
        this.$router.push({
          name: 'bvo_wallet_register',
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
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .login_title {
    margin: 0px auto 10% auto;
    text-align: center;
    color: #505458;
  }
</style>
