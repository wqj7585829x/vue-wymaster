<template>
  <div class="Subordinate">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <div class="Account-content">
        <div class="title">
          <el-form
            :label-position="labelPosition"
            label-width="85px"
            class="demo-form-inline"
          >
            <el-row :gutter="30">
              <el-col :span="5" style="width: 200px">
                <el-form-item label="" label-width="0">
                  <el-input v-model="AccountForm.FJDA_FJID"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="4">
                <el-form-item label-width="0px">
                  <el-button type="success" @click="AccountList"
                    >查询</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="body">
          <el-checkbox-group
            v-model="checkAccount"
            @change="Accountchange"
            class="checkList"
          >
            <el-checkbox
              v-for="FJDA_FJID in Accounts"
              :label="FJDA_FJID"
              :key="FJDA_FJID"
              >{{ FJDA_FJID }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <div class="LcheckAll">
          <el-checkbox
            :indeterminate="isAccount"
            v-model="DcheckAll"
            @change="AccountAllchange"
            >全选</el-checkbox
          >
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addHouseholdAccounts,
  queryClientUnderRoom,
  queryHouseholdAccountList,
} from "@/api/PublicRepairManager/HouseAccounts";
import vuetree from "../../../../components/Eltree/treeItem.vue";
import { nextTick } from "q";
export default {
  data() {
    return {
      labelPosition: "left",
      visible: this.show,
      title: "批量建账", //标题
      tabsindex: "0",
      DcheckAll: false, //户-begin
      checkAccount: [],
      Accounts: [],
      AllAccounts: [],
      isAccount: true,
      AccountForm: {},
      DCheckList: "", //户-end
      WXDJ_ZJ: "",
      settype: "",
    };
  },
  props: {
    Ashow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Ashow() {
      this.visible = this.Ashow;
    },
  },
  methods: {
    getPartitionData(data) {
      this.checkAccount = [];
      this.AccountForm = data;
      this.AccountList(data);
    },
    //户-begin
    AccountAllchange(val) {
      this.checkAccount = val ? this.Accounts : [];
      this.isAccount = false;
    },
    Accountchange(value) {
      let AccountCount = value.length;
      this.DcheckAll = AccountCount === this.Accounts.length;
      this.isAccount = AccountCount > 0 && AccountCount < this.Accounts.length;
    },
    AccountList() {
      this.AllAccounts = [];
      this.Accounts = [];
      queryHouseholdAccountList(this.AccountForm).then((response) => {
        this.AllAccounts = response;
        response.forEach((item) => {
          this.Accounts.push(item.FJDA_FJID);
        });
      });
    },
    //户-end
    // 确认
    sure() {
      if (this.checkAccount.length === 0) {
        callback(new Error("未选择资源代码，无法批量新增！"));
      }
      var result = this.checkAccount.join(";");
      var item = [];
      var items = [];
      var day = new Date();
      var date =
        day.getFullYear() +
        "-" +
        ((day.getMonth() + 1 + "").length == 1
          ? "0" + (day.getMonth() + 1)
          : day.getMonth() + 1) +
        "-" +
        ((day.getDate() + "").length == 1
          ? "0" + day.getDate()
          : day.getDate());
      this.AllAccounts.forEach((data) => {
        if (result.indexOf(data.FJDA_FJID) > -1) {
          item.push({
            FJDA_FJID: data.FJDA_FJID,
          });
        }
      });
      queryClientUnderRoom(item).then((response) => {
        response.forEach((data) => {
          items.push({
            HZ_ZH: data.FJDA_FJMC,
            FCDM_GLQZJ: data.FJDA_GLQWJ,
            DLZJ: data.FJDA_DLWJ,
            FKGX_ZJ: data.FKGX_ZJ,
            KHDA_ZJ: data.KHDA_ZJ,
            FKGX_FJID: data.FKGX_FJID,
            KHDA_KHMC: data.KHDA_KHMC,
            FJZJ: data.FJDA_ZJ,
            FJDA_FJID: data.FJDA_FJID,
            FJDA_FJMC: data.FJDA_FJMC,
            HZ_SFMJ: data.FJDA_SFMJ,
            KHDA_KHID: data.KHDA_KHID,
            HZ_YE: 0,
            HZ_KYJE: 0,
            HZ_JZRQ: date,
          });
        });
        addHouseholdAccounts(items).then((response) => {
          if (response.returnStatus == "SUCCESS") {
            this.$emit("RefreshTree", {});
            this.cancle();
          }
        });
      });
    },
    // 取消
    cancle() {
      this.$emit("update:Ashow", false);
    },
  },
  components: {
    vuetree,
  },
};
</script>

<style lang="scss" scoped>
.Account-content {
  height: 450px;
  position: relative;
  .title {
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    padding-top: 10px;
  }
  .body {
    position: absolute;
    top: 50px;
    bottom: 30px;
    left: 0;
    right: 0;
    padding: 5px 15px;
    overflow: auto;
  }
  .LcheckAll {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 30px;
    padding: 5px 15px;
    text-align: left;
  }
}
</style>

<style lang="scss">
.Subordinate .select {
  margin-bottom: 30px;
}

.Subordinate .el-dialog__body {
  padding: 0 !important;
}

.Subordinate .el-card__header {
  padding: 8px 20px !important;
}

.Subordinate .el-card__body {
  overflow: auto;
  padding: 5px !important;
}
.Subordinate .el-checkbox-group {
  text-align: left !important;
}
.Subordinate .el-tabs__content {
  padding: 0 !important;
}

.Subordinate .checkList .el-checkbox {
  margin-bottom: 10px;
}
.Subordinate .checkList .el-checkbox__label {
  width: 140px;
}

.Subordinate .Account-content .el-checkbox__label {
  width: 200px;
}
</style>
