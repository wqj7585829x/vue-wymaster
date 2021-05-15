<template>
  <div class="Header">
    <div class="Header_left">
      <span
        ><strong>e加家物业管理系统 欢迎您!</strong
        ><em>{{ getTodayDate() }}</em></span
      >
    </div>
    <div class="Header_right">
      <!--切换集团总部 v-if="groupUser==1"-->
      <section class="goto" v-if="groupUser == 1" @click="goto">
        <img :src="require('@/assets/comImgs/gotoicon.png')" />前往总部
      </section>
      <!-- 小区列表  -->
      <section class="HeaderPlotSpan">
        <div class="username_wrapper">
          <span class="user-avator"
            ><img :src="require('@/assets/comImgs/topNav_community.png')"
          /></span>
          <span class="user_info">
            <span>
              <el-select
                :value="currentPlot"
                filterable
                placeholder="请选择"
                @change="userPlotChange"
                class="currentPlotClass"
              >
                <el-option
                  v-for="(item, index) in userPlot"
                  :key="index"
                  :label="item.GLCNAME"
                  :value="item.GLCNAME"
                >
                </el-option>
              </el-select>
            </span>
          </span>
        </div>
      </section>
      <!-- 用户头像 -->
      <!-- el-dropdown -->
      <el-dropdown trigger="click">
        <div class="username_wrapper">
          <span class="user-avator"
            ><img :src="require('@/assets/comImgs/topNav_user.png')"
          /></span>
          <span class="user_info"
            ><span>{{ userName }}</span
            ><i class="el-icon-arrow-down el-icon--right"></i
          ></span>
        </div>
        <el-dropdown-menu slot="dropdown" class="dropdownlist userlist">
          <el-dropdown-item
            ><span @click="showChangePW" class="lispan"
              ><em class="updatePWDICON"></em>修改密码</span
            ></el-dropdown-item
          >
          <el-dropdown-item
            ><span @click="logOut" class="lispan"
              ><em class="LogoutICON"></em>退出登录</span
            ></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 皮肤图标 -->
      <el-dropdown trigger="click">
        <!-- <span class="user_guest"><img :src="require('@/assets/comImgs/topNav_color.png')" title="皮肤更换">皮肤</span> -->
        <div class="username_wrapper">
          <span class="user-avator user_guest"
            ><img :src="require('@/assets/comImgs/topNav_color.png')"
          /></span>
          <span class="user_info"
            ><span>皮肤</span><i class="el-icon-arrow-down el-icon--right"></i
          ></span>
        </div>
        <el-dropdown-menu slot="dropdown" class="dropdownlist themelist">
          <el-dropdown-item
            ><span @click="changeTheme('theme1')" class="lispan"
              >白色</span
            ></el-dropdown-item
          >
          <el-dropdown-item
            ><span @click="changeTheme('theme2')" class="lispan"
              >蓝色</span
            ></el-dropdown-item
          >
          <el-dropdown-item
            ><span @click="changeTheme('theme3')" class="lispan"
              >粉色</span
            ></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 二维码图标,有quickPayParams字段才显示二维码 -->
      <el-dropdown v-if="quickPayParams.dbName">
        <div
          class="username_wrapper"
          @click="ercodeClick"
          title="h5快捷缴费二维码"
        >
          <span class="user-avator user_guest"
            ><img :src="require('@/assets/comImgs/ecrodeIcon.png')"
          /></span>
          <span class="user_info"
            ><span>二维码</span><i class="el-icon-download el-icon--right"></i
          ></span>
        </div>
        <el-dropdown-menu slot="dropdown"> </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改密码 弹框 单列布局 start-->
    <el-dialog
      v-dialogDrag
      title="修改密码"
      :visible.sync="dialogPasswordVisible"
      class="el-dialog-single"
      :close-on-click-modal="false"
    >
      <el-form
        :model="passwordForm"
        :rules="passwordRules"
        ref="passwordForm"
        label-width="78px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="旧密码：" prop="password">
              <el-input
                type="password"
                v-model="passwordForm.password"
                placeholder="请输入旧密码"
                auto-complete="off"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="新密码：" prop="newPassword">
              <el-input
                type="password"
                v-model="passwordForm.newPassword"
                placeholder="请输入新密码"
                auto-complete="off"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="updatePassword"
          >确 定</el-button
        >
        <el-button @click="dialogPasswordVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 弹框 end -->

    <!-- 弹框 begin 暂不用 -->
    <!-- <Permit :show.sync="show"></Permit> -->
    <!-- 弹框 end -->

    <!-- 二维码弹框 start -->
    <el-dialog
      title="二维码"
      :visible.sync="dialogVisible"
      width="420px"
      @close="dialogVisible = false"
    >
      <div class="epic">
        <div class="ercodepic">
          <div id="poster" ref="poster">
            <span
              ><img
                :src="require('@/assets/comImgs/ercode.png')"
                class="ercodeimg"
            /></span>
            <div id="qrcode" ref="qrcode" class="unit"></div>
            <span><img :src="LogoImg" class="LogoImg" /></span>
            <span class="plotName">{{ currentPlot }}</span>
          </div>
        </div>
        <div class="ercodepicNew">
          <img class="poster" :src="dataURL" />
        </div>
      </div>
    </el-dialog>
    <!-- 二维码弹框 end -->
  </div>
