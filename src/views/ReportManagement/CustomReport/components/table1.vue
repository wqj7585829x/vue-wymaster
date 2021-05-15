<template>
  <div class="resoureRight container CustomReport">
    <el-form>
      <el-row :gutter="30">
        <el-col :span="6" style="width: 300px" v-if="isChargeNotice">
          <el-form-item
            :label="isCalculation ? '走表开始月份：' : ''"
            :label-width="isCalculation ? '105px' : '0'"
          >
            <el-date-picker
              type="month"
              placeholder="选择月份"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              v-model="time1"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px" v-if="isCalculation">
          <el-form-item
            :label="isCalculation ? '走表结束月份：' : ''"
            :label-width="isCalculation ? '105px' : '0'"
          >
            <el-date-picker
              type="month"
              placeholder="选择月份"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              v-model="time2"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col
          :span="6"
          style="width: 300px"
          label-width="70px"
          v-if="isCalculation"
        >
          <el-form-item
            :label="isCalculation ? '常规费用开始月份：' : ''"
            :label-width="isCalculation ? '135px' : '0'"
          >
            <el-date-picker
              type="month"
              placeholder="选择月份"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              v-model="time3"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 300px" v-if="isCalculation">
          <el-form-item
            :label="isCalculation ? '常规费用结束月份：' : ''"
            :label-width="isCalculation ? '135px' : '0'"
          >
            <el-date-picker
              type="month"
              placeholder="选择月份"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              v-model="time4"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 300px">
          <el-form-item label="" label-width="0">
            <el-button
              type="danger"
              @click="Calculation"
              :loading="CalculationLoading"
              v-if="isChargeNotice"
              >费用计算
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- <el-form>
      <el-row :gutter="30">
        <el-col :span="6" style="width:300px">
          <el-form-item label="资源代码页码查询：" :label-width="'130px'">
            <el-input v-model="searchPage">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width:300px">
          <el-form-item label="" label-width="0">
            <el-button type="primary" @click="searchPageFunc" :disabled='htmlvalue==""'>查询
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> -->

    <el-form label-width="85px" :model="searchvalueList" ref="searchvalueList">
      <el-row :gutter="30">
        <el-col
          :span="6"
          v-for="(item, index) in searchList"
          :key="index"
          style="width: 300px"
        >
          <el-form-item label="楼栋:" v-if="item.type === '0'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
              @change="buildingchange(index)"
            >
              <el-option
                v-for="(unit, i) in options1"
                :key="i"
                :label="unit.DLDA_DLMC"
                :value="i"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房间:" v-if="item.type === '1'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(unit, i) in options2"
                :key="i"
                :label="unit.FJDA_FJMC"
                :value="unit.FJDA_FJMC"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="领款责任人:" v-if="item.type === '2'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
              @change="lkzrrchange(index)"
            >
              <el-option
                v-for="(unit, i) in options3"
                :key="i"
                :label="unit.YFPZ_LKZRR"
                :value="i"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目名称:" v-if="item.type === '3'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
              @change="xmmcchange(index)"
            >
              <el-option
                v-for="(unit, i) in options4"
                :key="i"
                :label="unit.YFPZ_XMMC"
                :value="i"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="凭证编号:" v-if="item.type === '4'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(unit, i) in options5"
                :key="i"
                :label="unit.YFPZ_PZBH"
                :value="unit.YFPZ_PZBH"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="客户:" v-if="item.type === '5'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(unit, i) in options8"
                :key="i"
                :label="unit.KHDA_KHMC"
                :value="unit.KHDA_KHMC"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="起始年月" v-if="item.type === '6'">
            <el-date-picker
              v-model="item.value"
              type="month"
              placeholder="选择年月"
              value-format="yyyy-MM"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="截止年月" v-if="item.type === '7'">
            <el-date-picker
              v-model="item.value"
              type="month"
              placeholder="选择年月"
              value-format="yyyy-MM"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="收费项目:" v-if="item.type === '8'">
            <el-select v-model="item.value" clearable>
              <el-option
                v-for="(unit, i) in options6"
                :key="i"
                :label="unit.SFXM_SFXMMC"
                :value="unit.SFXM_ZJ"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="日期:" v-if="item.type === '9'">
            <el-date-picker
              v-model="item.value"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="起始日期:" v-if="item.type === '10'">
            <el-date-picker
              v-model="item.value"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="截止日期:" v-if="item.type === '11'">
            <el-date-picker
              v-model="item.value"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="楼栋:" v-if="item.type === '12'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
              @change="buildingKHMCchange(index)"
            >
              <el-option
                v-for="(unit, i) in options1"
                :key="i"
                :label="unit.DLDA_DLMC"
                :value="i"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="客户:" v-if="item.type === '13'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(unit, i) in options7"
                :key="i"
                :label="unit.KHDA_KHMC"
                :value="unit.KHDA_KHMC"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="楼栋:" v-if="item.type === '14'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
              @change="buildingchange(index)"
            >
              <el-option
                v-for="(unit, i) in options1"
                :key="i"
                :label="unit.DLDA_DLMC"
                :value="i"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房间代码:" v-if="item.type === '15'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(unit, i) in options2"
                :key="i"
                :label="unit.FJDA_FJMC"
                :value="unit.FJDA_FJID"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分区名称:" v-if="item.type === '16'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(unit, i) in options9"
                :key="i"
                :label="unit.DLDA_DLMC"
                :value="unit.GLQDA_GLQMC"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="楼栋:" v-if="item.type === '17'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(unit, i) in options10"
                :key="i"
                :label="unit.DLDA_DLMC"
                :value="unit.DLDA_DLMC"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="房间代码:" v-if="item.type === '18'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(unit, i) in options11"
                :key="i"
                :label="unit.FJDA_FJMC"
                :value="unit.FJDA_FJID"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="房间名称:" v-if="item.type === '19'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(unit, i) in options12"
                :key="i"
                :label="unit.FJDA_FJMC"
                :value="unit.FJDA_FJMC"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="房间代码:" v-if="item.type === '20'">
            <el-input
              v-model="item.value"
              :title="item.value"
              clearable
              :disabled="true"
            >
              <el-button
                slot="append"
                icon="el-icon-edit-outline"
                @click="DivSearch(index, 1)"
              ></el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="房间名称:" v-if="item.type === '21'">
            <el-input
              v-model="item.value"
              :title="item.value"
              clearable
              :disabled="true"
            >
              <el-button
                slot="append"
                icon="el-icon-edit-outline"
                @click="DivSearch(index, 2)"
              ></el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="客户:" v-if="item.type === '22'">
            <el-input
              v-model="item.value"
              :title="item.value"
              clearable
              :disabled="true"
            >
              <el-button
                slot="append"
                icon="el-icon-edit-outline"
                @click="DivSearch(index, 3)"
              ></el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="楼号:" v-if="item.type === '23'">
            <el-select
              v-model="item.value"
              multiple
              collapse-tags
              filterable
              clearable
            >
              <el-option
                v-for="(unit, i) in options13"
                :key="i"
                :label="unit.楼号"
                :value="unit.楼号"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button type="primary" @click="DoCostcalculation">查询</el-button>
    <!-- <el-button type="primary" @click="DownloadData">打印</el-button> -->
    <el-button
      type="primary"
      @click="DownloadDataNew"
      :disabled="htmlvalue == ''"
      >打印</el-button
    >
    <span v-if="isChargeNotice"
      >（如果需要打印最新数据请点击费用计算再打印）</span
    >

    <RoomIdchange
      :RIDshow.sync="RIDshow"
      ref="RoomIdchange"
      @getResource="getResource"
    ></RoomIdchange>
    <RoomNamechange
      :RNshow.sync="RNshow"
      ref="RoomNamechange"
      @getResource="getResource"
    ></RoomNamechange>
    <KHMCchange
      :KHshow.sync="KHshow"
      ref="KHMCchange"
      @getResource="getResource"
    ></KHMCchange>

    <div v-html="htmlvalue" class="htmlvalue" ref="capture"></div>
  </div>
