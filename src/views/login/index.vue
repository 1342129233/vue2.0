<template>
  <el-container class="login-container">
    <el-switch v-model="toggleParticles" inactive-color="#ff4949">
    </el-switch>
    <el-button class="show-account" type="text" @click="accountTip">提示帐号信息</el-button>
    <el-card class="animated flipInY">
      <div slot="header" class="el-card-header">
        <lang-select class="lang-select"></lang-select>
        <div style="clear: both;"></div>
        <img src="../../../static/image/login-logo.png" alt="">
        <h2 class="login-title">{{$t('login.title')}}</h2>
      </div>
      <el-form :rules="rules" :model="loginForm" ref="loginForm" label-width="60px">
        <el-form-item :label="$t('login.account')" prop="username" style="position:relative">
          <el-input type="text" v-model="loginForm.username" @keyup.enter.native="goToPwdInput"></el-input>
          <span class="svg-container svg-container_user">
            <svg-icon icon-class="user" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('login.password')" prop="pwd">
          <el-input type="password" v-model="loginForm.pwd" @keyup.enter.native="onLogin" ref="pwd"></el-input>
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('login.remember')" label-width="80px">
          <el-switch v-model="remember"></el-switch>
        </el-form-item>
        <el-button type="primary" @click="onLogin('loginForm')" :loading='loading'>{{$t('login.login')}}</el-button>
      </el-form>
    </el-card>
    <!-- particles.js container -->
    <div id="particles"></div>
  </el-container>
</template>
<script>
  // import { isValidUsername } from '@/utils/validate'
  import LangSelect from '@/components/lang-select'
  // import { saveToLocal, loadFromLocal } from '@/common/local-storage'
  import { loadFromLocal } from '@/common/local-storage'
  import { mapActions, mapState } from 'vuex'
  /* eslint-disable*/
  import particles from 'particles.js'
  export default {
    components: {
      LangSelect
    },
    data() {
      // username 验证
      const validateUsername = (rule, value, callback) => {
        if (value.length == 0) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      // pwd 验证
      const validatePwd = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        // 粒子开关
        toggleParticles: false,
        loginForm: {
          username: '',
          pwd: ''
        },
        remember: false,
        // loading: false,
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { required: true, trigger: 'blur', validator: validateUsername },
            { required: true, trigger: 'change', validator: validateUsername }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { required: true, trigger: 'blur', validator: validatePwd },
            { required: true, trigger: 'change', validator: validatePwd }
          ]
        }
      }
    },
    created() {
      // 初始化时读取localStorage用户信息
      if (loadFromLocal('remember', false)) {
        this.loginForm.username = loadFromLocal('username', '')
        this.loginForm.pwd = loadFromLocal('password', '')
      } else {
        this.loginForm.username = ''
        this.loginForm.pwd = ''
      }
    },
    methods: {
      ...mapActions([
        'login',
      ]),
      // 用户名输入框回车后切换到密码输入框
      goToPwdInput() {
        this.$refs.pwd.$el.getElementsByTagName('input')[0].focus();
      },
      // 登录操作
      onLogin() {
        this.$refs.pwd.$el.getElementsByTagName('input')[0].blur()
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // this.loading = true;
            let userInfo = {
              'username': this.loginForm.username,
              'password': this.loginForm.pwd
            }
            this.login(userInfo).then(res=>{
              if(res.code === 0){
                console.log(res)
                // this.store.commit('SET_LOADING', false)
                // this.loading = false;
                this.$refs.loginForm.resetFields();
                this.$router.push(res.data.user.multi_enterprise?'/enterprise':{path: '/home', query: {eid: res.data.user.manage_eid}})
              }else{

              }
            })
          } else {
            return false
          }
        })
      },
      accountTip() {
        this.$notify({
          title: '账号：admin',
          dangerouslyUseHTMLString: true,
          message: '<strong>密码：<i>666666</i></strong>',
          type: 'success',
          position: 'bottom-left'
        })
      }
    },
    computed: {
      ...mapState({
        loading: state => state.common.boo
      })
    },
    watch: {
      toggleParticles(val) {
        if(val) {
          particlesJS('particles', {
            "particles": {
              "number": {
                "value": 15
              },
              "color": {
                "value": "random"
              },
              "shape": {
                "type": ["star", "image"],
                "stroke": {
                  "width": 0,
                  "color": "yellow"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "https://neveryu.github.io/avatar/avatar.png",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 1,
                "random": false,
                "anim": {
                  "enable": true,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 10,
                "random": true,
                "anim": {
                  "enable": true,
                  "speed": 10,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ccc",
                "opacity": 0.4,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 2,
                "direction": "random",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 1200
                }
              }
            },
            "interactivity": {
              // "detect_on": "canvas",
              "detect_on": "window",
              "events": {
                "onhover": {
                  "enable": false,
                  // "mode": "repulse"
                  "mode": "grab"
                },
                "onclick": {
                  "enable": false,
                  "mode": "repulse"
                  // "mode": "push"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 400,
                  "line_linked": {
                    "opacity": 1
                  }
                },
                "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            }
          })
        } else {
          document.getElementById('particles').innerHTML = ''
        }
      }
    },
    mounted() {
      this.accountTip()
    }
  }
</script>
<style scoped lang="stylus">
  .login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: mix(#494166, #424b50) url('../../../static/image/login-bg.jpg') center no-repeat;
    background-size: cover;
    overflow: hidden;
    .show-account {
      position: absolute;
      left: 15px;
      bottom: 20px;
      color: red;
    }
    .el-card {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -300px 0 0 -200px;
      width: 400px;
      height: 450px;
      background: #fff;
      .el-card-header {
        text-align: center
        .lang-select {
          float right
        }
      }
      .login-title {
        margin: 0;
        text-align: center;
      }
      .el-input /deep/ .el-input__inner {
        text-indent: 12px;
      }
      .svg-container {
        position: absolute;
        top: 0;
        left: 5px;
        color: #889aa4;
        &_user {
          font-size: 20px;
        }
        &_password {
          left: 7px;
          font-size: 16px;
        }
      }
      .el-button--primary {
        width: 100%;
      }
    }
  }
  #particles {
    width: 100%;
    height: 100%;
    background-color: transparent;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
</style>