</template>

<script>
import { removeToken } from "@/utils/Auth";
import { logout, updatePassword } from "@/api/User/User";
import { mapGetters } from "vuex";
import store from "@/store";
// import config from '@/utils/config'
import QRCode from "qrcodejs2";
import html2canvas from "html2canvas";
// import Permit from "./Permit";//授权暂不用

export default {
  computed: {
    ...mapGetters([
      "userName",
      "currentPlot",
      "userPlot",
      "groupUser",
      "quickPayParams",
    ]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot,groupUser
  },
  inject: ["reload"], //注入App里的reload方法---子级接收
  data() {
    return {
      show: false, //授权信息 显示
      dialogVisible: false, //二维码弹窗
      LogoImg: "",
      dataURL: "",
      passwordForm: {
        password: "",
        newPassword: "",
      },
      passwordRules: {
        password: [
          {
            required: true,
            message: "旧密码不能为空",
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            required: true,
            message: "新密码不能为空",
            trigger: "blur",
          },
        ],
      },
      loading: false, // 转圈
      dialogPasswordVisible: false, //修改密码 弹框 显示
    };
  },
  mounted() {
    if (localStorage.getItem("theme")) {
      //判断选中的皮肤
      this.changeTheme(localStorage.getItem("theme"));
    } else {
      this.changeTheme("theme"); //默认颜色
    }
  },
  methods: {
    ercodeClick() {
      setTimeout(() => {
        this.qrcode();
      }, 500);
      this.dialogVisible = true;
    },
    qrcode() {
      // alert(this.quickPayParams)
      this.LogoImg = document.getElementById("LogoImg").src;
      document.getElementById("qrcode").innerHTML = "";
      // debugger
      if (this.quickPayParams.dbName) {
        let qrcode = new QRCode("qrcode", {
          width: 250, // 设置宽度，单位像素
          height: 250, // 设置高度，单位像素
          // text: config.q5Url+'?dbName='+this.quickPayParams.dbName+'&GLCID='+this.quickPayParams.GLCID+'&YXDID='+this.quickPayParams.YXDID+'&JT_ZJ='+this.quickPayParams.JT_ZJ+''   // 设置二维码内容或跳转地址
          text:
            this.quickPayParams.q5Url +
            "?dbName=" +
            this.quickPayParams.dbName +
            "&GLCID=" +
            this.quickPayParams.GLCID +
            "&YXDID=" +
            this.quickPayParams.YXDID +
            "&JT_ZJ=" +
            this.quickPayParams.JT_ZJ +
            "", // 设置二维码内容或跳转地址
        });
        this.toImage(); //420*595
      }
    },
    toImage() {
      const _this = this;
      setTimeout(() => {
        // document.body.appendChild(this.$refs.Extension)

        // 创建一个新的canvas
        const _canvas = _this.$refs.poster;
        // 此处用于解决截图不清晰问题，将生成的canvas放大，然后再填充到原有的容器中就会清晰
        const width = _canvas.offsetWidth;
        const height = _canvas.offsetHeight;
        const canvas2 = document.createElement("canvas");
        const scale = 1;
        canvas2.width = width * scale;
        canvas2.height = height * scale;
        const context1 = canvas2.getContext("2d");
        if (context1) {
          context1.scale(scale, scale);
        }
        const opts = {
          scale,
          canvas: canvas2,
          // logging: true, //日志开关，便于查看html2canvas的内部执行流程
          width,
          height,
          // 【重要】开启跨域配置
          useCORS: true,
        };
        html2canvas(_canvas, opts).then((canvas) => {
          const context = canvas2.getContext("2d");
          if (context) {
            context.scale(1, 1);
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
          }
          // canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
          _this.dataURL = canvas.toDataURL();
          // _this.Extensionshow = false
        });
      }, 100);
    },
    goto() {
      //切换集团端
      if (location.href.indexOf("/wy/") > -1) {
        var url = location.href.replace("/wy/", "/jt/");
        var indexsite = url.indexOf("/jt/");
        var reurl = url.substring(0, indexsite);
        window.location.href = reurl + "/jt";
      }
      // window.location.href=location.protocol +"//" + location.host+"/jt"
    },
    //更换皮肤--第一步
    changeTheme(theme) {
      window.document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    },
    //点击右上角下拉小区
    userPlotChange(value) {
      //下拉小区重置vuex中的tagsview数据
      var item = {};
      this.userPlot.forEach((its) => {
        if (its.GLCNAME === value) {
          item = its;
        }
      });
      this.$router.push("/"); //返回首页
      this.reload(); //调用provide父级，刷新APP.vue 路由router-view
      this.$store.state.tagsview.cachedViews = []; //下拉列表选中小区，清空tagsview 缓存数据
      this.$store.state.tagsview.visitedviews = [
        { name: "首页", path: "/Home" },
      ]; //下拉列表选中小区，清空tagsview 只显示首页
      sessionStorage.setItem("plotItem", JSON.stringify(item)); //保存选中下拉小区
      store.dispatch("GetInfo", { ...item }).then((response) => {
        // console.log(this.$store.state.user.previewButtons);
        sessionStorage.setItem(
          "buttenpremissions",
          JSON.stringify(response.data.previewButtons)
        ); //获取按钮权限sessionStorage--记住！！
        if (response.data.previewTree) {
          //重置新的左边菜单数据
          const previewTree = response.data.previewTree; ////左边菜单树
          store.dispatch("GenerateRoutes", { previewTree }).then(() => {
            // 生成可访问的路由表----//左边菜单传参第一步(点任何页面都会触发这个事情) 0
            if (store.getters.addRouters) {
              this.$router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            }
          });
        }
      });
      //切换其他小区月结---提示月结提示框
      sessionStorage.setItem("montFlag", true);
    },
    // 获取今日日期
    getTodayDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var day = date.getDay();
      var day_ary = ["日", "一", "二", "三", "四", "五", "六"];
      return (
        year +
        seperator1 +
        month +
        seperator1 +
        strDate +
        "  星期" +
        day_ary[day]
      );
    },

    // 修改密码 弹框 显示
    showChangePW() {
      this.dialogPasswordVisible = true;
    },

    // 修改密码
    updatePassword() {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          updatePassword(this.passwordForm).then((response) => {
            this.loading = false;
            if (response.returnStatus == "SUCCESS") {
              if (localStorage.getItem("password")) {
                localStorage.setItem("password", this.passwordForm.newPassword);
              }
              this.dialogPasswordVisible = false;
              this.passwordForm.password = "";
              this.passwordForm.newPassword = "";
            }
          });
        } else {
          return false;
        }
      });
    },

    // 退出系统
    logOut() {
      logout().then((response) => {
        this.$store.dispatch("removeUsername"); //清空userName缓存数据
        removeToken();
        sessionStorage.clear();
        this.$router.push({ path: "/Login" });
      });
    },

    // 授权信息
    // showPermit() {
    //   this.show = true;
    // }
  },
  components: {
    QRCode,
    // Permit
  },
};
</script>