</template>

<script>
import config from "@/utils/config";
import {
  queryPretreatment,
  queryCurrentYear,
  Costcalculation,
  printCustomReport,
  queryPretreatmentCustom,
  queryBuildingMessage,
  queryRoomMessage,
  queryYFPZ_LKZRR,
  queryYFPZ_XMMC,
  queryYFPZ_PZBH,
  queryKHDA_KHMC,
  queryAllPayItems,
  queryKHDA,
  queryPartition,
  queryUniqueDLDA_DLMC,
  queryUniqueFJDA_FJID,
  queryUniqueFJDA_FJMC,
  queryBuildingNum,
} from "@/api/ReportManagement/QueryReport";
import RoomIdchange from "./RoomIdchange";
import RoomNamechange from "./RoomNamechange";
import KHMCchange from "./KHMCchange";
import { mapGetters } from "vuex";
import { Loading, Switch } from "element-ui";
import { needCLodop, loadCLodop, getLodop } from "@/PlugIn/LodopFuncs.js"; //打印插件
export default {
  data() {
    return {
      time1: "", //费用计算条件
      time2: "", //费用计算条件
      time3: "", //费用计算条件
      time4: "", //费用计算条件
      ip: config.REPORT_IP,
      code: "",
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      options5: [],
      options6: [],
      options7: [],
      options8: [],
      options9: [],
      options10: [],
      options11: [],
      options12: [],
      options13: [],
      roomlist: [],
      xmmclist: [],
      pzbhlist: [],
      khmclist: [],
      htmlvalue: "", //查询结果，通知单html内容
      imgurl: "", //通知单中图片标签用于更换的实际图片链接
      rdata: "",
      CalculationLoading: false, //费用计算loading加载
      searchPageLoading: false,
      isChargeNotice: false, //是否是通知单
      isCalculation: false, //是否进行费用计算
      searchList: [], //搜索条件列表
      searchvalueList: {}, //搜索条件值列表
      row_num: "", //通知单内容行数
      RIDshow: false, //弹窗
      RNshow: false, //弹窗
      KHshow: false, //弹窗
      Rindex: "", //用于区分打开哪个弹窗
      searchPage: "",
      query_type: 140, //设置打印纸张高度
      fname: "",
      tdWidthSettings: "",
    };
  },
  computed: {
    ...mapGetters(["currentPlot"]),
  },
  components: {
    RoomIdchange,
    RoomNamechange,
    KHMCchange,
  },
  mounted() {
    this.getbuilding();
    this.getroom();
    this.getLKZRR();
    this.getXMMC();
    this.getPZBH();
    this.getkhmc();
    this.getChargeProject();
    this.getClientList();
    this.getQueryPartition();
    this.getqueryUniqueDLDA_DLMC();
    this.getqueryUniqueFJDA_FJID();
    this.getqueryUniqueFJDA_FJMC();
    this.getqueryBuildingNum();
  },
  methods: {
    // searchPageFunc() {
    //   var value = this.searchPage
    //   for (var i = 0; i < document.querySelectorAll(".jrPage").length; i++) {
    //     var unit = document.querySelectorAll(".jrPage")[i].outerHTML
    //     if (unit.indexOf(value) > -1) {
    //       this.$message({
    //         message: `当前查询的资源代码是第${i + 1}张通知单`,
    //         type: 'success'
    //       });
    //     }
    //   }
    // },
    DivSearch(index, type) {
      //弹窗打开
      this.Rindex = index;
      switch (type) {
        case 1:
          this.RIDshow = true;
          break;
        case 2:
          this.RNshow = true;
          break;
        case 3:
          this.KHshow = true;
          break;
      }
    },
    getResource(data) {
      //弹窗确认后赋值
      this.searchList[this.Rindex].value = data;
    },
    setData(val) {
      //根据选择通知单初始化
      this.htmlvalue = "";
      this.rdata = val;
      this.exec_name = val.exec_name;
      this.fname = val.name;
      this.imgurl = val.show_photo;
      this.tdWidthSettings = val.tdWidthSettings;
      this.isChargeNotice = val.isChargeNotice === 1 ? true : false;
      this.isCalculation =
        val.isChargeNotice === 1 && val.report_code === "SFTZD_ZDY"
          ? true
          : false;
      this.setSearchlist(val.query_condition ? val.query_condition : "");
      sessionStorage.setItem("reportprintimg", val.show_photo);
      sessionStorage.setItem("numberOfPage", val.numberOfPage);
      sessionStorage.setItem("query_type", val.query_type);
      this.query_type = val.query_type;
      sessionStorage.setItem("rowHeight", val.row_height);

      this.$refs.RoomIdchange.ReSetData();
      this.$refs.RoomNamechange.ReSetData();
      this.$refs.KHMCchange.ReSetData();

      this.row_num = val.row_num;
      queryCurrentYear().then((response) => {
        var month = response.SFCS_ZFX;
        this.time1 = month;
        this.time2 = month;
        this.time3 = month;
        this.time4 = month;
      });
    },
    buildingchange(val) {
      //楼栋改变事件
      this.$forceUpdate();
      var DLDA_ZJList = [];
      var index = this.searchList[val].value;

      if (index.length > 0) {
        for (var i in index) {
          DLDA_ZJList.push(this.options1[index[i]].DLDA_ZJ);
        }
        var DLDA_ZJ = DLDA_ZJList.join(",");
        var data = this.roomlist;
        this.searchList[val + 1].value = "";
        this.options2 = [];
        for (var i in data) {
          if (DLDA_ZJ.indexOf(data[i].FJDA_DLWJ) > -1) {
            this.options2.push(data[i]);
          }
        }
      } else {
        this.searchList[val + 1].value = "";
        this.options2 = this.roomlist;
      }
    },
    lkzrrchange(val) {
      //领款责任人改变事件
      this.$forceUpdate();
      if (this.searchList[val].value.length != 0) {
        var YFPZ_LKZRRList = [];
        var index = this.searchList[val].value;
        for (var i in index) {
          YFPZ_LKZRRList.push(this.options3[index[i]].YFPZ_LKZRR);
        }
        var YFPZ_LKZRR = YFPZ_LKZRRList.join(",");
        var data = this.xmmclist;
        this.searchList[val + 1].value = "";
        this.searchList[val + 2].value = "";
        this.options4 = [];
        this.options5 = this.pzbhlist;
        for (var i in data) {
          if (YFPZ_LKZRR.indexOf(data[i].YFPZ_LKZRR) > -1) {
            this.options4.push(data[i]);
          }
        }
      } else {
        this.options4 = this.xmmclist;
        this.options5 = this.pzbhlist;
        this.searchList[val + 1].value = "";
        this.searchList[val + 2].value = "";
      }
    },
    xmmcchange(val) {
      //项目名称改变事件
      this.$forceUpdate();

      if (this.searchList[val].value.length != 0) {
        var pzbhlist = [];
        var index = this.searchList[val].value;
        for (var i in index) {
          pzbhlist.push(
            `${this.options4[index[i]].YFPZ_LKZRR}${
              this.options4[index[i]].YFPZ_XMMC
            }`
          );
        }
        var pzbh = pzbhlist.join(",");
        var data = this.pzbhlist;
        this.searchList[val + 1].value = "";
        this.options5 = [];
        for (var i in data) {
          if (pzbh.indexOf(`${data[i].YFPZ_LKZRR}${data[i].YFPZ_XMMC}`) > -1) {
            this.options5.push(data[i]);
          }
        }
      } else {
        this.options5 = this.pzbhlist;
        this.searchList[val + 1].value = "";
      }
    },
    buildingKHMCchange(val) {
      //楼栋改变事件
      this.$forceUpdate();
      var DLDA_ZJList = [];
      var index = this.searchList[val].value;
      if (index.length > 0) {
        for (var i in index) {
          DLDA_ZJList.push(this.options1[index[i]].DLDA_ZJ);
        }
        var DLDA_ZJ = DLDA_ZJList.join(",");
        var data = this.khmclist;
        this.searchList[val + 1].value = "";
        this.options7 = [];
        for (var i in data) {
          if (DLDA_ZJ.indexOf(data[i].DLDA_ZJ) > -1) {
            this.options7.push(data[i]);
          }
        }
      } else {
        this.searchList[val + 1].value = "";
        this.options7 = this.khmclist;
      }
    },
    setSearchlist(data) {
      //设置搜索条件，数字对应不同类型搜索条件，在z端进行配置
      var searchList = data.split(",");
      this.searchList = [];
      for (var i in searchList) {
        switch (searchList[i]) {
          case "0":
            this.searchList.push({
              type: "0",
              value: [],
            });
            this.searchList.push({
              type: "1",
              value: [],
            });
            break;
          case "1":
            this.searchList.push({
              type: "2",
              value: [],
            });
            this.searchList.push({
              type: "3",
              value: [],
            });
            this.searchList.push({
              type: "4",
              value: [],
            });

            break;
          case "2":
            this.searchList.push({
              type: "5",
              value: [],
            });
            break;
          case "3":
            this.searchList.push({
              type: "6",
              value: "",
            });
            this.searchList.push({
              type: "7",
              value: "",
            });
            break;
          case "4":
            this.searchList.push({
              type: "8",
              value: [],
            });
            break;
          case "5":
            this.searchList.push({
              type: "9",
              value: "",
            });
            break;
          case "6":
            this.searchList.push({
              type: "10",
              value: "",
            });
            this.searchList.push({
              type: "11",
              value: "",
            });
            break;
          case "7":
            this.searchList.push({
              type: "12",
              value: [],
            });
            this.searchList.push({
              type: "13",
              value: [],
            });
            break;
          case "8":
            this.searchList.push({
              type: "14",
              value: [],
            });
            this.searchList.push({
              type: "15",
              value: [],
            });
            break;
          case "9":
            this.searchList.push({
              type: "16",
              value: [],
            });
            break;
          case "10":
            this.searchList.push({
              type: "17",
              value: [],
            });
            break;
          case "11":
            this.searchList.push({
              type: "18",
              value: [],
            });
            break;
          case "12":
            this.searchList.push({
              type: "19",
              value: [],
            });
            break;
          case "13":
            this.searchList.push({
              type: "20",
              value: "",
            });
            break;
          case "14":
            this.searchList.push({
              type: "21",
              value: "",
            });
            break;
          case "15":
            this.searchList.push({
              type: "22",
              value: "",
            });
            break;
          case "16":
            this.searchList.push({
              type: "23",
              value: [],
            });
            break;
        }
      }
    },
    getbuilding() {
      //获取楼栋列表
      queryBuildingMessage().then((response) => {
        this.options1 = response;
      });
    },
    getroom() {
      //获取房间列表
      queryRoomMessage().then((response) => {
        this.roomlist = response;
        this.options2 = response;
      });
    },
    getLKZRR() {
      //获取领款责任人列表
      queryYFPZ_LKZRR().then((response) => {
        this.options3 = response;
      });
    },
    getXMMC() {
      //获取项目名称列表
      queryYFPZ_XMMC().then((response) => {
        this.xmmclist = response;
        this.options4 = response;
      });
    },
    getPZBH() {
      //获取凭证编号
      queryYFPZ_PZBH().then((response) => {
        this.pzbhlist = response;
        this.options5 = response;
      });
    },
    getkhmc() {
      //获取客户名称(联动)
      queryKHDA_KHMC().then((response) => {
        this.khmclist = response;
        this.options7 = response;
      });
    },
    getChargeProject() {
      //获取收费项目
      queryAllPayItems().then((response) => {
        this.options6 = response;
      });
    },
    getClientList() {
      //获取客户名称(单用)
      queryKHDA().then((response) => {
        this.options8 = response;
      });
    },
    getQueryPartition() {
      //分区名称
      queryPartition().then((response) => {
        this.options9 = response;
      });
    },
    getqueryUniqueDLDA_DLMC() {
      //大楼名称（单用）
      queryUniqueDLDA_DLMC().then((response) => {
        this.options10 = response;
      });
    },
    getqueryUniqueFJDA_FJID() {
      //房间代码（单用）
      queryUniqueFJDA_FJID().then((response) => {
        this.options11 = response;
      });
    },
    getqueryUniqueFJDA_FJMC() {
      //房间名称（单用）
      queryUniqueFJDA_FJMC().then((response) => {
        this.options12 = response;
      });
    },
    getqueryBuildingNum() {
      //楼号
      queryBuildingNum().then((response) => {
        this.options13 = response;
      });
    },
    Calculation() {
      //费用计算
      this.CalculationLoading = true;
      if (this.isCalculation) {
        queryPretreatmentCustom({
          param1: this.time1,
          param2: this.time2,
          param3: this.time3,
          param4: this.time4,
          execName: this.exec_name,
        }).then((response) => {
          this.CalculationLoading = false;
        });
      } else {
        queryPretreatment({ KSYF: this.time1, execName: this.exec_name }).then(
          (response) => {
            this.CalculationLoading = false;
          }
        );
      }
    },
    DownloadData() {
      //通知但打印(旧方式，由浏览器进行打印)

      var data = this.searchList;
      var result = {};
      for (var i in data) {
        switch (data[i].type) {
          case "0":
            var unit = this.options1;
            var list = data[i].value;
            var value = [];
            for (var j in list) {
              value.push(this.options1[list[j]].DLDA_DLMC);
            }
            result[`param${i}`] = value.join(",");
            break;
          case "1":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "2":
            var unit = this.options3;
            var list = data[i].value;
            var value = [];
            for (var j in list) {
              value.push(this.options3[list[j]].YFPZ_LKZRR);
            }
            result[`param${i}`] = value ? value.join(",") : "";
            break;
          case "3":
            var unit = this.options4;
            var list = data[i].value;
            var value = [];
            for (var j in list) {
              value.push(this.options4[list[j]].YFPZ_XMMC);
            }
            result[`param${i}`] = value ? value.join(",") : "";
            break;
          case "4":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "5":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "6":
            result[`param${i}`] = data[i].value;
            break;
          case "7":
            result[`param${i}`] = data[i].value;
            break;
          case "8":
            result[`param${i}`] = data[i].value;
            break;
          case "9":
            result[`param${i}`] = data[i].value;
            break;
          case "10":
            result[`param${i}`] = data[i].value;
            break;
          case "11":
            result[`param${i}`] = data[i].value;
            break;
          case "12":
            var unit = this.options1;
            var list = data[i].value;
            var value = [];
            for (var j in list) {
              value.push(this.options1[list[j]].DLDA_DLMC);
            }
            result[`param${i}`] = value.join(",");
            break;
          case "13":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "14":
            var unit = this.options1;
            var list = data[i].value;
            var value = [];
            for (var j in list) {
              value.push(this.options1[list[j]].DLDA_DLMC);
            }
            result[`param${i}`] = value.join(",");
            break;
          case "15":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "16":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "17":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "18":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "19":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "20":
            result[`param${i}`] = data[i].value;
            break;
          case "21":
            result[`param${i}`] = data[i].value;
            break;
          case "22":
            result[`param${i}`] = data[i].value;
            break;
          case "23":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
        }
      }
      result["exec_name_detail"] = this.rdata.exec_name_detail;
      result["exec_name_main"] = this.rdata.exec_name_main;
      result["report_code"] = this.rdata.report_code;
      result["row_num"] = this.row_num;

      sessionStorage.setItem("reportprint", JSON.stringify(result));
      var routeData = this.$router.resolve({
        path: "reportprint",
        name: "收费通知单打印",
      });
      window.open(routeData.href);
    },
    DownloadDataNew() {
      //通知但打印(新方式，由控件进行打印)
      if (sessionStorage.getItem("query_type") === "0") {
        //选择打印方式，如果为‘0’时则由浏览器进行打印
        this.DownloadData();
      } else {
        //根据设置值设置报表高度
        this.$nextTick(() => {
          this.LODOP = getLodop(); // 获取Lodop
          LODOP.SET_PRINT_PAGESIZE(
            1,
            "210mm",
            `${parseInt(this.query_type)}mm`,
            ""
          ); //query_type设置打印纸张高度
          var unit = document.querySelectorAll("table.jrPage");
          for (var j = 0; j < unit.length; j++) {
            //
            LODOP.NewPageA();
            LODOP.ADD_PRINT_HTM(
              0,
              0,
              "100%",
              "100%",
              document.querySelectorAll("table.jrPage")[j].outerHTML
            );
          }
          LODOP.SET_PRINT_MODE("RESELECT_PRINTER", true);
          LODOP.SET_PRINT_MODE("RESELECT_ORIENT", true);
          LODOP.SET_PRINT_MODE("RESELECT_PAGESIZE", true);
          LODOP.SET_PRINT_MODE("RESELECT_COPIES", true);
          this.LODOP.PREVIEW();
        });
      }
    },
    DoCostcalculation() {
      //通知单查询，解析searchList的值同时根据搜索条件类型进行不同的赋值方式
      var data = this.searchList;
      var result = {};
      for (var i in data) {
        switch (data[i].type) {
          case "0":
            var unit = this.options1;
            var list = data[i].value;
            var value = [];
            for (var j in list) {
              value.push(this.options1[list[j]].DLDA_DLMC);
            }
            result[`param${i}`] = value.join(",");
            break;
          case "1":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "2":
            var unit = this.options3;
            var list = data[i].value;
            var value = [];
            for (var j in list) {
              value.push(this.options3[list[j]].YFPZ_LKZRR);
            }
            result[`param${i}`] = value ? value.join(",") : "";
            break;
          case "3":
            var unit = this.options4;
            var list = data[i].value;
            var value = [];
            for (var j in list) {
              value.push(this.options4[list[j]].YFPZ_XMMC);
            }
            result[`param${i}`] = value ? value.join(",") : "";
            break;
          case "4":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "5":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "6":
            result[`param${i}`] = data[i].value;
            break;
          case "7":
            result[`param${i}`] = data[i].value;
            break;
          case "8":
            result[`param${i}`] = data[i].value;
            break;
          case "9":
            result[`param${i}`] = data[i].value;
            break;
          case "10":
            result[`param${i}`] = data[i].value;
            break;
          case "11":
            result[`param${i}`] = data[i].value;
            break;
          case "12":
            var unit = this.options1;
            var list = data[i].value;
            var value = [];
            for (var j in list) {
              value.push(this.options1[list[j]].DLDA_DLMC);
            }
            result[`param${i}`] = value.join(",");
            break;
          case "13":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "14":
            var unit = this.options1;
            var list = data[i].value;
            var value = [];
            for (var j in list) {
              value.push(this.options1[list[j]].DLDA_DLMC);
            }
            result[`param${i}`] = value.join(",");
            break;
          case "15":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "16":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "17":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "18":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "19":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
          case "20":
            result[`param${i}`] = data[i].value;
            break;
          case "21":
            result[`param${i}`] = data[i].value;
            break;
          case "22":
            result[`param${i}`] = data[i].value;
            break;
          case "23":
            result[`param${i}`] = data[i].value ? data[i].value.join(",") : "";
            break;
        }
      }
      result["exec_name_detail"] = this.rdata.exec_name_detail;
      result["exec_name_main"] = this.rdata.exec_name_main;
      result["report_code"] = this.rdata.report_code;
      result["row_num"] = this.row_num;

      let loading = Loading.service({
        target: document.querySelector(".loadingtext"),
        lock: true,
        fullscreen: false,
        spinner: "el-icon-loading",
        text: "数据量较大，加载中...",
        background: "rgba(0,0,0,0.7)",
      });
      var _this = this;
      Costcalculation(result).then((response) => {
        loading.close();
        if (response.returnStatus === "FAIL") {
          this.htmlvalue = "";
        } else {
          response = response.replace(/50%/g, "0").replace(/<br\/>/g, "");
          this.htmlvalue = response;
          this.$nextTick(() => {
            if (this.imgurl) {
              var imglist = _this.imgurl.split(";");
              var imgnum = 0;
              var imgtotal = imglist.length;
              var data = document.getElementsByTagName("img");
              for (var i = 0; i < data.length; i++) {
                //把报表中无效图片替换为二维码图片
                var unit = document.getElementsByTagName("img")[i].src;
                if (unit.indexOf("xxx.png") > 1) {
                  document.getElementsByTagName("img")[i].src = imglist[imgnum];
                  imgnum = imgnum === imgtotal - 1 ? 0 : imgnum + 1;
                }
              }
            }
            var tableunit = document.querySelectorAll("table.jrPage"); //获取整个页面的每个报表单独模块
            for (var j = 0; j < tableunit.length; j++) {
              //设置每个报表满屏宽度
              document.querySelectorAll("table.jrPage")[j].style.width = "100%";
              if (this.tdWidthSettings) {
                //特定多列设定宽度，用于打印控件调整列宽，数据格式为a,b,c;   a为标签<tbody>中tr的行数、b为td的列数、c为当前列所需要设置的宽度
                var tdlist = this.tdWidthSettings.split(";"); //Z端-报表模块(高级报表配置)--根据集团新增--列宽设置，如：1,2,30;2,3,50 (tr行,td列, width宽度)
                for (var i = 0; i < tdlist.length - 1; i++) {
                  var value = tdlist[i].split(",");
                  document.querySelectorAll("table.jrPage")[
                    j
                  ].children[0].children[value[0] - 1].children[
                    value[1]
                  ].style.width = `${value[2]}px`;
                }
              }
            }
            for (var k = 0; k < tableunit.length; k++) {
              document.querySelectorAll("table.jrPage")[k].children[0].children[
                document.querySelectorAll("table.jrPage")[k].children[0]
                  .children.length - 1
              ].style.height = 0;
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.CustomReport {
  .tree_wrap {
    padding: 0 10px;
    .el-tree {
      margin-top: 14px;
    }
  }

  .htmlvalue {
    width: 100%;
    overflow: auto;
  }

  .el-select {
    width: 100% !important;
  }

  .el-date-editor {
    width: 100% !important;
  }

  .block {
    text-align: right;
    padding: 15px 0 5px 0;
  }

  .DoPrint {
    position: absolute;
    top: 35px;
    right: 5px;
  }

  .el-date-editor {
    margin-bottom: 10px;
  }

  .el-select {
    margin-bottom: 10px;
  }

  .titlevalue {
    color: #333;
    line-height: 35px;
    font-size: 14px;
  }

  .el-input-group__append {
    padding: 0;
  }

  .el-button--default {
    min-width: 0;
    margin-right: 0 !important;
  }
}
</style>
<style scope>
/* .el-loading-spinner .circular {
  width: 42px;
  height: 42px;
  animation: loading-rotate 2s linear infinite;
  display: none;
}
.el-loading-spinner {
  background: url(~@/assets/comImgs/data_loading.gif) no-repeat;
  background-size: 220px 98px;
  width: 220px;
  height: 98px;
  position: relative;
  top: 50%;
  left: -150px;
  margin-left: 50%;
}

.el-loading-spinner i {
  display: none;
} */
</style>
