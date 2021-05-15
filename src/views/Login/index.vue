<template>
  <!-- 登录 -->
  <div>
    <!-- 众合百易ui界面start -->
    <section class="login-container" v-if="LoginCompany" :style="styleObject">
      <!-- login 内容 -->
      <section class="login-main">
        <el-row>
          <!-- 左边： 文字 图片 -->
          <el-col :xs="1" :sm="12">
            <div class="picAD">
              <img :src="pic" />
            </div>
          </el-col>
          <!-- 右边： login 账号，密码-->
          <el-col :xs="22" :sm="8">
            <div class="login_main">
              <div class="header_Top"><img :src="logo" /><i></i><em>后台管理系统</em></div>
              <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="80px">
                <el-form-item prop="account" label="用户名">
                  <el-input type="text" v-model="loginForm.account" placeholder="请输入账号" class="account"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密 码">
                  <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" class="password" @keyup.enter.native="handleLogin"></el-input>
                </el-form-item>
                <el-checkbox v-model="checked" class="CheckR">记住密码</el-checkbox>
                <el-form-item class="item_button" label-width="0">
                  <el-button type="primary" :loading="loading" @click="handleLogin">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </section>
      <!-- login 底部 -->
      <section class="login-footer">技术支持：厦门市众合百易科技有限公司</section>
    </section>
    <!-- 众合百易ui界面end -->

    <!-- 特房ui界面start -->
    <section class="login-container_TF" v-if="LoginCompany_TF">
      <div class="login_main_TF">
        <div class="header_Top"><img src="~@/assets/loginImgs/tefang_logo.png" /><em>服务管理平台</em></div>
        <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="80px">
          <el-form-item prop="account" label="用户名">
            <el-input type="text" v-model="loginForm.account" placeholder="请输入账号" class="account"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密 码">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" class="password" @keyup.enter.native="handleLogin"></el-input>
          </el-form-item>
          <el-checkbox v-model="checked" class="CheckR">记住密码</el-checkbox>
          <el-form-item class="item_button" label-width="0">
            <el-button type="primary" :loading="loading" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
    <!-- 特房ui界面end -->
  </div>
</template>

<script>
  import {login} from "@/api/User/User"
  import {setToken, getToken, removeToken} from "@/utils/Auth"
  // import { Message } from "element-ui";
  // import { permitCheckMessage } from "@/api/Permit/Permit";

  export default {
    name: "Login",
    data() {
      return {
        styleObject: {background: ""},
        styleloginHeader: {background: ""},
        logogray: require("../../assets/loginImgs/logoGray.png"),
        pic: require("../../assets/loginImgs/illustrate.png"),
        logo: require("../../assets/comImgs/zhbylogo.png"),
        LoginCompany: true, //默认登录显示众合百易ui界面
        LoginCompany_TF: false, //特房ui登录界面默认隐藏
        loginForm: {
          account: "",
          password: "",
        },
        loginRules: {
          account: [
            {
              required: true,
              message: "请输入账号",
              trigger: "blur",
            },
          ],
          password: [
            {
              required: true,
              message: "请输入密码",
              trigger: "blur",
            },
          ],
        },
        loading: false, //登录转圈
        checked: false, //记住密码
      }
    },
    created() {
      sessionStorage.removeItem("buttenpremissions") //清除按钮权限
    },
    mounted() {
      //console.log(this.$math.add(5.3,66.1))//求和精度问题
      //背景颜色与文本自定义start
      // var startColor="#5d71ff";//#5d71ff
      // var endColor="#55bafe"//#55bafe
      var loginReplace = JSON.parse(localStorage.getItem("arrmenuName"))
      if (loginReplace.length) {
        //判断如果数组不为空
        loginReplace.forEach(item => {
          if (item.type == 2) {
            if (item.code == "loginbg" && item.value != "") {
              //登录页背景替换
              var startColor = ""
              var endColor = ""
              if (item.value.indexOf(",") > -1) {
                startColor = item.value.split(",")[0]
                endColor = item.value.split(",")[1]
              } else {
                startColor = item.value
                endColor = item.value
              }
              this.$set(this.styleObject, "background", `linear-gradient(135deg,${startColor} 0%,${endColor} 100%)`)
            }
            if (item.code == "logo" && item.value != "") {
              //左上角logo替换
              this.logo = item.value
            }

            if (item.code == "pic" && item.value != "") {
              //图片
              this.pic = item.value
            }
          }
        })
      }
      //背景颜色与文本自定义end
      if (location.hostname.indexOf("xmtfwy") > -1) {
        //xmtfwy
        this.LoginCompany_TF = true //显示特房-ui
        this.LoginCompany = false //隐藏zhby-ui
      }
      var account = localStorage.getItem("account")
      var password = localStorage.getItem("password")
      if (account && account != null) {
        this.loginForm.account = account
      }
      if (password && password != null) {
        this.loginForm.password = password
        this.checked = true
      }
    },
    methods: {
      // 登录
      handleLogin() {
        //先清除token
        if (getToken()) {
          //如果有token先删除token
          removeToken()
        }
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            login(this.loginForm).then(response => {
              this.loading = false
              if (this.checked) {
                localStorage.setItem("account", this.loginForm.account)
                localStorage.setItem("password", this.loginForm.password)
              } else {
                localStorage.removeItem("password")
              }
              this.$store.state.tagsview.visitedviews = [] //清空tagsview标签
              this.$store.dispatch("removeUsername") //清空userName缓存数据
              setToken(response.x_token) //设置token
              if (response.data.groupUser == 1 && location.href.indexOf("/wy/") != -1) {
                //有集团端权限直接---返回集团端
                var url = location.href.replace("/wy/", "/jt/")
                window.location.href = url
                //window.location.href=location.protocol +"//" + location.host+"/jt"
              } else {
                this.$router.replace("/").catch(() => {}) //catch加这个防止显示重定向报错
                sessionStorage.setItem("montFlag", true) //登录后提示月结提示框
              }
              //this.permitCheckMessage();//授权信息
            })
          } else {
            return false
          }
        })
      },
      // 重置
      handleReset() {
        this.loginForm.account = ""
        this.loginForm.password = ""
      },
      // 是否授权提示
      // permitCheckMessage() {
      //   permitCheckMessage().then(response => {
      //     var data = response.returnData[0];
      //     if (data.status == 0) {
      //       sessionStorage.setItem("permitShow", "true"); //授权展示
      //       this.$router.push({ path: "/" }); // 跳转首页
      //       setTimeout(function() {
      //         Message({
      //           message: data.showMessage,
      //           type: "error",
      //           duration: 5 * 1000
      //         });
      //       }, 1000);
      //     } else {
      //       this.$router.push({ path: "/" }); // 跳转首页
      //     }
      //   });
      // }
    },
  }
