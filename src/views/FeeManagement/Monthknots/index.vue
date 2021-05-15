<template>
  <div class="container" v-loading="loading">
    <!-- 月结start -->
    <el-form label-width="150px" :model="formList">
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="当前所属账期：">
            <span>{{ formList.ownYears }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="下一个账期：">
            <span>{{ formList.nextOwnYears }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮区域start -->
    <section class="buttonBox">
      <el-row>
        <el-col :span="6">
          <el-button type="primary" @click="submit" v-has="'MonSettle_has'"
            >月结</el-button
          >
        </el-col>
      </el-row>
    </section>
    <!-- 按钮区域end -->
  </div>
</template>
<script>
import {
  monthlycharge,
  queryCurrentMonth,
  countNotEntered,
  addUseUser,
} from "@/api/FeeManagement/Monthknots";
export default {
  name: "Monthknots",
  data() {
    return {
      loading: false,
      formList: {
        ownYears: "",
        nextOwnYears: "",
      },
      func: "",
    };
  },
  watch: {
    $route(to, from) {
      // clearInterval(this.func)
      // this.func = setInterval(function(){addUseUser().then(response => {})}, 60000);
    },
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      queryCurrentMonth().then((response) => {
        this.formList.ownYears = response.data.yearAndMonth.SFCS_ZFX;
        var newY = this.formList.ownYears.split("-");
        this.formList.nextOwnYears = "";
        this.formList.nextOwnYears += `${
          parseInt(newY[1]) === 12 ? parseInt(newY[0]) + 1 : newY[0]
        }-`;
        this.formList.nextOwnYears +=
          parseInt(newY[1]) === 12
            ? "01"
            : parseInt(newY[1]) + 1 < 10
            ? "0" + (parseInt(newY[1]) + 1)
            : parseInt(newY[1]) + 1;
      });
    },
    submit() {
      this.$confirm("月结后账期前的数据将无法更改,是否立即进行月结？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          countNotEntered().then((response) => {
            if (response.returnStatus == "FAIL") {
              this.$confirm("有走表读数录入未生成费用!", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                  this.loading = true;
                  monthlycharge().then((response) => {
                    this.loading = false;
                    this.getdata();
                  });
                })
                .catch(() => {});
            } else {
              this.loading = true;
              monthlycharge().then((response) => {
                this.loading = false;
                this.getdata();
              });
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss">
.use-span {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding-top: 3px;
  text-align: center;
  background: #fff;
  cursor: pointer;
}
</style>
