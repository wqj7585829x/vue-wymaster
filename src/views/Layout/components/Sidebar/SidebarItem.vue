<template>
  <div class="menu-wrapper">
    <!-- 左边导航菜单 -->
    <template v-for="item in routes" v-if="!item.hidden && item.children">
      <el-submenu :index="item.name || item.path">
        <template slot="title">
          <i :class="item.icon" v-if="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group
          v-for="(child, index) in item.children"
          :key="index"
          v-if="!child.children.length"
        >
          <el-menu-item
            :index="child.name || child.path"
            @click="$router.push('' + item.path + '/' + child.path)"
            >{{ child.name }}</el-menu-item
          >
        </el-menu-item-group>

        <el-submenu :index="child.name || child.path" v-else>
          <template slot="title">{{ child.name }}</template>
          <el-menu-item
            :index="grandson.name || grandson.path"
            v-for="grandson in child.children"
            @click="
              $router.push(
                '' + item.path + '/' + child.path + '/' + grandson.path
              )
            "
            :key="grandson.name"
            >{{ grandson.name }}</el-menu-item
          >
        </el-submenu>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    routes: {
      type: Array,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    $route() {
      this.addViewTags();
    },
  },
  mounted() {
    this.addViewTags();
  },
  methods: {
    addViewTags() {
      // console.log(this.$route)
      //路由改变时执行的方法
      if (this.$route.name) {
        this.$store.dispatch("addVisitedViews", this.$route);
      }
    },
    hasOneShowingChildren(children) {
      const showingChildren = children.filter((item) => {
        return !item.hidden;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss">
.el-submenu__title i {
  vertical-align: middle;
  margin-right: 6px;
  width: 18px;
  height: 18px;
  text-align: center;
  font-size: 18px;
  display: inline-block;
}
.el-submenu__title {
  .sideBar01-group {
    background: url("../../../../assets/comImgs/sideBar01_group_black.png")
      no-repeat;
  }
  .sideBar02-file {
    background: url("../../../../assets/comImgs/sideBar02_file_black.png")
      no-repeat;
  }
  .sideBar03-pay {
    background: url("../../../../assets/comImgs/sideBar03_pay_black.png")
      no-repeat;
  }
  .sideBar04-bill {
    background: url("../../../../assets/comImgs/sideBar04_bill_black.png")
      no-repeat;
  }
  .sideBar05-forms {
    background: url("../../../../assets/comImgs/sideBar05_forms_black.png")
      no-repeat;
  }
  .sideBar06-system {
    background: url("../../../../assets/comImgs/sideBar06_system_black.png")
      no-repeat;
  }
  .sideBar07-public {
    background: url("../../../../assets/comImgs/sideBar07_public_black.png")
      no-repeat;
  }
  .sideBar08-park {
    background: url("../../../../assets/comImgs/sideBar08_park_black.png")
      no-repeat;
  }
  .sideBar09-door {
    background: url("../../../../assets/comImgs/sideBar09_door_black.png")
      no-repeat;
  }
  .sideBar10_feedback {
    background: url("../../../../assets/comImgs/sideBar10_feedback_black.png")
      no-repeat;
  }
  .sideBar11_rent {
    background: url("../../../../assets/comImgs/sideBar11_rent_black.png")
      no-repeat;
  }
  .sideBar12_bank {
    background: url("../../../../assets/comImgs/sideBar12_bank_black.png")
      no-repeat;
  }
  .sideBar13_ticketPayment {
    background: url("../../../../assets/comImgs/sideBar13_TicketPayment_black.png")
      no-repeat;
  }
  .sideBar14_receivable {
    background: url("../../../../assets/comImgs/sideBar14_Receivable_black.png")
      no-repeat;
  }
  .sidebar15_prepay {
    background: url("../../../../assets/comImgs/sidebar15_prepay_black.png")
      no-repeat;
  }
  .sidebar16_Sharing {
    background: url("../../../../assets/comImgs/sidebar16_Sharing_black.png")
      no-repeat;
  }
  &:hover {
    .el-submenu__icon-arrow {
      color: #fff;
    }
    .sideBar01-group {
      background: url("../../../../assets/comImgs/sideBar01_group_white.png")
        no-repeat;
    }
    .sideBar02-file {
      background: url("../../../../assets/comImgs/sideBar02_file_white.png")
        no-repeat;
    }
    .sideBar03-pay {
      background: url("../../../../assets/comImgs/sideBar03_pay_white.png")
        no-repeat;
    }
    .sideBar04-bill {
      background: url("../../../../assets/comImgs/sideBar04_bill_white.png")
        no-repeat;
    }
    .sideBar05-forms {
      background: url("../../../../assets/comImgs/sideBar05_forms_white.png")
        no-repeat;
    }
    .sideBar06-system {
      background: url("../../../../assets/comImgs/sideBar06_system_white.png")
        no-repeat;
    }
    .sideBar07-public {
      background: url("../../../../assets/comImgs/sideBar07_public_white.png")
        no-repeat;
    }
    .sideBar08-park {
      background: url("../../../../assets/comImgs/sideBar08_park_white.png")
        no-repeat;
    }
    .sideBar09-door {
      background: url("../../../../assets/comImgs/sideBar09_door_white.png")
        no-repeat;
    }
    .sideBar10_feedback {
      background: url("../../../../assets/comImgs/sideBar10_feedback_white.png")
        no-repeat;
    }
    .sideBar11_rent {
      background: url("../../../../assets/comImgs/sideBar11_rent_white.png")
        no-repeat;
    }
    .sideBar12_bank {
      background: url("../../../../assets/comImgs/sideBar12_bank_white.png")
        no-repeat;
    }
    .sideBar13_ticketPayment {
      background: url("../../../../assets/comImgs/sideBar13_TicketPayment_white.png")
        no-repeat;
    }
    .sideBar14_receivable {
      background: url("../../../../assets/comImgs/sideBar14_Receivable_white.png")
        no-repeat;
    }
    .sidebar15_prepay {
      background: url("../../../../assets/comImgs/sidebar15_prepay_white.png")
        no-repeat;
    }
    .sidebar16_Sharing {
      background: url("../../../../assets/comImgs/sidebar16_Sharing_white.png")
        no-repeat;
    }
  }
}
</style>
