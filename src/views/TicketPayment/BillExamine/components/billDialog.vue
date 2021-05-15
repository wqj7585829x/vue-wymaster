<template>
  <div class="typeDialog billxp">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
      :class="[typeFlag == 1 ? 'el-dialog-treble' : '']"
    >
      <!-- 左边数：按资源与按客户-->
      <div
        class="el-title"
        style="
          height: 400px;
          overflow: auto;
          display: inline;
          float: left;
          width: 30%;
          padding-left: 1%;
        "
        ref="elTitle"
        v-if="typeFlag == 1"
      >
        <div v-if="ztreeDataSourceList.length > 0">
          <vue-ztree
            :list.sync="ztreeDataSourceList"
            :showInput="true"
            :is-open="true"
            ref="dotree"
            :is-check="false"
            class="zree-w"
            :showCheckbox="true"
            @getTreeData="getTreeData"
            @getTreeCheckData="getTreeCheckData"
          >
          </vue-ztree>
        </div>
      </div>
      <!-- 右边模块-->
      <el-form
        label-width="95px"
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
        :class="[typeFlag == 1 ? 'TableFormStyle' : '']"
      >
        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="纳税人名称:" prop="invoiceNsrmc">
              <el-input v-model="TableForm.invoiceNsrmc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="识别号:" prop="invoiceNsrsbh">
              <el-input v-model="TableForm.invoiceNsrsbh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="开户行及账号:" prop="invoiceKhhjzh">
              <el-input v-model="TableForm.invoiceKhhjzh"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="地址电话:" prop="invoiceNsrdzdh">
              <el-input v-model="TableForm.invoiceNsrdzdh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="起始日期:" prop="startDate">
              <el-date-picker
                type="date"
                placeholder="选择起始日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="TableForm.startDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="终止日期:" prop="endDate">
              <el-date-picker
                type="date"
                placeholder="选择终止日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="TableForm.endDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="是否提前提醒:" prop="invoiceIsRemind">
              <el-checkbox v-model="TableForm.invoiceIsRemind"></el-checkbox>
            </el-form-item>
          </el-col>

          <el-col :span="24" v-if="TableForm.invoiceIsRemind">
            <el-form-item label="提前提醒天数:" prop="invoiceRemindDate">
              <el-input v-model="TableForm.invoiceRemindDate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="24">
            <el-form-item label="是否有效:" prop="invoiceIsUsable">
              <el-select v-model="TableForm.invoiceIsUsable">
                <el-option label="无效" :value="0"></el-option>
                <el-option label="有效" :value="1"></el-option>
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
import vueZtree from "@/components/Eltree/treeItem.vue";
import {
  queryOrgTreeHaveClientApi,
  insertInvoiceInformationkpDataApi,
  updateInvoiceInformationkpDataApi,
} from "@/api/TicketPayment/Bill";

export default {
  data() {
    return {
      visible: this.Tshow,
      title: "", //标题
      TableForm: {
        invoiceIsRemind: "",
      },
      rules: {
        invoiceNsrmc: [{ required: true, message: "", trigger: "blur" }],
        invoiceNsrsbh: [{ required: true, trigger: "blur" }],
        invoiceIsUsable: [{ required: true, trigger: "blur" }],
      },
      tableData: [],
      ztreeDataSourceList: [],
      typeFlag: 1,
    };
  },
  props: {
    Tshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Tshow() {
      this.visible = this.Tshow;
    },
  },
  components: {
    vueZtree,
  },
  methods: {
    //   判断新增，修改
    getPartitionData(data, type) {
      if (type == 0) {
        this.title = "新增";
        data.invoiceIsRemind = false;
        data.invoiceIsUsable = 1;
        this.typeFlag = 1;
        this.queryOrgTreeHaveClient(); //新增开票资料
      } else {
        this.title = "修改";
        this.typeFlag = 2;
      }
      this.TableForm = JSON.parse(JSON.stringify(data));
    },
    queryOrgTreeHaveClient() {
      queryOrgTreeHaveClientApi().then((response) => {
        var data = response;
        if (data) {
          this.ztreeDataSourceList = data;
          this.$nextTick(() => {
            this.$refs.dotree.setCheckTree(this.ztreeDataSourceList[0].id);
          });
        }
      });
    },
    getTreeData(data) {
      //树点击事件
    },
    getTreeCheckData() {
      //树选中事件
    },
    //   新增/修改分区
    sure() {
      if (this.$refs.dotree) {
        //新增需要传递客户
        var data = this.$refs.dotree.getTreeCheckedNodes();
        var KHDA_ZJ = [];
        var FCDM_MC = [];
        for (var i in data) {
          if (data[i].data.FCDM_LX == "客户") {
            console.log(data[i].data);
            KHDA_ZJ.push(data[i].data.KHDA_ZJ);
            FCDM_MC.push(data[i].data.FCDM_MC);
          }
        }
      }

      var _this = this;
      if (!this.TableForm.invoiceIsRemind) {
        delete this.TableForm.invoiceRemindDate;
      }
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增") {
            if (KHDA_ZJ.length == 0) {
              this.$message({ type: "warning", message: "请选择客户" });
              return;
            }
            insertInvoiceInformationkpDataApi(
              _this.TableForm,
              KHDA_ZJ,
              FCDM_MC
            ).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem", {});
                _this.cancle();
              }
            });
          } else {
            updateInvoiceInformationkpDataApi(_this.TableForm).then(
              (response) => {
                if (response.returnStatus == "SUCCESS") {
                  let newobj = JSON.parse(JSON.stringify(_this.TableForm));
                  this.$emit("RefreshItem", newobj);
                  this.cancle();
                }
              }
            );
          }
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:Tshow", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.typeDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.typeDialog .el-input-number {
  width: 100%;
}

.typeDialog .el-input-number input {
  text-align: left;
}
</style>

<style lang="scss">
.billxp {
  .ztree_content_wrap {
    margin-top: 0 !important;
  }
  .TableFormStyle {
    display: inline;
    float: left;
    width: 70%;
  }
}
</style>
