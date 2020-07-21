<template>
<div>
 <!-- <div class="background">
   <img :src="imgSrc" width="100%" height="100%" alt="" />
 </div> -->
    <div class="login-container">
     <el-card class="box-card-component" >
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <div>
        <span style="width: 70px; float: left"><el-button type="danger" :disabled="verifyInputDisable" @click="checkVerifyCode">verify</el-button></span>
        <span style="float: left; margin-left: 10px"><el-input type="text" id="verifyCodeInput" v-model="verifyCode" :disabled="verifyInputDisable"></el-input></span>
        <span style="margin-left: 20px"><img  title="click to refresh" @click="refresh_img" :src="img_src"/></span>
      </div>
      <el-button :loading="loading" type="danger" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div style="position:relative">
        <br>

        <el-button class="thirdparty-button" type="danger" @click="showDialog=true">
          sign up
        </el-button>
      </div>
    </el-form>
    </el-card>
    </div>
    <el-dialog title="Create Your Account" :visible.sync="showDialog">
      <el-form :model='signUpUserForm'  ref='signUpUserForm'  class='' :rules="signUpUserFormRule">

        <el-form-item label="user name" label-width="130px" prop="username">
          <el-col :span="12">
            <el-input type="text" v-model="signUpUserForm.username" autocomplete="off" placeholder="User Name">
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="password" label-width="130px"  prop='password'>
          <el-col :span="12">
            <el-input type="text" v-model="signUpUserForm.password" autocomplete="off" placeholder="Password" show-password>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="real name" label-width="130px"  prop='real name'>
          <el-col :span="12">
            <el-input type="text" v-model="signUpUserForm.name" autocomplete="off" placeholder="Real Name" >
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="role" label-width="130px"  prop='role_id'>
          <el-col :span="12">
            <el-cascader
              :options="roleList"
              v-model='signUpUserForm.role_id'
              style="float: left"
            ></el-cascader>
          </el-col>
        </el-form-item>

        <el-form-item label="email" label-width="130px"  prop='email'>
          <el-col :span="12">
            <el-input type="text" v-model="signUpUserForm.email" autocomplete="off" placeholder="Email">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="phone" label-width="130px"  prop='phone'>
          <el-col :span="12">
            <el-input type="text" v-model="signUpUserForm.phone" autocomplete="off" placeholder="Phone">
            </el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot = 'footer' class = 'dialog-footer'>
        <el-button type = 'primary' size='small' @click="addUser">Sign Up</el-button>
        <el-button type = 'danger' size='small' @click.native = "showDialog = false">Close</el-button>
       </span>
    </el-dialog>
</div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'
import { getAllRoles } from '@/api/role_permission'
export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: 'username cannot be empty' }],
        password: [{ required: true, trigger: 'blur', message: 'password cannot be empty'}]
      },
      img_src: 'http://localhost:8088/user/getVerifyCode',
      roleList: [],
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      signUpUserForm: {
        username: '',
        password: '',
        name: '',
        role_id: '',
        email: '',
        phone: ''
      },
      signUpUserFormRule: {
        username: [{ required: true, message: 'username cannot be null', trigger: 'blur' }],
        password: [{ required: true, message: 'password cannot be null', trigger: 'blur' }],
        role_id: [{ required: true, message: 'role cannot be null', trigger: 'blur' }],
      },
      verifyCode: '',
      verifyInputDisable: false,
      verifyPass: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    this.getAllRoles()
    this.refresh_img()
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      if (!this.verifyPass) {
        this.$message({
          type: 'error',
          message: 'You need to verify first'
        })
        return
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    getAllRoles() {
      this.$store.dispatch('role_permission/getAllRoles').then((result) => {
       // console.log("1===================", result)
        let list = result.data
        for (let i = 0; i < list.length; i++) {
          let role = new Object()
          role.value = list[i].role_id
          role.label = list[i].role_name
          // console.log("2================", role)
          this.roleList.push(role)
        }
      })
      // console.log(this.roleList)
    },
    addUser() {
      if (Array.isArray(this.signUpUserForm.role_id))
        this.signUpUserForm.role_id = this.signUpUserForm.role_id[0]
      this.$refs.signUpUserForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("user/addUser", this.signUpUserForm).then(result => {
            if (result.code == 200) {
              this.$message({
                type: 'info',
                message: `Succeeded`
              })
              this.showDialog = false
              this.signUpUserForm = {
                username: '',
                password: '',
                name: '',
                role_id: '',
                email: '',
                phone: ''
              }
            } else {
              this.$message({
                type: 'error',
                message: result.message
              })
            }
          })
        }
      })
    },
    refresh_img() {
      console.log("1111111111111111")
      let num=Math.ceil(Math.random()*10);
      this.img_src = 'http://localhost:8088/user/getVerifyCode?' + num
    },
    checkVerifyCode() {
      this.$store.dispatch("user/getVerifyCodeNumber").then(result => {
        console.log(result)
        if (this.verifyCode.toLowerCase() === result.data.toLowerCase()) {
          this.verifyInputDisable = true
          this.verifyPass = true
          this.$message({
            type: 'success',
            message: 'verify success'
          })
        } else {
          this.refresh_img()
          this.$message({
            type: 'error',
            message: 'wrong verify code'
          })
        }
      })
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
#verifyCodeInput {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-left: 10px;
  float: left;
  width: 240px;
  height: 40px;
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color:black;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#f02308;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  z-index:1;
  position: absolute;
  min-height: 100%;
  height:100%;
  width: 100%;
  background-image: url('../../assets/login/photo.jpg');
  background-repeat:no-repeat;
  width:100%;
  height:100%;

  min-width:973px;
  background-attachment:fixed;
  background-size:100% auto;
  overflow: hidden;

  .box-card-component{
    width:570px;
    height:500px;
    margin-top:5%;
    margin-left: 29%;
    opacity: 0.9;
  
  }
  .login-form {
   
    width: 520px;
    max-width: 100%;
    padding: 20% 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color:black;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
   
    .title {
      font-size: 26px;
      color:black;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: black;;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>