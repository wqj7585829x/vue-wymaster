<template>
  <div class="ConfirmImport">
    <el-dialog
      v-dialogDrag
      title="导入信息确认"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancleForm"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="项目档案" name="ProjectFile">
          <el-table :data="GLCDADATA" border style="width: 100%" height="150">
            <el-table-column fixed prop="GLCDA_GLCDM" label="楼盘项目代码">
            </el-table-column>
            <el-table-column
              prop="GLCDA_GLCMC"
              label="楼盘项目名称"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="GLCDA_XMMC" label="项目名称" width="150">
            </el-table-column>
            <el-table-column prop="GLCDA_XMFZR" label="项目负责人" width="150">
            </el-table-column>
            <el-table-column prop="BZ" label="备注"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="分区档案" name="PartionFile">
          <el-table :data="GLQDADATA" border style="width: 100%" height="250">
            <el-table-column
              fixed
              prop="GLQDA_GLCDM"
              label="项目ID"
              width="100"
            >
            </el-table-column>
            <el-table-column prop="GLQDA_GLQMC" label="分区名称" width="250">
            </el-table-column>
            <el-table-column prop="GLQDA_GLQDM" label="分区代码" width="100">
            </el-table-column>
            <el-table-column prop="GLQDA_SSQY" label="所属区域" width="100">
            </el-table-column>
            <el-table-column prop="GLQDA_JZMJ" label="建筑面积" width="100">
            </el-table-column>
            <el-table-column prop="GLQDA_SYMJ" label="使用面积" width="100">
            </el-table-column>
            <el-table-column prop="GLQDA_LDMJ" label="绿地面积" width="100">
            </el-table-column>
            <el-table-column prop="GLQDA_ZDMJ" label="占地面积" width="100">
            </el-table-column>
            <el-table-column prop="GLQDA_JGRQ" label="竣工日期" width="150">
            </el-table-column>
            <el-table-column prop="BZ" label="备注"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="楼栋档案" name="BuildFile">
          <el-table :data="DLDADATA" border style="width: 100%" height="250">
            <el-table-column prop="DLDA_GLQDM" label="分区代码" width="100">
            </el-table-column>
            <el-table-column prop="DLDA_DLMC" label="楼栋名称" width="200">
            </el-table-column>
            <el-table-column prop="DLDA_DLDM" label="楼栋代码" width="100">
            </el-table-column>
            <el-table-column
              prop="DLDA_DLRHRQ"
              label="楼栋入伙日期"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="DLDA_GDYZHS"
              label="各单元总户数"
              width="100"
            >
            </el-table-column>
            <el-table-column prop="DLDA_LG" label="楼高" width="100">
            </el-table-column>
            <el-table-column prop="DLDA_SGDW" label="施工单位" width="100">
            </el-table-column>
            <el-table-column prop="DLDA_LCS" label="楼层数" width="100">
            </el-table-column>
            <el-table-column prop="DLDA_ZHS" label="总户数" width="100">
            </el-table-column>
            <el-table-column prop="DLDA_ZDMJ" label="占地面积" width="100">
            </el-table-column>
            <el-table-column prop="BZ" label="备注"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="资源档案" name="ResourceFile">
          <el-table :data="ZYDADATA" border style="width: 100%" height="250">
            <el-table-column
              fixed
              prop="FJDA_DLDM"
              label="楼栋代码"
              width="100"
            >
            </el-table-column>
            <el-table-column prop="FJDA_FJDM" label="资源代码" width="250">
            </el-table-column>
            <el-table-column prop="FJDA_FJDM" label="资源名称" width="200">
            </el-table-column>
            <el-table-column prop="FJDA_FH" label="资源号" width="100">
            </el-table-column>
            <el-table-column prop="FJDA_LC" label="楼层" width="100">
            </el-table-column>
            <el-table-column prop="FJDA_DY" label="单元" width="100">
            </el-table-column>
            <el-table-column prop="FJDA_CX" label="朝向" width="100">
            </el-table-column>
            <el-table-column prop="FJDA_FJJG" label="资源结构" width="100">
            </el-table-column>
            <el-table-column prop="FJDA_FJYT" label="资源用途" width="100">
            </el-table-column>
            <el-table-column prop="FJDA_SFMJ" label="收费面积" width="100">
            </el-table-column>
            <el-table-column prop="FJDA_SYMJ" label="使用面积" width="100">
            </el-table-column>
            <el-table-column prop="FJDA_YZJ" label="月租金" width="100">
            </el-table-column>
            <el-table-column prop="FJDA_KCZRQ" label="可出租日期" width="150">
            </el-table-column>
            <el-table-column prop="BZ" label="备注"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="客户档案" name="ClientFile">
          <el-table :data="KHDADATA" border style="width: 100%" height="250">
            <el-table-column fixed prop="GLCID" label="项目ID" width="100">
            </el-table-column>
            <el-table-column prop="KHDA_KHMC" label="客户名称" width="100">
            </el-table-column>
            <el-table-column prop="KHDA_KHLX" label="客户类型" width="100">
            </el-table-column>
            <el-table-column prop="KHDA_KHDM" label="客户代码" width="100">
            </el-table-column>
            <el-table-column prop="KHDA_ZJLX" label="证件类型" width="150">
            </el-table-column>
            <el-table-column prop="KHDA_ZJHM" label="证件号码" width="150">
            </el-table-column>
            <el-table-column prop="KHDA_XB" label="性别" width="100">
            </el-table-column>
            <el-table-column prop="KHDA_CSRQ" label="出生年月" width="100">
            </el-table-column>
            <el-table-column prop="KHDA_JG" label="籍贯" width="100">
            </el-table-column>
            <el-table-column prop="KHDA_LXR" label="联系人" width="100">
            </el-table-column>
            <el-table-column prop="KHDA_LXDH" label="联系电话" width="100">
            </el-table-column>
            <el-table-column prop="KHDA_SJ" label="手机" width="100">
            </el-table-column>
            <el-table-column prop="KHDA_YB" label="邮编" width="100">
            </el-table-column>
            <el-table-column prop="KHDA_LXDZ" label="联系地址" width="100">
            </el-table-column>
            <el-table-column prop="BZ" label="备注"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="房客关系" name="GuestTeant">
          <el-table :data="FKGXDATA" border style="width: 100%" height="250">
            <el-table-column
              fixed
              prop="FKGX_FJDM"
              label="资源代码"
              width="100"
            >
            </el-table-column>
            <el-table-column prop="FKGX_KHDM" label="客户代码" width="100">
            </el-table-column>
            <el-table-column
              prop="FKGX_FKGXLX"
              label="房客关系类型"
              width="200"
            >
            </el-table-column>
            <el-table-column prop="FKGX_HTH" label="租售合同号" width="150">
            </el-table-column>
            <el-table-column prop="BZ" label="备注"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="费用收取" name="Feecollection">
          <el-table :data="FYSQDATA" border style="width: 100%" height="250">
            <el-table-column
              fixed
              prop="FYSQ_FJDM"
              label="资源代码"
              width="250"
            >
            </el-table-column>
            <el-table-column prop="FYSQ_KHDM" label="客户代码" width="250">
            </el-table-column>
            <el-table-column
              prop="FYSQ_SFXMMC"
              label="收费项目名称"
              width="100"
            >
            </el-table-column>
            <el-table-column prop="FYSQ_FYJE" label="费用金额" width="100">
            </el-table-column>
            <el-table-column prop="FYSQ_SSNY" label="所属年月" width="250">
            </el-table-column>
            <el-table-column prop="FYSQ_YSRQ" label="应收日期" width="250">
            </el-table-column>
            <el-table-column prop="FYSQ_FYLB" label="费用类别" width="100">
            </el-table-column>
            <el-table-column prop="FYSQ_TZSM" label="调整说明" width="100">
            </el-table-column>
            <el-table-column prop="FYSQ_TZNY" label="调整年月" width="250">
            </el-table-column>
            <el-table-column prop="FYSQ_TZR" label="调整人" width="100">
            </el-table-column>
            <el-table-column prop="FYSQ_SFBZ" label="收费币种" width="100">
            </el-table-column>
            <el-table-column prop="FYSQ_SFBZ" label="精确位数" width="100">
            </el-table-column>
            <el-table-column prop="FYSQ_QZFS" label="取整方式" width="100">
            </el-table-column>
            <el-table-column
              prop="FYSQ_ZNJJSFS"
              label="滞纳金计算方式"
              width="100"
            >
            </el-table-column>
            <el-table-column prop="BZ" label="备注"> </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="preBtn" :disabled="disabledPre"
          >上一步</el-button
        >
        <el-button type="primary" @click="nextBtn" :disabled="disablednext"
          >下一步</el-button
        >
        <el-button @click="cancleForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryImportData,
  importData,
  checkData,
} from "@/api/SystemMaintain/OriginalDataimport"; //数据导入
export default {
  data() {
    return {
      activeName2: "ProjectFile",
      visible: this.showConirmdialog,
      labelPosition: "left",
      disabledPre: false, //默认上一步按钮可点击
      disablednext: false, //默认下一步按钮可点击
      radio: 1,
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
        resource: "",
      },
      GLCDADATA: [], //项目档案
      ZYDADATA: [], //资源档案
      GLQDADATA: [], //分区档案数据
      DLDADATA: [], //楼栋档案
      FKGXDATA: [], //房客关系
      FYSQDATA: [], //费用收取
      KHDADATA: [], //客户档案
      objectID: 0, //项目ID
    };
  },
  props: ["showConirmdialog"],
  watch: {
    showConirmdialog() {
      this.visible = this.showConirmdialog;
      if (this.visible) {
        this.getTablleData(); //数据查询
      }
    },
  },
  methods: {
    getData(id) {
      this.objectID = id;
    },
    getTablleData() {
      queryImportData().then((response) => {
        //数据查询
        this.GLCDADATA = response[0].GLCDA;
        this.ZYDADATA = response[0].FJDA;
        this.GLQDADATA = response[0].GLQDA;
        this.DLDADATA = response[0].DLDA;
        this.FKGXDATA = response[0].FKGX;
        this.FYSQDATA = response[0].FYSQ;
        this.KHDADATA = response[0].KHDA;
      });
    },
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    preBtn() {
      //上一步
      this.$emit("RefreshItem");
    },
    nextBtn() {
      //下一步
      this.$confirm(
        "经过仔细阅读,已确认所读入数据全部正确, 是否导入数据?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$nextTick(() => {
            checkData(this.objectID).then((response) => {
              //数据检测
              if (response.returnStatus == "SUCCESS") {
                importData(this.objectID).then((response) => {
                  //数据导入
                  if (response.returnStatus == "SUCCESS") {
                    this.$emit("update:showConirmdialog", false);
                  }
                });
              } else {
                this.$alert("将导入的数据有错误,请仔细检查后再试!", "提示", {
                  confirmButtonText: "确定",
                  callback: (action) => {
                    this.disabledPre = true;
                    this.disablednext = true;
                  },
                });
                this.getTablleData(); //数据查询
              }
            });
          });
        })
        .catch(() => {});
    },
    cancleForm() {
      this.disabledPre = false;
      this.disablednext = false;
      this.$emit("update:showConirmdialog", false);
    },
  },
};
</script>

<style lang="scss">
.ConfirmImport .el-dialog__body {
  padding: 0;
}

.ConfirmImport .el-tabs__header {
  margin: 0;
}

.ConfirmImport .el-tabs__content {
  padding: 30px;
}
</style>