</script>

<style lang="scss">
  .login-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0e76f7 0%, #4997f7 100%);
    .el-form-item {
      margin-bottom: 20px;
    }
    .picAD {
      min-width: 500px;
      width: 60%;
      height: 60%;
      margin-left: 10%;
      margin-top: 10%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login_main {
      // min-width: 500px;
      background: #fff;
      border-radius: 8px;
      // margin-right:25%;
      margin-top: 20%;
      .header_Top {
        margin: 10% 5% 10% 10%;
        img {
          max-height: 70px;
          margin-top: 10%;
          vertical-align: -25px;
        }
        i {
          width: 1px;
          height: 27px;
          background: #999999;
          margin-left: 5%;
          margin-right: 5%;
          display: inline-block;
          vertical-align: -3px;
        }
        em {
          color: #262626;
          font-size: 30px;
        }
      }
      @media screen and (max-width: 1366px) {
        .header_Top {
          margin: 10% 5% 10% 10%;
          img {
            max-height: 50px;
            margin-top: 10%;
            vertical-align: -14px;
          }
          i {
            width: 1px;
            height: 27px;
            background: #999999;
            margin-left: 5%;
            margin-right: 5%;
            display: inline-block;
            vertical-align: -9px;
          }
          em {
            color: #262626;
            font-size: 16px;
          }
        }
      }
      .login-form {
        padding: 0 10% 10% 10%;
        .el-form-item__label {
          margin-top: 5px;
        }
        .el-input__inner {
          background: rgba(225, 226, 230, 1);
          border-radius: 4px;
          height: 50px !important;
        }
        .CheckR {
          width: 100%;
          text-align: right;
        }
        .item_button {
          width: 100%;
          button {
            width: 100%;
            font-size: 20px;
            background: rgba(23, 122, 248, 1);
            height: 50px;
            border-radius: 8px;
            margin-top: 10%;
          }
        }
      }
    }
  }

  .login-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
  }
</style>
<style lang="scss">
  //特房登录ui
  .login-container_TF {
    background: url(~@/assets/loginImgs/TFWyLogin_bg.png) #ab051f no-repeat center;
    background-size: 100% 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    .login_main_TF {
      position: absolute;
      top: 15%;
      right: 10%;
      background: #fff;
      border-radius: 10px;
      width: 500px;
      height: 480px;
      .header_Top {
        margin: 30px 0px 52px 50px;
        img {
          margin-right: 28px;
          float: left;
        }
        em {
          float: left;
          margin-top: 20px;
          padding-left: 28px;
          border-left: 1px solid #999999;
          font-size: 24px;
          color: #262626;
        }
      }
      .login-form {
        clear: both;
        width: 400px;
        margin: 0 auto;
        padding-top: 2px;
        .el-form-item {
          margin-top: 40px;
          margin-bottom: 0px;
        }
        .el-form-item__label {
          margin-top: 5px;
        }
        .el-input__inner {
          background: rgba(225, 226, 230, 1);
          border-radius: 4px;
          height: 50px !important;
        }
        .CheckR {
          float: right;
          margin-top: 41px;
        }
        .item_button button {
          width: 400px;
          height: 50px;
          line-height: 50px;
          color: #fff;
          background: rgba(199, 48, 39, 1);
          border-radius: 4px;
          border: 1px solid #c73027;
          font-size: 24px;
          margin-top: 40px;
        }
      }
    }
  }
</style>
