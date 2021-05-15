<template>
  <div class="ZMJ container" ref="ZMJ">
    <!-- 按钮begin -->
    <el-form label-width="60px" ref="ZMJForm">
      <el-row :gutter="30">
        <el-col :span="6" style="width: 250px">
          <el-form-item label="管理处：">
            <el-select v-model="index" @change="GLCchange">
              <el-option
                v-for="(item, index) in plotlist"
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
        <el-table-column prop="GLCNAME" label="管理处名称">
          <template slot-scope="scope">
            <span
              :class="isplot(scope.row.GLCID, scope.row.YXDID) ? 'touser' : ''"
              @click="toplot(scope.row.GLCID, scope.row.YXDID)"
              >{{ scope.row.GLCNAME }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="type" label="是否空置">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1">已入住</span>
            <span v-if="scope.row.type === 0">空置</span>
          </template>
        </el-table-column>
        <el-table-column prop="vacancy" label="面积"> </el-table-column>
      </el-table>
    </div>
    <div class="chart">
      <div class="title">总面积饼状图</div>
      <div class="myEchart" ref="myEchart"></div>
    </div>
  </div>
</template>

<script>
import Chart from "echarts";
import { queryAcreage, isLeader, totalAreaExcel } from "@/api/Home/Home";
import { mapGetters } from "vuex";
import store from "@/store";
export default {
  name: "ZMJ",
  data() {
    return {
      title: "总面积",
      index: 0,
      data: {},
      chart: "",
      tabledata: [],
      plotlist: [
        {
          GLCNAME: "全部",
          dbName: "",
          GLCID: "",
          YXDID: "",
        },
      ],
      height: 150,
    };
  },
  computed: {
    ...mapGetters(["userPlot"]),
  },
  inject: ["reload"], //注入App里的reload方法---子级接收
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.getPartitionData();
      }, 500);
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

      //切换vuex中的tagsview数据
      this.$router.push("/BasicManagement/ResourceFile");
      this.$store.state.tagsview.cachedViews = []; //下拉列表选中小区，清空tagsview 缓存数据
      this.$store.state.tagsview.visitedviews = [
        { name: "资源档案", path: "/BasicManagement/ResourceFile" },
      ]; //下拉列表选中小区，清空tagsview 只显示首页

      //重置vuex中的tagsview数据 end

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
      this.data.plotDbName = this.plotlist[index].dbName;
      this.data.GLCID = this.plotlist[index].GLCID;
      this.data.YXDID = this.plotlist[index].YXDID;
      this.gettable();
    },
    getPartitionData() {
      this.height =
        this.$refs.ZMJ.offsetHeight - this.$refs.ZMJForm.$el.offsetHeight - 60;
      this.index = 0;
      this.plotlist = [
        {
          GLCNAME: "全部",
          dbName: "",
          GLCID: "",
          YXDID: "",
        },
      ];

      this.plotlist = this.plotlist.concat(this.userPlot);
      var parent = this.plotlist;
      var children;
      var index;
      if (sessionStorage.getItem("plotItem") == null) {
        index = 1;
      } else {
        children = JSON.parse(sessionStorage.getItem("plotItem"));
        index = parent.findIndex(
          (d) =>
            d.GLCID === children.GLCID &&
            d.YXDID === children.YXDID &&
            d.dbName === children.dbName
        ); //寻找data的索引
      }
      var _this = this;
      isLeader().then((response) => {
        if (response.isLeader) {
          _this.data = {
            plotDbName: this.plotlist[0].dbName,
            GLCID: _this.plotlist[0].GLCID,
            YXDID: _this.plotlist[0].YXDID,
          };
        } else {
          _this.index = index;
          _this.data = {
            plotDbName: this.plotlist[index].dbName,
            GLCID: _this.plotlist[index].GLCID,
            YXDID: _this.plotlist[index].YXDID,
          };
        }
        this.gettable();
      });
    },
    gettable() {
      queryAcreage(this.data).then((response) => {
        this.tabledata = response.data;
        var item = this.tabledata;
        this.data.list = JSON.stringify(item);

        var list = [
          {
            value: response.vacantArea,
            name: "空置",
          },
          {
            value: response.hasBeenInArea,
            name: "已入住",
          },
        ];

        this.chart = Chart.init(this.$refs.myEchart);
        var option = {
          legend: {
            orient: "vertical", // 'vertical'
            x: "left", // 'center' | 'left' | {number},
            padding: 10, // [5, 10, 15, 20]
            itemGap: 20,
            textStyle: {
              color: "#000",
            },
          },

          tooltip: {
            trigger: "item",
            formatter: "{b} : {c} ({d}%)",
          },

          visualMap: {
            show: false,
            min: 500,
            max: 600,
            inRange: {
              //colorLightness: [0, 1]
            },
          },
          series: [
            {
              type: "pie",
              radius: window.screen.width > 1025 ? "50%" : "30%",
              selectedMode: "single",
              selectedOffset: 10,
              clockwise: true,
              center: ["50%", "50%"],
              color: ["#2E8AD7", "#F4AC46"], //'#FBFE27','rgb(11,228,96)','#FE5050'
              data: list.sort(function (a, b) {
                return a.value - b.value;
              }),
              // roseType: 'radius',

              label: {
                normal: {
                  formatter: ["{c|{b}{d}%}"].join("\n"),
                  rich: {
                    b: {
                      color: "#000",
                      fontSize: window.screen.width > 1025 ? 15 : 12,
                      height: 40,
                    },
                    c: {
                      color: "#000",
                      fontSize: window.screen.width > 1025 ? 14 : 12,
                      fontWeight: "bold",
                      lineHeight: 5,
                    },
                  },
                },
              },
              labelLine: {
                normal: {
                  backgroundColor: "yellow",
                  borderColor: "skyblue",
                  borderWidth: 10,
                  lineStyle: {
                    borderColor: "skyblue",
                    borderWidth: 10,
                    backgroundColor: "yellow",
                  },
                },
              },
            },
          ],
        };
        this.chart.setOption(option, true);
      });
    },
    downloData() {
      totalAreaExcel(this.data).then((response) => {
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
.ZMJ .el-dialog__body {
  padding: 20px;
  overflow: auto;
  height: 700px;
}

.ZMJ .table {
  width: 63%;
  float: left;
  margin-right: 2%;
}

.ZMJ .chart {
  width: 35%;
  height: 380px;
  float: left;
  border: 1px solid rgba(214, 215, 220, 1);
}

.ZMJ .chart .title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: rgba(214, 215, 220, 1);
  font-size: 14px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}

.ZMJ .chart .myEchart {
  width: 100%;
  height: 350px;
  float: left;
}

.ZMJ .el-dialog-fourfold .el-row {
  margin: 0 !important;
}

.ZMJ .touser {
  text-decoration: underline;
  color: rgb(43, 43, 255);
  cursor: pointer;
}

.ZMJ .el-dialog-fourfold .el-row {
  margin: 0 !important;
  padding: 0 !important;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
