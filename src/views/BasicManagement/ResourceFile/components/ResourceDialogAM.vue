<template>
  <div class="ResourceDialogAM">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :show="show"
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
              <span>{{ ResourceData.GLQDA_GLQMC }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="分区代码:">
              <span>{{ ResourceData.GLQDA_GLQID }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="楼栋名称:">
              <span>{{ ResourceData.DLDA_DLMC }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="楼栋代码:">
              <span>{{ ResourceData.DLDA_DLID }}</span>
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
            <el-form-item label="楼层号位数:" label-width="100px">
              <el-input-number
                v-model="ResourceForm.buildingNumType"
                :precision="0"
                :step="1"
                :min="1"
                :max="8"
                @change="buildingNumchange()"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="楼层号：" label-width="80px">
              从&nbsp;<el-input-number
                class="num-mini-2"
                v-model="automatic.buildingNum1"
                @change="buildingNum"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="max(ResourceForm.buildingNumType)"
              ></el-input-number
              >&nbsp;至&nbsp;
              <el-input-number
                class="num-mini-2"
                v-model="automatic.buildingNum2"
                @change="buildingNum"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="max(ResourceForm.buildingNumType)"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="资源号位数:" label-width="100px">
              <el-input-number
                v-model="ResourceForm.roomNumType"
                :precision="0"
                :step="1"
                :min="1"
                :max="8"
                @change="roomNumchange()"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="资源号：" label-width="80px">
              &emsp;&nbsp;<el-input-number
                class="num-mini-2"
                v-model="automatic.resourceNum1"
                @change="resourceNum"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="max(ResourceForm.roomNumType)"
              ></el-input-number
              >&nbsp;至&nbsp;
              <el-input-number
                class="num-mini-2"
                v-model="automatic.resourceNum2"
                @change="resourceNum"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="max(ResourceForm.roomNumType)"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="el-line-2"></div>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="资源代码样式:" label-width="120px">
              <span>{{ Resourcecode }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="资源类型:" prop="FJDA_ZYLX">
              <el-select v-model="ResourceForm.FJDA_ZYLX">
                <el-option
                  v-for="item in ResourceTypeData"
                  :key="item.BMB_LXNR"
                  :label="item.BMB_LXNR"
                  :value="item.BMB_LXNR"
                >
                </el-option>
              </el-select>
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
import {
  queryResourceTypeLevel,
  queryGeneratedResources,
  automaticallyGeneratedResources,
} from "@/api/BasicManagement/ResourceFile";
export default {
  data() {
    return {
      visible: this.show,
      title: "自动生成", //标题
      ResourceForm: {
        prefixCode: "",
        FJDA_DLWJ: "",
        FJDA_GLQWJ: "",
        FJDA_GLQID: "",
        FJDA_DLID: "",
        utilNum: "1-1",
        buildingNum: "1-1",
        resourceNum: "1-1",
        buildingNumType: "1",
        roomNumType: "1",
        FJDA_ZYLX: "",
        GLCID: "",
        YXDID: "",
      },
      ResourceTypeData: [],
      rules: {
        // FJDA_ZYLX: [
        //   { required: true, message: "请选择资源类型", trigger: "blur" }
        // ],
      },
      ResourceData: {},
      unittype: false,
      automatic: {
        utilNum1: "1",
        utilNum2: "1",
        buildingNum1: "1",
        buildingNum2: "1",
        resourceNum1: "1",
        resourceNum2: "1",
      },
      Resourcecode: "",
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show() {
      this.visible = this.show;
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
    buildingNum() {
      //楼层号
      this.$nextTick(() => {
        this.automatic.buildingNum1 = this.automatic.buildingNum1
          ? this.automatic.buildingNum1
          : 1;
        this.automatic.buildingNum2 = this.automatic.buildingNum2
          ? this.automatic.buildingNum2
          : 1;
        var value;
        value = this.automatic.buildingNum1 + "-" + this.automatic.buildingNum2;
        this.ResourceForm.buildingNum = value;
        this.getResourcecode();
      });
    },
    buildingNumchange() {
      this.$nextTick(() => {
        this.ResourceForm.buildingNumType = this.ResourceForm.buildingNumType
          ? this.ResourceForm.buildingNumType
          : 1;
        this.getResourcecode();
      });
    },
    roomNumchange() {
      this.$nextTick(() => {
        this.ResourceForm.roomNumType = this.ResourceForm.roomNumType
          ? this.ResourceForm.roomNumType
          : 1;
        this.getResourcecode();
      });
    },
    resourceNum() {
      //资源号
      this.$nextTick(() => {
        this.automatic.resourceNum1 = this.automatic.resourceNum1
          ? this.automatic.resourceNum1
          : 1;
        this.automatic.resourceNum2 = this.automatic.resourceNum2
          ? this.automatic.resourceNum2
          : 1;
        var value;
        value = this.automatic.resourceNum1 + "-" + this.automatic.resourceNum2;
        this.ResourceForm.resourceNum = value;
        this.getResourcecode();
      });
    },
    getResourcecode() {
      //资源代码,前缀代码加上加上'-'再加上楼层号和资源号，楼层号资源号由位数和起始号码决定
      this.Resourcecode = this.ResourceForm.prefixCode;
      var utilNum =
        this.automatic.utilNum1 < 10
          ? "0" + this.automatic.utilNum1
          : this.automatic.utilNum1;
      this.Resourcecode += this.unittype ? "-" + utilNum + "-" : "-";
      var buildingNum;
      if (
        this.ResourceForm.buildingNumType >
        (this.automatic.buildingNum1 + "").length
      ) {
        buildingNum =
          this.repeat(
            "0",
            this.ResourceForm.buildingNumType -
              (this.automatic.buildingNum1 + "").length
          ) + this.automatic.buildingNum1;
      } else {
        buildingNum = this.automatic.buildingNum1;
      }
      this.Resourcecode += buildingNum;

      var resourceNum;
      if (
        this.ResourceForm.roomNumType >
        (this.automatic.resourceNum1 + "").length
      ) {
        resourceNum =
          this.repeat(
            "0",
            this.ResourceForm.roomNumType -
              (this.automatic.resourceNum1 + "").length
          ) + this.automatic.resourceNum1;
      } else {
        resourceNum = this.automatic.resourceNum1;
      }
      this.Resourcecode += resourceNum;
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
        buildingNum: "1-1",
        resourceNum: "1-1",
        buildingNumType: "1",
        roomNumType: "1",
        FJDA_ZYLX: "",
        GLCID: val.GLCID,
        YXDID: val.YXDID,
      };
      (this.unittype = false),
        (this.automatic = {
          utilNum1: "1",
          utilNum2: "1",
          buildingNum1: "1",
          buildingNum2: "1",
          resourceNum1: "1",
          resourceNum2: "1",
        }),
        this.ResourceType();
      this.GeneratedResources(val.DLDA_ZJ);
    },
    //资源类型
    ResourceType() {
      queryResourceTypeLevel().then((response) => {
        var data = response;
        if (data) {
          this.ResourceTypeData = data;
        }
      });
    },
    //资源登记查询资源数据
    GeneratedResources(DLDA_ZJ) {
      queryGeneratedResources(DLDA_ZJ).then((response) => {
        var data = response;
        if (data) {
          this.ResourceData = data;
          this.ResourceForm.prefixCode =
            data.GLQDA_GLQID + "-" + data.DLDA_DLID;
          this.ResourceForm.FJDA_GLQID = data.GLQDA_GLQID;
          this.ResourceForm.FJDA_DLID = data.DLDA_DLID;
          this.getResourcecode();
        }
      });
    },
    //确定
    sure() {
      var _this = this;
      this.$refs["ResourceForm"].validate((valid) => {
        if (valid) {
          if (_this.automatic.utilNum1 > _this.automatic.utilNum2) {
            this.$message({
              type: "warning",
              message: "单元起始号不能大于终止号",
            });
            return false;
          }
          if (_this.automatic.buildingNum1 > _this.automatic.buildingNum2) {
            this.$message({
              type: "warning",
              message: "楼层起始号不能大于终止号",
            });
            return false;
          }
          if (_this.automatic.resourceNum1 > _this.automatic.resourceNum2) {
            this.$message({
              type: "warning",
              message: "资源起始号不能大于终止号",
            });
            return false;
          }

          this.ResourceForm.utilNum = this.unittype
            ? this.ResourceForm.utilNum
            : "";

          automaticallyGeneratedResources(_this.ResourceForm).then(
            (response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    //取消
    cancle() {
      this.$emit("update:show", false);
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
</style>
