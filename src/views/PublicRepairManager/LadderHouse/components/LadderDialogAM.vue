<template>
  <div class="ResourceDialogAM">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :AMshow="AMshow"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="85px"
        :model="ResourceForm"
        :rules="rules"
        ref="ResourceForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="分区名称:">
              <span>{{ ResourceData.GLQMC }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="分区代码:">
              <span>{{ ResourceData.GLQID }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="楼栋名称:">
              <span>{{ ResourceData.MC }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="楼栋代码:">
              <span>{{ ResourceData.ID }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="el-line-2"></div>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="前缀代码:" prop="prefixCode">
              <el-input
                v-model="ResourceForm.prefixCode"
                @change="getResourcecode()"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="6">
            <el-form-item label="单元号">
              <el-checkbox
                v-model="unittype"
                @change="getResourcecode()"
              ></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="单元号：" label-width="120px">
              <el-input-number
                class="num-mini"
                v-model="automatic.utilNum1"
                @change="utilNum"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="99"
                :disabled="!unittype"
              ></el-input-number
              >&nbsp;至&nbsp;
              <el-input-number
                class="num-mini"
                v-model="automatic.utilNum2"
                @change="utilNum"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="99"
                :disabled="!unittype"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="梯编码位数:" label-width="100px">
              <el-input-number
                v-model="ResourceForm.LadderNumType"
                :precision="0"
                :step="1"
                :min="1"
                :max="8"
                @change="LadderNumchange"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="梯编码:" label-width="80px">
              从&nbsp;<el-input-number
                class="num-mini-2"
                v-model="automatic.LadderNum1"
                @change="LadderNum"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="max(ResourceForm.LadderNumType)"
              ></el-input-number
              >&nbsp;至&nbsp;
              <el-input-number
                class="num-mini-2"
                v-model="automatic.LadderNum2"
                @change="LadderNum"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="max(ResourceForm.LadderNumType)"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="el-line-2"></div>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="梯编码样式:" label-width="120px">
              <span>{{ Resourcecode }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addLadderAutomatic } from "@/api/PublicRepairManager/LadderHouse";
export default {
  data() {
    return {
      visible: this.AMshow,
      title: "自动生成", //标题
      ResourceForm: {
        prefixCode: "",
        FJDA_DLWJ: "",
        FJDA_GLQWJ: "",
        FJDA_GLQID: "",
        FJDA_DLID: "",
        utilNum: "1-1",
        LadderNum: "1-1",
        resourceNum: "1-1",
        LadderNumType: "1",
        FJDA_ZYLX: "",
        GLCID: "",
        YXDID: "",
      },
      ResourceTypeData: [],
      rules: {},
      ResourceData: {},
      unittype: false,
      automatic: {
        utilNum1: "1",
        utilNum2: "1",
        LadderNum1: "1",
        LadderNum2: "1",
      },
      Resourcecode: "",
    };
  },
  props: {
    AMshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    AMshow() {
      this.visible = this.AMshow;
    },
  },
  methods: {
    max(no) {
      //最大位数
      let newArr = new Array(parseInt(no ? no : 1));
      return parseInt(newArr.fill("9").join(""));
    },
    utilNum() {
      //单元号
      this.$nextTick(() => {
        this.automatic.utilNum1 = this.automatic.utilNum1
          ? this.automatic.utilNum1
          : 1;
        this.automatic.utilNum2 = this.automatic.utilNum2
          ? this.automatic.utilNum2
          : 1;
        var value;
        value = this.automatic.utilNum1 + "-" + this.automatic.utilNum2;
        this.ResourceForm.utilNum = this.unittype ? value : "";
        this.getResourcecode();
      });
    },
    LadderNum() {
      //梯编码
      this.$nextTick(() => {
        this.automatic.LadderNum1 = this.automatic.LadderNum1
          ? this.automatic.LadderNum1
          : 1;
        this.automatic.LadderNum2 = this.automatic.LadderNum2
          ? this.automatic.LadderNum2
          : 1;
        var value;
        value = this.automatic.LadderNum1 + "-" + this.automatic.LadderNum2;
        this.ResourceForm.LadderNum = value;
        this.getResourcecode();
      });
    },
    LadderNumchange() {
      this.$nextTick(() => {
        this.ResourceForm.LadderNumType = this.ResourceForm.LadderNumType
          ? this.ResourceForm.LadderNumType
          : 1;
        this.getResourcecode();
      });
    },
    getResourcecode() {
      //梯编码代码，前缀代码，如果有勾选单元号，拼接阿航单元号，最后拼接梯编码，由位数和起始位数
      this.Resourcecode = this.ResourceForm.prefixCode;
      var utilNum =
        this.automatic.utilNum1 < 10
          ? "0" + this.automatic.utilNum1
          : this.automatic.utilNum1;
      this.Resourcecode += this.unittype ? "-" + utilNum + "-" : "-";
      var LadderNum;
      if (
        this.ResourceForm.LadderNumType >
        (this.automatic.LadderNum1 + "").length
      ) {
        LadderNum =
          this.repeat(
            "0",
            this.ResourceForm.LadderNumType -
              (this.automatic.LadderNum1 + "").length
          ) + this.automatic.LadderNum1;
      } else {
        LadderNum = this.automatic.LadderNum1;
      }
      this.Resourcecode += LadderNum;
    },
    //重复某个字符串n次
    repeat(str, n) {
      return new Array(n + 1).join(str);
    },
    //初始化
    initialize(val) {
      this.ResourceForm = {
        prefixCode: "",
        FJDA_DLWJ: val.FJDA_DLWJ,
        FJDA_GLQWJ: val.FJDA_GLQWJ,
        FJDA_GLQID: "",
        FJDA_DLID: "",
        utilNum: "1-1",
        LadderNum: "1-1",
        resourceNum: "1-1",
        LadderNumType: "1",
        roomNumType: "1",
        FJDA_ZYLX: "",
        FCDM_FGLX: val.FCDM_FGLX,
        GLCID: val.GLCID,
        YXDID: val.YXDID,
      };
      (this.unittype = false),
        (this.automatic = {
          utilNum1: "1",
          utilNum2: "1",
          LadderNum1: "1",
          LadderNum2: "1",
        }),
        this.GeneratedResources(val);
    },
    //资源登记查询资源数据
    GeneratedResources(val) {
      this.ResourceData = {
        GLQID: val.FCDM_GLQID,
        GLQMC: val.FCDM_GLQMC,
        GLQZJ: val.FCDM_GLQZJ,
        ID: val.FCDM_ID,
        MC: val.FCDM_MC,
        ZJ: val.FCDM_ZJ,
      };
      this.ResourceForm.prefixCode = val.FCDM_GLQID + "-" + val.FCDM_ID;
      this.ResourceForm.FCDM_GLQID = val.FCDM_GLQID;
      this.ResourceForm.FCDM_ID = val.FCDM_ID;
      this.getResourcecode();
    },
    //确定
    sure() {
      var _this = this;
      this.$refs["ResourceForm"].validate((valid) => {
        if (valid) {
          if (_this.automatic.utilNum1 > _this.automatic.utilNum1) {
            this.$message({
              type: "warning",
              message: "单元起始号不能大于终止号",
            });
            return false;
          }
          if (_this.automatic.LadderNum1 > _this.automatic.LadderNum2) {
            this.$message({
              type: "warning",
              message: "楼层起始号不能大于终止号",
            });
            return false;
          }

          this.ResourceForm.utilNum = this.unittype
            ? this.ResourceForm.utilNum
            : "";
          addLadderAutomatic({
            QZDM: this.ResourceForm.prefixCode,
            DYH_SELECTED: _this.unittype ? 1 : 0,
            DYWS: _this.unittype ? 2 : "",
            DYH_LOW: _this.unittype ? _this.automatic.utilNum1 : "",
            DYH_HIGH: _this.unittype ? _this.automatic.utilNum2 : "",
            BMWS: this.ResourceForm.LadderNumType,
            TBM_LOW: this.automatic.LadderNum1,
            TBM_HIGH: this.automatic.LadderNum2,
            FCDM_ZJ: this.ResourceData.ZJ,
            FCDM_ID: this.ResourceData.ID,
            FCDM_GLQID: this.ResourceData.GLQID,
            FCDM_GLQZJ: this.ResourceData.GLQZJ,
            FCDM_FGLX: this.ResourceForm.FCDM_FGLX,
          }).then((response) => {
            if (response.returnStatus == "SUCCESS") {
              _this.$emit("RefreshItem");
              _this.cancle();
            }
          });
        } else {
          return false;
        }
      });
    },
    //取消
    cancle() {
      this.$emit("update:AMshow", false);
      this.$nextTick(() => {
        this.$refs.ResourceForm.resetFields(); //重置输入框提示
      });
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
.ResourceDialogAM .el-input-number {
  width: 100%;
}

.ResourceDialogAM .el-input-number {
  line-height: 33px;
}

.ResourceDialogAM .num-mini {
  width: 44%;
}

.ResourceDialogAM .num-mini-2 {
  width: 40%;
}

.ResourceDialogAM .el-dialog .el-input__inner {
  height: 35px !important;
  line-height: 30px !important;
}
</style>
