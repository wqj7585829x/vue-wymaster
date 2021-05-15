<template>
  <div class="CusDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form label-width="85px" :model="cusForm" :rules="rules" ref="cusForm">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础信息" name="first">
            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="客户代码:" prop="KHDA_KHID">
                  <el-input v-model="cusForm.KHDA_KHID"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="客户名称:" prop="KHDA_KHMC">
                  <el-input v-model="cusForm.KHDA_KHMC"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="客户属性:" prop="KHDA_KHLX">
                  <el-select v-model="cusForm.KHDA_KHLX">
                    <el-option label="个人" value="个人"></el-option>
                    <el-option label="公司" value="公司"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="联系人:" prop="KHDA_LXR">
                  <el-input v-model="cusForm.KHDA_LXR"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="电子邮箱:" prop="KHDA_DZYX">
                  <el-input v-model="cusForm.KHDA_DZYX"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="手机:" prop="KHDA_SJ">
                  <el-input v-model="cusForm.KHDA_SJ"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item
                  label="地址电话:"
                  prop="KHDA_NSRDZDH"
                  v-if="isGetInvoiceData"
                >
                  <el-input v-model="cusForm.KHDA_NSRDZDH"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item
                  label="识别号:"
                  prop="KHDA_NSRSBH"
                  v-if="isGetInvoiceData"
                >
                  <el-input
                    v-model="cusForm.KHDA_NSRSBH"
                    placeholder="请输入纳税人识别号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item
                  label="纳税人:"
                  prop="KHDA_NSRMC"
                  v-if="isGetInvoiceData"
                >
                  <el-input
                    v-model="cusForm.KHDA_NSRMC"
                    placeholder="请输入纳税人名称"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item
                  label="开户行:"
                  prop="KHDA_KHHJZH"
                  v-if="isGetInvoiceData"
                >
                  <el-input
                    v-model="cusForm.KHDA_KHHJZH"
                    placeholder="请输入开户行及账号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="入住状态:" prop="FKGX_SFKZ">
                  <el-select
                    v-model="cusForm.FKGX_SFKZ"
                    placeholder="请选择入住状态"
                  >
                    <el-option label="入住" :value="false"></el-option>
                    <el-option label="空置" :value="true"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="类型:" prop="FKGX_LX">
                  <el-select v-model="cusForm.FKGX_LX">
                    <el-option label="业主" :value="1"></el-option>
                    <el-option label="租户" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="备注:" prop="KHDA_BZ">
                  <el-input v-model="cusForm.KHDA_BZ"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="详细信息" name="second">
            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="曾用名称:" prop="KHDA_CYMC">
                  <el-input v-model="cusForm.KHDA_CYMC"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="客户分类:" prop="KHDA_KHFL">
                  <el-select v-model="cusForm.KHDA_KHFL">
                    <el-option label="普通客户" value="普通客户"></el-option>
                    <el-option label="关键客户" value="关键客户"></el-option>
                    <el-option label="重要客户" value="重要客户"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="证件名称:" prop="KHDA_ZJMC">
                  <el-select v-model="cusForm.KHDA_ZJMC">
                    <el-option label="身份证" value="身份证"></el-option>
                    <el-option
                      label="营业许可证"
                      value="营业许可证"
                    ></el-option>
                    <el-option label="暂住证" value="暂住证"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="证件号码:" prop="KHDA_ZJHM">
                  <el-input v-model="cusForm.KHDA_ZJHM"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="增值税发票:" prop="KHDA_ZZSFPFL">
                  <el-select
                    v-model="cusForm.KHDA_ZZSFPFL"
                    placeholder="请选择增值税发票分类"
                  >
                    <el-option
                      label="增值税普通发票"
                      value="增值税普通发票"
                    ></el-option>
                    <el-option
                      label="增值税专用发票"
                      value="增值税专用发票"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="人口数:" prop="KHDA_RKS">
                  <el-input-number
                    v-model="cusForm.KHDA_RKS"
                    :precision="0"
                    :step="1"
                    :min="0"
                    :controls="false"
                  >
                  </el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="联系电话:" prop="KHDA_LXDH">
                  <el-input v-model="cusForm.KHDA_LXDH"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="单位名称:" prop="KHDA_DWMC">
                  <el-input v-model="cusForm.KHDA_DWMC"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="家庭电话:" prop="KHDA_JTDH">
                  <el-input v-model="cusForm.KHDA_JTDH"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="提醒天数:" prop="KHDA_TQTXTS">
                  <el-input-number
                    v-model="cusForm.KHDA_TQTXTS"
                    placeholder="请输入提前提醒天数"
                    :precision="0"
                    :step="1"
                    :min="0"
                    :controls="false"
                  >
                  </el-input-number>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50">
              <el-col :span="12">
                <el-form-item label="锁定标志:" prop="KHDA_SDBZ">
                  <el-checkbox v-model="cusForm.KHDA_SDBZ"></el-checkbox>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="收费对象:" prop="FKGX_SFSFDX">
                  <el-checkbox v-model="cusForm.FKGX_SFSFDX"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50" v-if="cusForm.FKGX_SFSFDX">
              <el-col :span="12">
                <el-form-item label="开始收费:" prop="FKGX_KSSFRQ">
                  <el-date-picker
                    type="date"
                    placeholder="选择开始收费日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    v-model="cusForm.FKGX_KSSFRQ"
                  ></el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="终止收费:" prop="FKGX_ZZSFRQ">
                  <el-date-picker
                    type="date"
                    placeholder="选择终止收费日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    v-model="cusForm.FKGX_ZZSFRQ"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50" v-if="cusForm.FKGX_SFSFDX">
              <el-col :span="12">
                <el-form-item label="入住日期:" prop="FKGX_RZRQ">
                  <el-date-picker
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    v-model="cusForm.FKGX_RZRQ"
                  ></el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="合同到期:" prop="FKGX_HTDQRQ">
                  <el-date-picker
                    type="date"
                    placeholder="选择合同到期时间"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    v-model="cusForm.FKGX_HTDQRQ"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="50" v-if="cusForm.FKGX_SFSFDX">
              <el-col :span="12">
                <el-form-item label="发票对象:" prop="FKGX_FPDX">
                  <el-checkbox v-model="cusForm.FKGX_FPDX"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
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
  addCustomerProfile,
  updateCustomerProfile,
  customerNameIsExist,
} from "@/api/BasicManagement/CustomerFile";
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      cusForm: {},
      rules: {
        KHDA_KHID: [
          { required: true, message: "请输入客户代码", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20个字符", trigger: "blur" },
        ],
        KHDA_KHMC: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur",
          },
        ],
      },
      activeName: "first",
      isGetInvoiceData: 0,
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
  mounted() {
    this.isGetInvoiceData =
      window.location.href.indexOf("xmydwy") > -1 ||
      window.location.href.indexOf("xmtrwy") > -1
        ? 1
        : 0;
  },
  methods: {
    //   判断新增，修改
    getPartitionData(data, type) {
      this.activeName = "first";
      if (type == 0) {
        this.title = "新增客户";
        data.FKGX_SFKZ = false;
        data.FKGX_SFSFDX = true;
        data.FKGX_LX = 1;
      } else {
        this.title = "修改";
      }
      this.cusForm = JSON.parse(JSON.stringify(data));
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["cusForm"].validate((valid) => {
        if (valid) {
          customerNameIsExist(_this.cusForm).then((response) => {
            if (response.isExist === "true") {
              this.$confirm("该客户名称已经存在，是否重复录入?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                  if (_this.title == "新增客户") {
                    addCustomerProfile(_this.cusForm).then((response) => {
                      if (response.returnStatus == "SUCCESS") {
                        _this.$emit("RefreshItem");
                        _this.cancle();
                      }
                    });
                  } else {
                    updateCustomerProfile(_this.cusForm).then((response) => {
                      if (response.returnStatus == "SUCCESS") {
                        let newobj = JSON.parse(JSON.stringify(_this.cusForm));
                        _this.$emit("RefreshItem", newobj);
                        _this.cancle();
                      }
                    });
                  }
                })
                .catch(() => {});
            } else {
              if (_this.title == "新增客户") {
                addCustomerProfile(_this.cusForm).then((response) => {
                  if (response.returnStatus == "SUCCESS") {
                    _this.$emit("RefreshItem");
                    _this.cancle();
                  }
                });
              } else {
                updateCustomerProfile(_this.cusForm).then((response) => {
                  if (response.returnStatus == "SUCCESS") {
                    let newobj = JSON.parse(JSON.stringify(_this.cusForm));
                    _this.$emit("RefreshItem", newobj);
                    _this.cancle();
                  }
                });
              }
            }
          });
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.cusForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-line-2 {
  width: 90%;
  height: 2px;
  background: #888;
  margin-left: 5%;
  margin-bottom: 20px;
}
</style>
<style>
.CusDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.CusDialog .el-dialog__body {
  padding: 10px 20px !important;
}

.CusDialog .el-input-number input {
  text-align: left;
}
</style>
