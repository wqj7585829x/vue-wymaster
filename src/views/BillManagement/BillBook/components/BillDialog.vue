<template>
  <div class="BillDialog">
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
        :model="BillForm"
        :rules="rules"
        ref="BillForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="票据分类:" prop="PJFL_FL">
              <el-cascader
                v-model="BillForm.PJFL_FL"
                :show-all-levels="false"
                :options="options"
                :disabled="editdisabled"
                :props="{ checkStrictly: true }"
                clearable
                @change="handleChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="票据名称:" prop="PJLY_PJMC">
              <el-input
                v-model="BillForm.PJLY_PJMC"
                :disabled="editdisabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50" v-if="title == '修改' ? false : true">
          <el-col :span="12">
            <el-form-item label="票据头:" prop="PJLY_PJT">
              <el-input
                v-model="BillForm.PJLY_PJT"
                :disabled="editdisabled"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="流水号长度:" prop="PJLY_LSHCD">
              <el-input-number
                v-model="BillForm.PJLY_LSHCD"
                :precision="0"
                :step="1"
                :min="0"
                :controls="false"
                :disabled="editdisabled"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50" v-if="title == '修改' ? false : true">
          <el-col :span="12">
            <el-form-item label="起始段号:" prop="PJLY_QSH">
              <el-input-number
                v-model="BillForm.PJLY_QSH"
                size="mini"
                :precision="0"
                :step="1"
                :controls="false"
                :disabled="editdisabled"
                @change="changePJBCFSM"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="终止段号:" prop="PJLY_JZH">
              <el-input-number
                v-model="BillForm.PJLY_JZH"
                size="mini"
                :precision="0"
                :step="1"
                :controls="false"
                :disabled="editdisabled"
                @change="changePJBCFSM"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50" v-if="title == '修改' ? false : true">
          <el-col :span="24">
            <el-form-item label="" prop="PJBCFSM" label-width="0">
              <el-checkbox
                v-model="BillForm.check"
                @change="BillCheck"
                style="margin-right: 0"
                >拆分为多本票据</el-checkbox
              >
              <el-input-number
                :disabled="!BillForm.check && (title == '修改' ? false : true)"
                class="text-mini"
                v-model="BillForm.PJBCFSM"
                :precision="0"
                :step="1"
                :min="0"
                :controls="false"
              ></el-input-number
              >&nbsp;本
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="最大金额:" prop="PJLY_ZDJE">
              <el-input-number
                v-model="BillForm.PJLY_ZDJE"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
                :disabled="editdisabled"
              >
              </el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="最大行数:" prop="PJLY_ZDHS">
              <el-input-number
                v-model="BillForm.PJLY_ZDHS"
                :precision="0"
                :step="1"
                :min="0"
                :controls="false"
                :disabled="editdisabled"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="报表名称:" prop="PJLY_BBMC">
              <el-input
                v-model="BillForm.PJLY_BBMC"
                :disabled="editdisabled"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="使用人:" prop="YH_MC">
              <el-input
                :disabled="true"
                class="input-with-select"
                v-model="BillForm.YH_MC"
              >
                <el-button
                  slot="append"
                  icon="el-icon-more"
                  @click="setUser()"
                ></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label-width="0"> &nbsp; </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="0">
              <el-checkbox v-model="BillForm.ZDHQPJH"
                >自动获取票据号</el-checkbox
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>

    <UserEditDialog
      :UserEditshow.sync="UserEditshow"
      ref="UserEditDialog"
      @getUser="getUser"
    ></UserEditDialog>
  </div>
</template>

