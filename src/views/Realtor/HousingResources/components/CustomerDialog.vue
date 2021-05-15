<template>
  <div class="CustomerDialog">
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
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
      >
        <el-row :gutter="50">
          <el-col :span="12" v-if="title == '新增'">
            <el-form-item label="项目名称:" prop="index">
              <el-select
                v-model="TableForm.index"
                @change="plotChange"
                clearable
              >
                <el-option
                  v-for="(item, index) in plot_List"
                  :key="index"
                  :label="item.plotName"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="title == '修改'">
            <el-form-item label="项目名称:" prop="KHDA_XMMC">
              <el-input
                v-model="TableForm.KHDA_XMMC"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="客户代码:" prop="KHDA_KHID">
              <el-input v-model="TableForm.KHDA_KHID"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="客户名称:" prop="KHDA_KHMC">
              <el-input
                v-model="TableForm.KHDA_KHMC"
                v-popover:popover
                @keyup.native="nameChange"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-popover
            ref="popover"
            placement="bottom"
            title="标题"
            width="830"
            trigger="focus"
          >
            <el-table :data="tableData" max-height="300">
              <el-table-column
                width="150"
                property="KHDA_KHID"
                label="客户代码"
              ></el-table-column>
              <el-table-column
                width="250"
                property="KHDA_KHMC"
                label="客户名称"
              ></el-table-column>
              <el-table-column
                width="250"
                property="KHDA_ZJHM"
                label="证件号码"
              ></el-table-column>
              <el-table-column
                width="150"
                property="KHDA_NSRSBH"
                label="纳税人识别号"
              ></el-table-column>
            </el-table>
          </el-popover>

          <el-col :span="12">
            <el-form-item label="客户属性:" prop="KHDA_KHLX">
              <el-select v-model="TableForm.KHDA_KHLX">
                <el-option label="个人" value="个人"></el-option>
                <el-option label="公司" value="公司"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="联系人:" prop="KHDA_LXR">
              <el-input v-model="TableForm.KHDA_LXR"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="联系电话:" prop="KHDA_LXDH">
              <el-input v-model="TableForm.KHDA_LXDH"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="手机号码:" prop="KHDA_SJ">
              <el-input v-model="TableForm.KHDA_SJ"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="电子邮箱:" prop="KHDA_DZYX">
              <el-input v-model="TableForm.KHDA_DZYX"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="识别号:" prop="KHDA_NSRSBH">
              <el-input
                v-model="TableForm.KHDA_NSRSBH"
                placeholder="请输入纳税人识别号"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="纳税人名称:" prop="KHDA_NSRMC">
              <el-input
                v-model="TableForm.KHDA_NSRMC"
                placeholder="请输入纳税人名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="开户行:" prop="KHDA_KHHJZH">
              <el-input
                v-model="TableForm.KHDA_KHHJZH"
                placeholder="请输入开户行及账号"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="备注:" prop="KHDA_BZ">
              <el-input v-model="TableForm.KHDA_BZ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="title">填写个人租户资料</div>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="曾用名:" prop="KHDA_CYMC">
              <el-input v-model="TableForm.KHDA_CYMC"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="客户分类:" prop="KHDA_KHFL">
              <el-select v-model="TableForm.KHDA_KHFL">
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
              <el-select v-model="TableForm.KHDA_ZJMC">
                <el-option label="身份证" value="身份证"></el-option>
                <el-option label="营业许可证" value="营业许可证"></el-option>
                <el-option label="暂住证" value="暂住证"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="证件号码:" prop="KHDA_ZJHM">
              <el-input v-model="TableForm.KHDA_ZJHM"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="增值税发票:" prop="KHDA_ZJHM">
              <el-select
                v-model="TableForm.KHDA_ZZSFPFL"
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
                v-model="TableForm.KHDA_RKS"
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
            <el-form-item label="家庭地址:" prop="KHDA_NSRDZDH">
              <el-input v-model="TableForm.KHDA_NSRDZDH"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="单位名称:" prop="KHDA_DWMC">
              <el-input v-model="TableForm.KHDA_DWMC"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="家庭电话:" prop="KHDA_JTDH">
              <el-input v-model="TableForm.KHDA_JTDH"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="提醒天数:" prop="KHDA_TQTXTS">
              <el-input-number
                v-model="TableForm.KHDA_TQTXTS"
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
              <el-checkbox v-model="TableForm.KHDA_SDBZ"></el-checkbox>
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
  addCustomerProfile,
  updateCustomerProfile,
  queryCustomerProfile,
  queryPlotsWithAuthority,
} from "@/api/Realtor/Customer";
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      categoryList: "",
      rules: {
        index: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        KHDA_KHID: [
          { required: true, message: "请输入客户代码", trigger: "blur" },
        ],
        KHDA_KHMC: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
        ],
      },
      TableForm: {},
      tableData: [],
      plot_List: [],
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
    queryPlotsWithAuthority().then((response) => {
      this.plot_List = response;
    });
  },
  methods: {
    plotChange(index) {
      if (index === "") {
        this.TableForm.plotDbName = "";
        this.TableForm.GLCID = "";
        this.TableForm.YXDID = "";
      } else {
        this.TableForm.plotDbName = this.plot_List[index].plotDbName;
        this.TableForm.GLCID = this.plot_List[index].GLCID;
        this.TableForm.YXDID = this.plot_List[index].YXDID;
      }
    },
    nameChange(name) {
      if (this.TableForm.KHDA_KHMC != "") {
        setTimeout(() => {
          this.getTableData(this.TableForm.KHDA_KHMC);
        }, 500);
      } else {
        this.tableData = [];
      }
    },
    //   判断新增，修改
    getReportData(data, type) {
      if (type == 0) {
        this.title = "新增";
        data.FKGX_SFKZ = false;
        data.FKGX_SFSFDX = true;
        data.FKGX_LX = 1;
        data.index = "";
      } else {
        this.title = "修改";
      }
      this.TableForm = JSON.parse(JSON.stringify(data));
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增") {
            addCustomerProfile(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateCustomerProfile(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.TableForm));
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
    cancle() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
    getTableData(KHDA_KHMC) {
      queryCustomerProfile({
        pageIndex: 0,
        pageSize: 100,
        KHDA_KHMC: KHDA_KHMC,
        KHDA_SJ: "",
        KHDA_ZJHM: "",
        KHDA_XMMC: "",
      }).then((response) => {
        this.tableData = response.data;
      });
    },
  },
};
</script>

<style>
.CustomerDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.CustomerDialog .el-input-number {
  width: 100%;
}

.CustomerDialog .el-input-number input {
  text-align: left;
}

.CustomerDialog .title {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(44, 138, 216, 1);
  text-align: left;
  padding-left: 16px;
  margin-bottom: 16px;
}
</style>
