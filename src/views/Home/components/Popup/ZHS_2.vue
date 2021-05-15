<template>
  <div class="ZHS_2 container" ref="ZHS_2">
    <!-- 按钮begin -->
    <el-form label-width="75px" ref="ZHS_2Form">
      <el-row :gutter="30">
        <el-col :span="5" style="width: 250px">
          <el-form-item label="管理处：">
            <el-select v-model="index" @change="GLCchange">
              <el-option
                v-for="(item, index) in userPlot"
                :key="index"
                :label="item.GLCNAME"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" style="padding-right: 0; padding-top: 2px">
          <el-button type="success" @click="downloData">导出excel</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->
    <div class="table">
      <el-table ref="multipleTable" :data="tabledata" border :height="height">
        <el-table-column prop="plotName" label="管理处名称">
          <template slot-scope="scope">
            <span
              :class="isplot(scope.row.GLCID, scope.row.YXDID) ? 'touser' : ''"
              @click="toplot(scope.row.GLCID, scope.row.YXDID)"
              >{{ scope.row.plotName }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="emptyCount" label="空置数量">
          <template slot-scope="scope">
            <span>{{ scope.row.emptyCount ? scope.row.emptyCount : "0" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="livedCount" label="已入住数量">
          <template slot-scope="scope">
            <span>{{ scope.row.livedCount ? scope.row.livedCount : "0" }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="chart" :style="`height:${maxheight + 50}px`">
      <div class="title">总户数饼状图</div>
      <div
        class="myEchart"
        ref="myEchart"
        :style="`height:${maxheight}px`"
      ></div>
    </div>
  </div>
</template>

<script>
import Chart from "echarts";
import {
  queryTotalNumberOfHouseholds,
  exportExcelOfTotalHouseholds,
} from "@/api/Home/Home";
import { mapGetters } from "vuex";
import store from "@/store";
export default {
  name: "ZHS_2",
  data() {
    return {
      title: "总户数",
      index: 0,
      data: {},
      chart: "",
      tabledata: [],
      height: 150,
      maxheight: 300,
    };
  },
  computed: {
    ...mapGetters(["userPlot"]),
  },
  inject: ["reload"], //注入App里的reload方法---子级接收
  created() {
    this.maxheight = window.screen.width > 1025 ? 250 : 130;
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.getPartitionData();
      }, 1000);
    });
  },
  methods: {
    isplot(GLCID, YXDID) {
      const parent = this.userPlot;
      const index = parent.findIndex(
        (d) => d.GLCID === parseFloat(GLCID) && d.YXDID === parseFloat(YXDID)
      ); //寻找data的索引
      return index >= 0;
    },
    toplot(GLCID, YXDID) {
      const parent = this.userPlot;
      const index = parent.findIndex(
        (d) => d.GLCID === parseFloat(GLCID) && d.YXDID === parseFloat(YXDID)
      ); //寻找data的索引
      if (index == -1) return;

      this.$store.state.tagsview.cachedViews = []; //下拉列表选中小区，清空tagsview 缓存数据
      this.$store.state.tagsview.visitedviews = [
        { name: "客户档案", path: "/BasicManagement/CustomerFile" },
      ]; //下拉列表选中小区，清空tagsview 只显示首页
      this.$router.push("/BasicManagement/CustomerFile"); //返回首页

      var item = this.userPlot[index];
      var _this = this;
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
              _this.$router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            }
          });
        }
      });
    },
    GLCchange(index) {
      this.data.plotName = this.userPlot[index].GLCNAME;
      this.data.plotDbName = this.userPlot[index].dbName;
      this.data.GLCID = this.userPlot[index].GLCID;
      this.data.YXDID = this.userPlot[index].YXDID;
      this.gettable();
    },
    getPartitionData() {
      this.height =
        this.$refs.ZHS_2.offsetHeight -
        this.$refs.ZHS_2Form.$el.offsetHeight -
        (window.screen.width > 1025 ? 400 : 250);
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var currentdate = year + "-" + month + "-" + strDate;

      var parent = this.userPlot;
      var children;
      var index;

      if (sessionStorage.getItem("plotItem") == null) {
        index = 0;
      } else {
        children = JSON.parse(sessionStorage.getItem("plotItem"));
        index = parent.findIndex(
          (d) =>
            d.GLCID === children.GLCID &&
            d.YXDID === children.YXDID &&
            d.dbName === children.dbName
        ); //寻找data的索引
      }

      this.index = index;

      this.data = {
        plotName: this.userPlot[index].GLCNAME,
        plotDbName: this.userPlot[index].dbName,
        GLCID: this.userPlot[index].GLCID,
        YXDID: this.userPlot[index].YXDID,
        DQRQ: currentdate,
        org_url: location.hostname,
      };
      this.gettable();
    },
    gettable() {
      var _this = this;
      queryTotalNumberOfHouseholds(this.data).then((response) => {
        this.tabledata = response.data;
        var item = this.tabledata;
        this.data.list = JSON.stringify(item);
        var kz = 0;
        var yrz = 0;
        for (var i in item) {
          kz += item[i].emptyCount ? item[i].emptyCount : 0;
          yrz += item[i].livedCount ? item[i].livedCount : 0;
        }

        this.$nextTick(() => {
          _this.chart = Chart.init(_this.$refs.myEchart);
          var option = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)",
            },
            legend: {
              left: "center",
              top: "bottom",
              data: ["空置", "已入住"],
            },
            series: [
              {
                name: "访问来源",
                type: "pie",
                radius: window.screen.width ? ["50%", "70%"] : ["30%", "40%"],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: "center",
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: "30",
                      fontWeight: "bold",
                    },
                  },
                },
                labelLine: {
                  normal: {
                    show: false,
                  },
                },
                data: [
                  { value: kz, name: "空置" },
                  { value: yrz, name: "已入住" },
                ],
              },
            ],
          };
          this.chart.setOption(option, true);
        });
      });
    },
    downloData() {
      exportExcelOfTotalHouseholds(this.data).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `${this.title}.xls`;
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
  },
  destroyed() {
    //销毁echar，防止占用资源容易内存泄漏
    this.chart = null;
  },
};
</script>
<style>
.ZHS_2 .el-dialog__body {
  padding: 20px;
  overflow: auto;
  height: 700px;
}

.ZHS_2 .table {
  margin-top: 20px;
}

.ZHS_2 .chart {
  height: 300px;
  border: 1px solid rgba(214, 215, 220, 1);
  margin-top: 20px;
}

.ZHS_2 .chart .title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: rgba(214, 215, 220, 1);
  font-size: 14px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}

.ZHS_2 .chart .myEchart {
  width: 100%;
  height: 250px;
  float: left;
}

.ZHS_2 .el-dialog-fourfold .el-row {
  margin: 0 !important;
}

.ZHS_2 .touser {
  text-decoration: underline;
  color: rgb(43, 43, 255);
  cursor: pointer;
}

.ZHS_2 .el-dialog-fourfold .el-row {
  margin: 0 !important;
  padding: 0 !important;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