<script>
import {
  orgTreeBill,
  addBillBook,
  updateBillBook,
} from "@/api/FeeManagement/BillManagement";
import UserEditDialog from "./UserEditDialog"; //用户编辑
export default {
  data() {
    var checkBeginTime = (rule, value, callback) => {
      if (value > this.BillForm.PJLY_JZH) {
        callback(new Error("终止号不能小于起始号"));
      } else {
        callback();
      }
    };
    var checkEndTime = (rule, value, callback) => {
      if (value < this.BillForm.PJLY_QSH) {
        callback(new Error("终止号不能小于起始号"));
      } else {
        callback();
      }
    };
    var checkPJBCFSM = (rule, value, callback) => {
      var num =
        parseInt(this.BillForm.PJLY_JZH) - parseInt(this.BillForm.PJLY_QSH) + 1;
      var Remainder = num % value;
      if (!value && this.BillForm.check) {
        callback(new Error("票据拆分数不能为空！"));
      } else if (value && Remainder != 0 && this.BillForm.check) {
        callback(new Error("票据号不能被整除，不能拆分！"));
      } else {
        callback();
      }
    };
    return {
      visible: this.show,
      title: "", //标题
      BillForm: {
        PJFL_FL: [],
      },
      rules: {
        PJFL_FL: [
          { required: true, message: "请选择票据分类", trigger: "blur" },
        ],
        PJLY_PJMC: [
          { required: true, message: "请选择票据名称", trigger: "blur" },
        ],
        // PJLY_PJT: [{ required: true, message: "请输入票据头", trigger: "blur" }],
        PJLY_LSHCD: [
          { required: true, message: "请输入流水号长度", trigger: "blur" },
        ],
        PJLY_QSH: [
          { required: true, message: "请输入票据起始号", trigger: "blur" },
          { validator: checkBeginTime, trigger: "blur" },
        ],
        PJLY_JZH: [
          { required: true, message: "请输入票据终止号", trigger: "blur" },
          { validator: checkEndTime, trigger: "blur" },
        ],
        PJBCFSM: [{ validator: checkPJBCFSM, trigger: "blur" }],
      },
      options: [],
      UserEditshow: false, //用户 弹框 标识
      editdisabled: "",
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
    changePJBCFSM() {
      this.$nextTick(() => {
        this.$refs.BillForm.validateField("PJBCFSM");
      });
    },
    //   判断新增，修改
    getPartitionData(data, type, isLazyLoad) {
      if (type == 0) {
        this.BillForm = {
          PJFL_FL: [],
          check: false,
          ZDHQPJH: false,
        };
        this.title = "新增";
        this.editdisabled = false;
      } else {
        this.title = "修改";
        data.PJLY_QSH = data.PJLY_MIN;
        data.PJLY_JZH = data.PJLY_MAX;
        data.PJFL_FLMC = data.PJLY_PJFL;
        data.YH_MC = data.PJLY_SYR;
        data.YH_BH = data.PJLY_SYRBH;
        data.ZDHQPJH = data.PJLY_ZDHQPJH;
        data.PJFL_FL = [];
        this.BillForm = JSON.parse(JSON.stringify(data));
        this.editdisabled = false;
        // this.editdisabled = data.PJLY_PJMC.indexOf('电子发票') == -1 && !isLazyLoad ? false : true
      }
      this.getBillType();
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["BillForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增") {
            addBillBook(_this.BillForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateBillBook(_this.BillForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                this.BillForm.PJLY_MIN = this.BillForm.PJLY_QSH;
                this.BillForm.PJLY_MAX = this.BillForm.PJLY_JZH;
                this.BillForm.PJLY_PJFL = this.BillForm.PJFL_FLMC;
                this.BillForm.PJLY_SYR = this.BillForm.YH_MC;
                this.BillForm.PJLY_ZDHQPJH = this.BillForm.ZDHQPJH;
                let newobj = JSON.parse(JSON.stringify(_this.BillForm));
                _this.$emit("RefreshItem", newobj);
                _this.cancle();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    //票据类型
    getBillType() {
      var _this = this;
      orgTreeBill().then((response) => {
        var options = [];
        for (var item in response) {
          var data = response[item].children;
          options.push({
            value: response[item].data.ZJ + "," + response[item].data.PJFL_FLMC,
            label: response[item].data.PJFL_FLMC,
            children: [],
          });
          if (response[item].data.PJFL_FLMC == _this.BillForm.PJLY_PJFL) {
            _this.BillForm.PJFL_FL.push(options[item].value);
          }
          for (var i in data) {
            options[item].children.push({
              value: data[i].data.SJZJ + "," + data[i].data.PJFL_FLMC,
              label: data[i].data.PJFL_FLMC,
            });
            if (data[i].data.PJFL_FLMC == _this.BillForm.PJLY_PJFL) {
              _this.BillForm.PJFL_FL.push(options[item].value);
              _this.BillForm.PJFL_FL.push(
                data[i].data.SJZJ + "," + data[i].data.PJFL_FLMC
              );
            }
          }
        }
        _this.options = JSON.parse(JSON.stringify(options));
        _this.BillForm.PJFL_FL = JSON.parse(
          JSON.stringify(_this.BillForm.PJFL_FL)
        );
      });
    },
    handleChange(val) {
      this.BillForm.PJFL_FL = val;

      var data = val[val.length - 1].split(",");
      this.BillForm.PJFL_FLMC = val.length === 0 ? "" : data[1];
      this.BillForm.PJFL_PJLX = val.length === 0 ? "" : data[0];
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.BillForm.validateField("PJFL_FL");
        });
      }, 500);
    },
    //设置使用人
    setUser() {
      this.BillForm.YH_MC = this.BillForm.YH_MC ? this.BillForm.YH_MC : "";
      this.$refs.UserEditDialog.getTreeFun(this.BillForm.YH_MC);
      this.UserEditshow = true;
    },
    //获取使用人
    getUser(id, val) {
      this.BillForm.YH_BH = id;
      this.BillForm.YH_MC = val;
    },
    //是否为票据本判断
    BillCheck(val) {
      this.$nextTick(() => {
        this.$refs.BillForm.validateField("PJBCFSM");
      });
    },
    // 取消
    cancle() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.BillForm.resetFields(); //重置输入框提示
      });
    },
  },
  components: {
    UserEditDialog,
  },
};
</script>

<style>
.BillDialog .el-input-number {
  width: 100% !important;
  text-align: left;
}

.BillDialog .el-input-number {
  width: 100% !important;
}

.BillDialog .el-input-number input {
  text-align: left;
}

.BillDialog .num-mini {
  width: 44% !important;
}
.BillDialog .text-mini {
  width: 25% !important;
}
.BillDialog .el-input-group__append {
  width: 60px;
  padding: 0;
}

.BillDialog .el-cascader {
  width: 100% !important;
}

.BillDialog .el-input-group--append .el-button {
  margin: -10px -20px !important;
}
</style>
