<template>
  <div class="FeecycleDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="85px"
        :model="FeecycleForm"
        :rules="rules"
        ref="FeecycleForm"
      >
        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item
              label="收费周期选择:"
              prop="CGBZ_YFSD"
              label-width="125px"
            >
              <el-radio v-model="FeecycleForm.CGBZ_YFSD" :label="1"
                >逐月收费</el-radio
              >
              <el-radio v-model="FeecycleForm.CGBZ_YFSD" :label="2"
                >指定月份收费</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
        <div class="el-line-2"></div>

        <!-- 指定月份收费begin -->
        <el-row :gutter="50" v-if="FeecycleForm.CGBZ_YFSD === 2">
          <el-col :span="8">
            <el-form-item label="" label-width="0px">
              <el-checkbox v-model="costList[0].type" @change="getMonthData"
                >一月&emsp;</el-checkbox
              >
              <el-input-number
                class="num-mini"
                v-model="costList[0].times"
                @change="getMonthData"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="999"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" label-width="0px">
              <el-checkbox v-model="costList[1].type" @change="getMonthData"
                >二月&emsp;</el-checkbox
              >
              <el-input-number
                class="num-mini"
                v-model="costList[1].times"
                @change="getMonthData"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="999"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" label-width="0px">
              <el-checkbox v-model="costList[2].type" @change="getMonthData"
                >三月&emsp;</el-checkbox
              >
              <el-input-number
                class="num-mini"
                v-model="costList[2].times"
                @change="getMonthData"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="999"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" v-if="FeecycleForm.CGBZ_YFSD === 2">
          <el-col :span="8">
            <el-form-item label="" label-width="0px">
              <el-checkbox v-model="costList[3].type" @change="getMonthData"
                >四月&emsp;</el-checkbox
              >
              <el-input-number
                class="num-mini"
                v-model="costList[3].times"
                @change="getMonthData"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="999"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" label-width="0px">
              <el-checkbox v-model="costList[4].type" @change="getMonthData"
                >五月&emsp;</el-checkbox
              >
              <el-input-number
                class="num-mini"
                v-model="costList[4].times"
                @change="getMonthData"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="999"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" label-width="0px">
              <el-checkbox v-model="costList[5].type" @change="getMonthData"
                >六月&emsp;</el-checkbox
              >
              <el-input-number
                class="num-mini"
                v-model="costList[5].times"
                @change="getMonthData"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="999"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" v-if="FeecycleForm.CGBZ_YFSD === 2">
          <el-col :span="8">
            <el-form-item label="" label-width="0px">
              <el-checkbox v-model="costList[6].type" @change="getMonthData"
                >七月&emsp;</el-checkbox
              >
              <el-input-number
                class="num-mini"
                v-model="costList[6].times"
                @change="getMonthData"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="999"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" label-width="0px">
              <el-checkbox v-model="costList[7].type" @change="getMonthData"
                >八月&emsp;</el-checkbox
              >
              <el-input-number
                class="num-mini"
                v-model="costList[7].times"
                @change="getMonthData"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="999"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" label-width="0px">
              <el-checkbox v-model="costList[8].type" @change="getMonthData"
                >九月&emsp;</el-checkbox
              >
              <el-input-number
                class="num-mini"
                v-model="costList[8].times"
                @change="getMonthData"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="999"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" v-if="FeecycleForm.CGBZ_YFSD === 2">
          <el-col :span="8">
            <el-form-item label="" label-width="0px">
              <el-checkbox v-model="costList[9].type" @change="getMonthData"
                >十月&emsp;</el-checkbox
              >
              <el-input-number
                class="num-mini"
                v-model="costList[9].times"
                @change="getMonthData"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="999"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" label-width="0px">
              <el-checkbox v-model="costList[10].type" @change="getMonthData"
                >十一月</el-checkbox
              >
              <el-input-number
                class="num-mini"
                v-model="costList[10].times"
                @change="getMonthData"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="999"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" label-width="0px">
              <el-checkbox v-model="costList[11].type" @change="getMonthData"
                >十二月</el-checkbox
              >
              <el-input-number
                class="num-mini"
                v-model="costList[11].times"
                @change="getMonthData"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="999"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50" v-if="FeecycleForm.CGBZ_YFSD === 2">
          <el-col :span="24">
            <el-form-item label="" prop="CGBZ_FYABL" label-width="0px">
              <el-radio v-model="FeecycleForm.CGBZ_FYABL" :label="1"
                >全额收取</el-radio
              >
              <el-radio v-model="FeecycleForm.CGBZ_FYABL" :label="2"
                >分月按比例收取</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 指定月份收费end -->

        <!-- 公共begin -->
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="期间方向:">
              <el-radio v-model="FeecycleForm.CGBZ_FX" :label="true"
                >向前</el-radio
              >
              <el-radio v-model="FeecycleForm.CGBZ_FX" :label="false"
                >向后</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="1">
            <el-form-item label="" label-width="0px">
              <el-radio v-model="FeecycleForm.CGBZ_QJLX" :label="1"
                >&nbsp;</el-radio
              >
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="起始日:">
              <el-input-number
                v-model="FeecycleForm.CGBZ_QSR"
                :precision="0"
                :step="1"
                :min="1"
                :max="31"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="1">
            <el-form-item label="" label-width="0px">
              <el-radio v-model="FeecycleForm.CGBZ_QJLX" :label="2"
                >&nbsp;</el-radio
              >
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item label="选择日期:">
              <el-date-picker
                v-model="choosetime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="timeChange"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 公共end -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryChargeCycle,
  updateChargeCycle,
} from "@/api/FeeManagement/StandardDefinition.js";
export default {
  data() {
    return {
      visible: this.Feecycleshow,
      title: "收费周期设置", //标题
      FeecycleForm: {},
      timetype: 1,
      rules: {},
      choosetime: [],
      costList: [],
    };
  },
  props: {
    Feecycleshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Feecycleshow() {
      this.visible = this.Feecycleshow;
    },
  },
  mounted() {},
  methods: {
    // 详情数据
    getTableData(CGBZ_ZJ) {
      this.choosetime = [];
      var _this = this;
      this.costList = [];
      queryChargeCycle(CGBZ_ZJ).then((response) => {
        _this.FeecycleForm = response;
        _this.FeecycleForm.CGBZ_ZJ = CGBZ_ZJ;
        if (!response.CGBZ_SFYF && !response.CGBZ_YFSFBS) {
          for (var i = 0; i < 12; i++) {
            this.costList.push({
              type: false,
              times: 0,
            });
          }
        }
        if (response.CGBZ_SFYF && !response.CGBZ_YFSFBS) {
          var type = response.CGBZ_SFYF;
          for (var i = 0; i < 12; i++) {
            _this.costList.push({
              type: type.substr(i, 1) === "1" ? true : false,
              times: 0,
            });
          }
        }
        if (!response.CGBZ_SFYF && response.CGBZ_YFSFBS) {
          var times = response.CGBZ_YFSFBS;
          for (var i = 0; i < 12; i++) {
            _this.costList.push({
              type: false,
              times: times.substr(3 * i, 3),
            });
          }
        }
        if (response.CGBZ_SFYF && response.CGBZ_YFSFBS) {
          var type = response.CGBZ_SFYF;
          var times = response.CGBZ_YFSFBS;
          for (var i = 0; i < 12; i++) {
            _this.costList.push({
              type: type.substr(i, 1) === "1" ? true : false,
              times: times.substr(3 * i, 3),
            });
          }
        }

        var time = response.CGBZ_QJQZ.replace(/\s*/g, "").split("至");
        this.choosetime = time;
      });
    },
    //日期获得
    timeChange(val) {
      this.FeecycleForm.CGBZ_QJQZ = val[0] + "至" + val[1];
    },
    //获取指定月份数据
    getMonthData() {
      var data = this.costList;
      var month = "";
      var times = "";
      for (var i in data) {
        month += data[i].type ? "1" : "0";
        times += this.setnum(data[i].times);
      }
      this.FeecycleForm.CGBZ_SFYF = month;
      this.FeecycleForm.CGBZ_YFSFBS = times;
    },
    //数字数位补齐
    setnum(val) {
      val = val + "";
      switch (val.length) {
        case 1:
          return "00" + val;
          break;
        case 2:
          return "0" + val;
          break;
        case 3:
          return val;
          break;
      }
    },
    //确定
    sure() {
      var type =
        this.choosetime == null
          ? !this.choosetime
          : this.choosetime.length === 1
          ? true
          : false;
      if (type && this.FeecycleForm.CGBZ_QJLX == 2) {
        this.$message.error("没有选择日期，请检查！");
        return;
      }
      updateChargeCycle(this.FeecycleForm).then((response) => {
        this.cancle();
      });
    },
    //取消
    cancle() {
      this.$emit("update:Feecycleshow", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-line-1 {
  width: 100%;
  height: 2px;
  background: #888;
  margin-bottom: 20px;
}
.el-line-2 {
  width: 90%;
  height: 2px;
  background: #888;
  margin-left: 5%;
  margin-bottom: 20px;
}
</style>
<style>
.FeecycleDialog .el-input-number {
  width: 100%;
}

.FeecycleDialog .el-input-number {
  line-height: 33px;
}

.FeecycleDialog .num-mini {
  width: 44%;
}

.FeecycleDialog .num-mini-2 {
  width: 40%;
}
</style>