<style lang="scss">
.userlist {
  margin-top: 6px !important;
}
.themelist {
  margin-top: 6px !important;
}
.lispan {
  display: block;
}

.Header {
  z-index: 1;
  background: #fff;
  width: 100%;
  min-width: 660px;
  height: 40px;
  overflow: hidden;
  .Header_left {
    display: inline;
    float: left;
    span {
      display: block;
      padding-top: 10px;
      padding-left: 28px;
      strong {
        color: #1a1a1a;
        font-size: 16px;
        font-weight: normal;
        margin-right: 20px;
      }
      em {
        color: #1a1a1a;
        font-size: 14px;
      }
    }
  }
  .Header_right {
    float: right;
    margin-right: 26px;
    margin-top: 5px;
    margin-bottom: 20px;
  }
  .goto {
    width: 100px;
    display: inline-block;
    font-size: 14px;
    vertical-align: 4px;
    cursor: pointer;
    img {
      vertical-align: -4px;
      margin-right: 10px;
    }
  }

  .HeaderPlotSpan {
    display: inline-block;
    .el-input__icon {
      line-height: 30px !important;
    }
  }
  .username_wrapper {
    cursor: pointer;
    img {
      margin-left: 8px;
    }
    .user-avator img {
      width: 18px;
    }
    .user_info {
      vertical-align: 4px;
      margin-left: 5px;
    }
    .user_guest {
      img {
        cursor: pointer;
        width: 18px;
      }
    }
  }
  .el-popper {
    margin-top: 0;
  }
  .el-popper[x-placement^="bottom"] {
    margin-top: 0;
  } //打包后冲突css
  .el-dropdown {
    color: #1a1a1a;
    font-size: 14px;
    line-height: 31px;
    margin-left: 25px;
  }
  .el-dropdown-menu {
    width: 130px;
    background: #fff;
    border: 0;
    padding: 0;
  }
  .dropdownlist {
    top: 48px;
  }
  .dropdownlist span {
    display: inline-block !important;
    width: 100% !important;
    /* width: 170px; */
    height: 48px;
    line-height: 48px;
    color: #262626;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
  }
  .dropdownlist span img {
    vertical-align: -4px;
    margin-right: 14px;
  }

  .plotlist {
    width: 150px;
    max-height: 290px;
    overflow: auto;
  }
  .themelist {
    width: 70px;
    max-height: 290px;
    overflow: auto;
  }
  //窗口小于730px隐藏顶部左边信息
  // @media only screen and (max-width:730px){
  //   .Header_left{ display:none}
  // }
  .screensize .Header_left {
    display: none;
  }

  .el-form-item__content {
    margin-left: 70px;
  }
  .el-dropdown-menu__item {
    .updatePWDICON {
      background: url("../../../assets/comImgs/topNav_password_black.png")
        no-repeat;
      width: 14px;
      height: 14px;
      display: inline-block;
      margin-right: 10px;
      vertical-align: -2px;
    }
    .LogoutICON {
      background: url("../../../assets/comImgs/topNav_exit_black.png") no-repeat;
      width: 14px;
      height: 14px;
      display: inline-block;
      margin-right: 10px;
      vertical-align: -2px;
    }
    &:hover {
      .updatePWDICON {
        background: url("../../../assets/comImgs/topNav_password_white.png")
          no-repeat;
      }
      .LogoutICON {
        background: url("../../../assets/comImgs/topNav_exit_white.png")
          no-repeat;
      }
    }
  }
}

.ercodepic {
  position: relative;
  width: 420px;
  height: 595px;
  .unit {
    position: absolute;
    z-index: 10;
    top: 213px;
    left: 86px;
    width: 250px;
    height: 250px;
  }
  .ercodeimg {
    width: 420px;
    height: 595px;
  }
  .LogoImg {
    position: absolute;
    z-index: 10;
    top: 0px;
    left: 10px;
  }
  .plotName {
    position: absolute;
    z-index: 10;
    top: 70px;
    left: 0px;
    right: 0px;
    text-align: center;
    color: #262626;
    font-size: 34px;
  }
}
.epic {
  position: relative;
}
.ercodepicNew {
  width: 420px;
  height: 595px;
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
