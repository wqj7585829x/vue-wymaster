<template>
  <div class="el-body CustomerFile">
    <div class="el-title" ref="tree_wrap">
      <div v-if="ztreeDataSourceList.length > 0">
        <vue-ztree
          :list.sync="ztreeDataSourceList"
          :is-open="true"
          ref="dotree"
          :is-check="false"
          class="zree-w"
          @getTreeData="getTreeData"
        ></vue-ztree>
      </div>
    </div>
    <div class="el-content">
      <div class="tabletop">
        <!-- 按钮begin -->
        <el-form label-width="70px">
          <el-row :gutter="30">
            <el-col :span="6" style="min-width: 220px">
              <el-form-item label="客户类型:">
                <el-select v-model="searchCustomerFile.FKGX_LX">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="业主" value="1"></el-option>
                  <el-option label="租户" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="min-width: 220px">
              <el-form-item label="客户状态:">
                <el-select v-model="searchCustomerFile.FKGX_ZT">
                  <el-option label="当前" value="1"></el-option>
                  <el-option label="待退" value="3"></el-option>
                  <el-option label="历史" value="2"></el-option>
                  <el-option label="全部" value=""></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="min-width: 220px">
              <el-form-item label="资源名称:">
                <el-input
                  v-model="searchCustomerFile.FJDA_FJMC"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="6" style="min-width: 220px">
              <el-form-item label="客户代码:">
                <el-input
                  v-model="searchCustomerFile.KHDA_KHID"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="min-width: 220px">
              <el-form-item label="客户名称:">
                <el-input
                  v-model="searchCustomerFile.KHDA_KHMC"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="min-width: 220px">
              <el-form-item label="手机:">
                <el-input
                  v-model="searchCustomerFile.KHDA_SJ"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="getTableData()"
                  v-has="'BillBookSearch_has'"
                  :disabled="
                    FCDM_LX == '房间' ||
                    FCDM_LX == '大楼' ||
                    FCDM_LX == '管理处' ||
                    FCDM_LX == '管理区'
                      ? false
                      : true
                  "
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 按钮end -->

        <!-- 按钮begin -->
        <div class="button buttonBox">
          <el-button
            type="primary"
            :disabled="disablednew"
            @click="addCus"
            v-has="'CusAdd_has'"
            >新增客户</el-button
          >
          <el-button
            type="primary"
            :disabled="disablednew"
            @click="linkCus"
            v-has="'CusLink_has'"
            >链接客户</el-button
          >
          <el-button
            type="primary"
            :disabled="disableddo"
            @click="updateCus"
            v-if="CusEdit_has()"
            >修改</el-button
          >
          <el-button
            type="danger"
            :disabled="disableddo || FKGX_ZT == 3"
            @click="deleteCus"
            v-has="'CusRent_has'"
            >入住退租
          </el-button>
          <el-button
            type="primary"
            :disabled="disableddo || !inherittype"
            @click="inheritCus"
            v-has="'CusInherit_has'"
          >
            费用继承</el-button
          >
          <el-button
            type="primary"
            :disabled="disableddo"
            @click="carDetail"
            v-has="'CusCar_has'"
            >我的车辆</el-button
          >
          <el-button
            type="primary"
            :disabled="disableddo"
            @click="billDetail"
            v-has="'CusBill_has'"
            >我的开票资料</el-button
          >
          <el-button
            type="primary"
            :disabled="disableddo"
            @click="gotoEpedigree"
            v-has="'CusEfiles_has'"
            >电子档案
          </el-button>
          <el-button
            type="primary"
            :disabled="disableddo"
            @click="showpassword"
            v-has="'CusRepw_has'"
            >客户端密码重置
          </el-button>
          <el-upload
            :name="'filedata'"
            accept=".xlc,.xlm,.xls,.xlt,.xlw"
            :action="UploadUrl()"
            :before-upload="beforeFileUpload"
            :show-file-list="false"
            style="display: inline-block"
          >
            <el-button
              type="primary"
              icon="el-icon-upload"
              size="mini"
              @click="uploadModel"
              v-has="'CusUpdate_has'"
            >
              导入模板</el-button
            >
          </el-upload>
          <el-button
            type="primary"
            @click="downloadFile"
            v-has="'CusDownload_has'"
            >下载模板
          </el-button>
          <el-button
            type="primary"
            @click="revokeRent"
            :disabled="disabledrevoke"
            v-has="'CusRevoke_has'"
            >撤销退租
          </el-button>
          <el-button type="success" @click="downloData" v-has="'CusExecl_has'"
            >导出excel
          </el-button>
        </div>
        <!-- 按钮end -->

        <!-- 客户详情begin -->
        <div class="customedetail">
          <el-table
            ref="singleTable"
            :data="tableData"
            border
            height="320"
            style="width: 100%"
            @row-click="rowclick"
          >
            <el-table-column label="选择" width="50">
              <template slot-scope="scope">
                <el-radio :label="scope.$index" v-model="radio"
                  >&nbsp;</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column prop="KHDA_KHID" label="客户代码" width="160">
            </el-table-column>
            <el-table-column prop="KHDA_KHMC" label="客户名称" width="240">
            </el-table-column>
            <el-table-column prop="FJDA_FJMC" label="房间名称" width="240">
            </el-table-column>
            <el-table-column prop="FKGX_ZT" label="状态" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.FKGX_ZT === 1">当前</span>
                <span v-if="scope.row.FKGX_ZT === 2">历史</span>
                <span v-if="scope.row.FKGX_ZT === 3">待退</span>
              </template>
            </el-table-column>
            <el-table-column prop="FKGX_SFKZ" label="入住状态" width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.FKGX_SFKZ == true">空置</span>
                <span v-if="scope.row.FKGX_SFKZ == false">入住</span>
              </template>
            </el-table-column>
            <el-table-column prop="FKGX_LX" label="客户类型" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.FKGX_LX === 1">业主</span>
                <span v-if="scope.row.FKGX_LX === 2">租户</span>
              </template>
            </el-table-column>
            <el-table-column prop="KHDA_LXR" label="联系人" width="90">
            </el-table-column>
            <el-table-column prop="KHDA_SJ" label="手机" width="120">
            </el-table-column>
            <el-table-column prop="KHDA_DZYX" label="电子邮箱" width="200">
            </el-table-column>
            <el-table-column
              prop="KHDA_NSRSBH"
              label="纳税人识别号"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="KHDA_NSRMC" label="纳税人名称" width="180">
            </el-table-column>
            <el-table-column
              prop="KHDA_KHHJZH"
              label="开户行及账号"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="KHDA_BZ" label="备注" width="120">
            </el-table-column>

            <el-table-column prop="FKGX_FJID" label="资源代码" width="250">
            </el-table-column>
            <el-table-column prop="LX" label="类型" width="80">
            </el-table-column>
            <el-table-column prop="状态" label="状态" width="130">
            </el-table-column>
            <el-table-column
              prop="FKGX_SFSFDX"
              label="是否收费对象"
              width="150"
            >
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.FKGX_SFSFDX"
                  :disabled="true"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="FKGX_KSSFRQ"
              label="开始收费日期"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="FKGX_ZZSFRQ"
              label="终止收费日期"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="FKGX_FPDX" label="发票对象" width="150">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.FKGX_FPDX"
                  :disabled="true"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="FKGX_SFZDZLS"
              label="是否自动转历史"
              width="150"
            >
            </el-table-column>
            <el-table-column prop="FKGX_RZRQ" label="入住日期" width="150">
            </el-table-column>
            <el-table-column prop="FKGX_TZRQ" label="退租日期" width="200">
            </el-table-column>
          </el-table>

          <!-- 分页begin -->
          <div class="block" v-if="returnTotal > searchCustomerFile.pageSize">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :pager-count="5"
              :page-size="searchCustomerFile.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="returnTotal"
            >
            </el-pagination>
          </div>
          <!-- 分页end -->
        </div>
        <!-- 客户详情end -->

        <div class="family">
          <!-- 按钮begin -->
          <div class="button buttonBox">
            <el-button
              type="primary"
              @click="addfamily"
              :disabled="radio === ''"
              v-has="'FamilyAdd_has'"
              >新增家庭成员
            </el-button>
            <el-button
              type="primary"
              @click="editfamily"
              :disabled="radio === '' || disabledfamily"
              v-has="'FamilyEdit_has'"
              >编辑家庭成员</el-button
            >
            <el-button
              type="primary"
              @click="delfamily"
              :disabled="radio === '' || disabledfamily"
              v-has="'FamilyDelete_has'"
              >删除家庭成员</el-button
            >
          </div>
          <!-- 按钮end -->
          <div>
            <el-table
              ref="singleTable"
              :data="familyData"
              height="130"
              border
              style="width: 100%"
              @row-click="frowclick"
            >
              <el-table-column label="选择" width="50">
                <template slot-scope="scope">
                  <el-radio :label="scope.$index" v-model="fradio"
                    >&nbsp;</el-radio
                  >
                </template>
              </el-table-column>
              <el-table-column prop="JTCY_XM" label="姓名" width="90">
              </el-table-column>
              <el-table-column prop="JTCY_XB" label="性别" width="60">
              </el-table-column>
              <el-table-column prop="JTCY_YHZGX" label="与户主关系" width="150">
              </el-table-column>
              <el-table-column prop="JTCY_YDDH" label="联系电话" width="120">
              </el-table-column>
              <el-table-column prop="JTCY_DZYX" label="电子邮箱" width="200">
              </el-table-column>
              <el-table-column prop="JTCY_BZ" label="备注"> </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹框 begin -->
    <CusDialog
      :show.sync="show"
      ref="CusDialog"
      @RefreshItem="getTableData"
    ></CusDialog>
    <CostObjDialog
      :objshow.sync="objshow"
      ref="CostObjDialog"
      @RefreshItem="RefreshList"
    ></CostObjDialog>
    <linkCusDialog
      :linkshow.sync="linkshow"
      ref="linkCusDialog"
      @RefreshItem="RefreshList"
    ></linkCusDialog>
    <inheritDialog
      :inheritshow.sync="inheritshow"
      ref="inheritDialog"
      @RefreshItem="getTableData"
    ></inheritDialog>
    <FamilyDialog
      :familyshow.sync="familyshow"
      ref="FamilyDialog"
      @RefreshItem="refFamily"
    ></FamilyDialog>
    <carList :carshow.sync="carshow" ref="carList"></carList>
    <billList :billshow.sync="billshow" ref="billList"></billList>
    <!-- 弹框 end -->

    <el-dialog
      v-dialogDrag
      title="退租日期设置"
      :visible.sync="DialogVisible"
      width="30%"
      style="text-align: center"
    >
      <el-date-picker
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        v-model="rentTime"
        clearable
      ></el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="rentCus()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      title="客户端密码重置"
      :visible.sync="dialogVisible"
      width="250px"
      @close="dialogVisible = false"
    >
      <el-input placeholder="请输入密码" v-model="password" style="width: 90%">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changepassword">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import vueZtree from "../../../components/Eltree/treeItem.vue";
import CusDialog from "./components/CusDialog"; //客户档案新增,修改
import CostObjDialog from "./components/CostObjDialog"; //收费对象新增,修改
import linkCusDialog from "./components/linkCusDialog"; //链接新客户
import inheritDialog from "./components/inheritDialog"; //继承参数
import FamilyDialog from "./components/FamilyDialog"; //家庭成员
import carList from "./components/carList"; //车辆信息
import billList from "./components/billList"; //开票资料
import md5 from "js-md5"; // md5加密
import {
  getTree,
  getCustomerProfile,
  getChargeObject,
  isOweForCustomer,
  customerRetreatLease,
  isExistInheritParameter,
  queryFamilyMembers,
  deleteFamilyMembers,
  resetPassword,
  importExcelTemplateData,
  exportExcelData,
  statusToCurrent,
} from "@/api/BasicManagement/CustomerFile";
import config from "@/utils/config";
import { defer } from "q";
import { Message } from "element-ui";
export default {
  name: "CustomerFile",
  data() {
    return {
      ztreeDataSourceList: [], //资源树
      searchCustomerFile: {
        FKGX_ZT: "1",
        FKGX_LX: "",
        FJDA_DLWJ: "",
        FKGX_FJWJ: "",
        pageIndex: 0,
        pageSize: 10,
        FJDA_FJMC: "",
        KHDA_KHMC: "",
        KHDA_KHID: "",
        KHDA_SJ: "",
        GLQDA_ZJ: "",
      }, //客户档案列表搜索条件
      tableRow: {}, //修改数据
      objtableRow: {}, //修改数据
      radio: "", //单选按钮
      objradio: "", //单选按钮
      disablednew: true, //新增按钮权限
      disableddo: true, //按钮权限（修改，删除，退租退货，费用继承）
      disabledrevoke: true, //撤销退租权限
      currentPage: 1, //当前页
      returnTotal: 10, //总共条数
      show: false, //新增 弹框 标识
      objshow: false, //修改 弹框 标识
      linkshow: false, //链接 弹框 标识
      inheritshow: false, //继承 弹框 标识
      carshow: false, //车辆 弹框 标识
      billshow: false, //开票 弹框 标识
      FKGX_FJWJ: "", //资源外键
      tableData: [], //列表参数
      tableDataCharge: [], //列表参数
      DLZJ: "", //大楼主键
      FCDM_LX: "", //类型
      inherittype: false, //能否继承标注
      DialogVisible: false,
      rentTime: "",
      familyData: [],
      fradio: "",
      ftableRow: {}, //修改数据
      JTCY_KHWJ: "",
      disabledfamily: true,
      familyshow: false,
      FKGX_ZT: 1,
      dialogVisible: false,
      password: "",
      treeWrapscrollTop: 0, //资源树保存滚动条位置
    };
  },
  watch: {
    radio() {
      if (this.radio !== "") {
        this.disableddo = false;
        if (this.tableRow.FKGX_ZT == 2 || this.tableRow.FKGX_ZT == 3) {
          this.disabledrevoke = false;
        } else {
          this.disabledrevoke = true;
        }
      } else {
        this.disableddo = true;
      }
    },
    objradio() {
      if (this.objradio !== "") {
        this.disableddo = false;
      } else {
        this.disableddo = true;
      }
    },
    fradio() {
      if (this.fradio !== "") {
        this.disabledfamily = false;
      } else {
        this.disabledfamily = true;
      }
    },
  },
  mounted() {
    this.getTreeFun();
  },
  methods: {
    revokeRent() {
      this.$confirm("对选中数据进行撤销退租，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          statusToCurrent({ FKGX_ZJ: this.tableRow.FKGX_ZJ }).then(
            (response) => {
              this.getTableData(); //获取表格数据
            }
          );
        })
        .catch(() => {});
    },
    downloData() {
      exportExcelData(this.searchCustomerFile).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `客户信息.xls`;
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    CusEdit_has() {
      //走表分摊权限
      if (
        sessionStorage.getItem("buttenpremissions").indexOf("CusEdit_has") >
          -1 ||
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("CusChargeEdit_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    UploadUrl: function () {
      // 上传服务器地址
      return config.BASE_API;
    },
    beforeFileUpload(file) {
      let index = 0;
      let fd = new FormData();
      fd.append("filedata", file);
      this.formD = fd;
      importExcelTemplateData(this.formD).then((response) => {
        var blobReader = new Response(response).json();
        blobReader.then((res) => {
          if (res.returnStatus == "SUCCESS") {
            Message({
              message: res.message,
              type: "success",
              duration: 2 * 1000,
            });
            this.getTreeFun();
          } else {
            Message({
              message: res.message,
              type: "warning",
              duration: 2 * 1000,
            });
          }
        });
      });
    },
    uploadModel() {
      //导入数据
    },
    downloadFile() {
      var url = config.BASE_API + "/template/customer_profile_template.xls";
      var alink = document.createElement("a");
      alink.href = url;
      alink.click();
    },
    showpassword() {
      this.password = "";
      this.dialogVisible = true;
    },
    changepassword() {
      if (this.password == "") {
        this.$message.warning("密码不能为空！");
        return;
      }
      resetPassword({
        KHDA_ZJ: this.tableRow.KHDA_ZJ,
        password: md5(this.password),
      }).then((response) => {
        this.dialogVisible = false;
      });
    },
    gotoEpedigree() {
      this.$router.push({
        path: "/BasicManagementEpedigree/Epedigree",
        query: {
          FKGX_ZJ: this.tableRow.FKGX_ZJ,
          KHDA_ZJ: this.tableRow.KHDA_ZJ,
        },
      });
    },
    //分页函数
    handleCurrentChange(currentPage) {
      this.searchCustomerFile.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.radio = ""; //选择后清空选中表格按钮
      this.objradio = "";
      this.tableRow = {}; //选择后清空选中表格数据
    },
    rowclick(row) {
      //单行点击单选按钮选中
      if (row) {
        this.tableRow = row;
        this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
        this.isinherit();
        this.JTCY_KHWJ = row.KHDA_ZJ;
        this.FKGX_ZT = row.FKGX_ZT;
        this.getfamily();
      }
    },
    objrowclick(row) {
      //单行点击单选按钮选中
      this.objtableRow = row;
      this.objradio = this.tableDataCharge.indexOf(row); //单行点击单选按钮选中
    },
    frowclick(row) {
      this.ftableRow = row;
      this.fradio = this.familyData.indexOf(row); //单行点击单选按钮选中
    },
    getTreeFun() {
      //获取资源树
      var _this = this;
      getTree().then((response) => {
        var data = response;
        if (data) {
          _this.ztreeDataSourceList = data;
        }
      });
    },
    getTreeData(val) {
      //资源树点击事件
      this.FCDM_LX = val.data.FCDM_LX;
      this.returnTotal = 0;

      this.tableData = [];
      this.tableDataCharge = [];
      this.FKGX_FJWJ = "";

      this.familyData = [];
      this.fradio = "";

      if (val.data.FCDM_LX == "管理处") {
        this.searchCustomerFile.GLQDA_ZJ = "";
        this.searchCustomerFile.FJDA_DLWJ = "";
        this.searchCustomerFile.FKGX_FJWJ = "";
        this.searchCustomerFile.pageIndex = 0;
        this.searchCustomerFile.FJDA_FJMC = "";
        this.searchCustomerFile.KHDA_KHMC = "";
        this.searchCustomerFile.KHDA_KHID = "";
        this.searchCustomerFile.KHDA_SJ = "";
        this.currentPage = 1;
        this.getTableData();
      }

      if (val.data.FCDM_LX == "管理区") {
        this.searchCustomerFile.GLQDA_ZJ = val.data.FCDM_GLQZJ;
        this.searchCustomerFile.FJDA_DLWJ = "";
        this.searchCustomerFile.FKGX_FJWJ = "";
        this.searchCustomerFile.pageIndex = 0;
        this.searchCustomerFile.FJDA_FJMC = "";
        this.searchCustomerFile.KHDA_KHMC = "";
        this.searchCustomerFile.KHDA_KHID = "";
        this.searchCustomerFile.KHDA_SJ = "";
        this.currentPage = 1;
        this.getTableData();
      }

      if (val.data.FCDM_LX == "大楼") {
        this.searchCustomerFile.GLQDA_ZJ = "";
        this.searchCustomerFile.FJDA_DLWJ = val.data.FCDM_ZJ;
        this.searchCustomerFile.FKGX_FJWJ = "";
        this.searchCustomerFile.pageIndex = 0;
        this.searchCustomerFile.FJDA_FJMC = "";
        this.searchCustomerFile.KHDA_KHMC = "";
        this.searchCustomerFile.KHDA_KHID = "";
        this.searchCustomerFile.KHDA_SJ = "";
        this.currentPage = 1;
        this.getTableData();
      }

      if (val.data.FCDM_LX == "房间") {
        this.$refs.dotree.getCurrentNode();
        this.FKGX_FJWJ = val.data.FCDM_ZJ;
        this.searchCustomerFile.GLQDA_ZJ = "";
        this.searchCustomerFile.FJDA_DLWJ = val.data.SJZJ.substring(
          1,
          val.data.SJZJ.length
        );
        this.searchCustomerFile.FKGX_FJWJ = val.data.FCDM_ZJ;
        this.searchCustomerFile.pageIndex = 0;
        this.searchCustomerFile.FJDA_FJMC = "";
        this.searchCustomerFile.KHDA_KHMC = "";
        this.searchCustomerFile.KHDA_KHID = "";
        this.searchCustomerFile.KHDA_SJ = "";
        this.currentPage = 1;
        this.searchCustomerFile.GLCID = val.data.GLCID;
        this.searchCustomerFile.YXDID = val.data.YXDID;
        this.disablednew = false;

        this.getTableDataRoom();

        // this.getTableData()
        // this.radio = ""; //选择后清空选中表格按钮
        this.objradio = "";
        // this.tableRow = {}; //选择后清空选中表格数据
      } else {
        this.radio = ""; //选择后清空选中表格按钮
        this.objradio = "";
        this.disablednew = true;
        this.disableddo = true;
      }
      if (val.data.FCDM_LX != "大楼" && val.data.FCDM_LX != "房间") {
        this.tableData = [];
        this.tableDataCharge = [];
      }
      this.$nextTick(() => {
        this.$refs.dotree.setCheckTree(val.id);
      });
    },
    //类型改变
    typechange(val) {
      this.currentPage = 1;
      this.radio = ""; //选择后清空选中表格按钮
      this.objradio = "";
      this.tableRow = {}; //选择后清空选中表格数据

      this.disableddo = true;
      this.searchCustomerFile.pageIndex = 0;
      this.searchCustomerFile.FJDA_FJMC = "";
      this.searchCustomerFile.KHDA_KHMC = "";
      this.searchCustomerFile.KHDA_KHID = "";
      this.searchCustomerFile.KHDA_SJ = "";

      this.familyData = [];
      this.fradio = "";
      this.getTableData();
      this.disablednew = this.FCDM_LX == "房间" ? false : true;
    },
    //新增客户
    addCus() {
      this.show = true;
      this.$refs.CusDialog.getPartitionData(
        {
          GLCID: this.searchCustomerFile.GLCID,
          YXDID: this.searchCustomerFile.YXDID,
          FKGX_LX: this.searchCustomerFile.FKGX_LX,
          FCDM_ZJ: this.searchCustomerFile.FKGX_FJWJ,
          KHDA_SDBZ: false,
        },
        0
      );
      this.radio = ""; //选择后清空选中表格按钮
      this.objradio = "";
      this.tableRow = {}; //选择后清空选中表格数据
    },
    //链接客户
    linkCus() {
      if (this.searchCustomerFile.FKGX_LX == "") {
        this.$message({
          type: "warning",
          message: "请下拉选择客户类型,不能选择全部链接客户",
        });
        return;
      }
      if (this.searchCustomerFile.FKGX_ZT == "") {
        this.$message({
          type: "warning",
          message: "请下拉选择客户状态,不能选择全部链接客户",
        });
        return;
      }
      this.linkshow = true;
      this.$refs.linkCusDialog.getPartitionData(
        {
          GLCID: this.searchCustomerFile.GLCID,
          YXDID: this.searchCustomerFile.YXDID,
          FKGX_FJWJ: this.searchCustomerFile.FKGX_FJWJ,
          FKGX_LX: this.searchCustomerFile.FKGX_LX,
          FKGX_ZT: this.searchCustomerFile.FKGX_ZT,
        },
        0
      );
      this.radio = ""; //选择后清空选中表格按钮
      this.objradio = "";
      this.tableRow = {}; //选择后清空选中表格数据
    },
    // 继承参数
    inheritCus() {
      var _this = this;
      const confirmText = [
        "是否继承旧客户的收费参数？",
        "注意：将清除当前客户的收费项目参数!",
      ];
      const newDatas = [];
      const h = this.$createElement;
      for (const i in confirmText) {
        newDatas.push(h("p", null, confirmText[i]));
      }

      this.$confirm(h("div", null, newDatas), "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          _this.$refs.inheritDialog.getPartitionData(
            {
              FKGX_FJWJ: _this.searchCustomerFile.FKGX_FJWJ,
              FKGX_ZJ: _this.tableRow.FKGX_ZJ,
              KHDA_KHMC: _this.tableRow.KHDA_KHMC,
              GLCID: _this.searchCustomerFile.GLCID,
              YXDID: _this.searchCustomerFile.YXDID,
            },
            0
          );

          _this.inheritshow = true;
        })
        .catch(() => {
          this.radio = ""; //清空选中
          this.objradio = "";
        });
    },
    //车辆管理
    carDetail() {
      if (this.tableRow.KHDA_SJ == "") {
        this.$message.warning("客户手机号未填写，不能新增车辆信息！");
        return;
      }

      this.carshow = true;
      this.$refs.carList.getPartitionData(
        this.tableRow.KHDA_ZJ,
        this.tableRow.FKGX_ZJ
      );
    },
    //我的资料
    billDetail() {
      this.billshow = true;
      this.$refs.billList.getPartitionData(
        this.tableRow.KHDA_SJ,
        this.tableRow.KHDA_ZJ
      );
    },
    // 修改客户
    updateCus() {
      this.show = true;
      this.tableRow.GLCID = this.searchCustomerFile.GLCID;
      this.tableRow.YXDID = this.searchCustomerFile.YXDID;
      this.$refs.CusDialog.getPartitionData(this.tableRow, 1);
    },
    // 退租确认
    deleteCus() {
      isOweForCustomer({
        FYSQ_FKGXWJ: this.tableRow.FKGX_ZJ,
      }).then((response) => {
        if (response.isOwe == "true") {
          this.$confirm("该用户存在欠费，是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.DialogVisible = true;
            })
            .catch(() => {
              this.radio = ""; //清空选中
              this.objradio = "";
            });
        } else {
          this.DialogVisible = true;
        }
      });
    },
    //退租操作
    rentCus() {
      if (!this.rentTime) {
        this.$message.error("没有选择退租日期，请检查！");
        return;
      }
      customerRetreatLease({
        FKGX_TZRQ: this.rentTime,
        FKGX_ZJ: this.tableRow.FKGX_ZJ,
        YXDID: this.searchCustomerFile.YXDID,
        GLCID: this.searchCustomerFile.GLCID,
        KHSJ_FJWJ: this.FKGX_FJWJ,
        KHSJ_SJSJ: this.getDate(),
        KHSJ_SJXQ: this.rentTime + "退货退租操作",
      }).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.DialogVisible = false;
          this.radio = ""; //选择后清空选中表格按钮
          this.objradio = "";
          this.tableRow = {}; //选择后清空选中表格数据
          this.RefreshList();
        }
      });
    },
    //获得当前日期
    getDate() {
      var myDate = new Date();
      //获取当前年
      var year = myDate.getFullYear();
      //获取当前月
      var month = myDate.getMonth() + 1;
      //获取当前日
      var date = myDate.getDate();
      var now = year + "-" + this.conver(month) + "-" + this.conver(date);
      return now;
    },
    //日期时间处理
    conver(s) {
      return s < 10 ? "0" + s : s;
    },
    //是否能继承
    isinherit() {
      if (this.tableRow) {
        isExistInheritParameter({
          GLCID: this.searchCustomerFile.GLCID,
          YXDID: this.searchCustomerFile.GLCID,
          FKGX_FJWJ: this.searchCustomerFile.FKGX_FJWJ,
          FKGX_ZJ: this.tableRow.FKGX_ZJ,
        }).then((response) => {
          this.inherittype = response.isExist == "yes" ? true : false;
        });
      }
    },
    // 表数据(业主，租户)
    getTableData() {
      getCustomerProfile(this.searchCustomerFile).then((response) => {
        this.$nextTick(() => {
          this.radio = "";
          this.tableData = response.data;
          this.returnTotal = response.total;
        });
      });
    },
    // 表数据选择房间
    getTableDataRoom() {
      getCustomerProfile(this.searchCustomerFile).then((response) => {
        this.$nextTick(() => {
          this.tableData = response.data;
          this.returnTotal = response.total;
          this.rowclick(this.tableData[0]);
        });
      });
    },
    selectchange(val) {
      this.radio = "";
      this.fradio = "";
      this.objradio = "";
      if (val == "1") {
        this.disablednew = false;
      } else {
        this.disablednew = true;
      }
      this.getTableData();
    },
    //刷新表数据
    RefreshList(newobj) {
      this.getTableData();
      this.getTreeFun();
      this.tableRow = newobj;
    },
    //获取家庭成员列表
    getfamily() {
      queryFamilyMembers({ JTCY_KHWJ: this.JTCY_KHWJ }).then((response) => {
        this.familyData = response;
      });
    },
    //添加家庭成员
    addfamily() {
      this.fradio = "";
      this.familyshow = true;
      this.$refs.FamilyDialog.getData({ JTCY_KHWJ: this.tableRow.KHDA_ZJ }, 0);
    },
    //修改家庭成员
    editfamily() {
      this.familyshow = true;
      this.$refs.FamilyDialog.getData(this.ftableRow, 1);
    },
    //删除家庭成员
    delfamily() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteFamilyMembers(this.ftableRow).then((response) => {
            this.fradio = ""; //选择后清空选中表格按钮
            this.refFamily({});
          });
        })
        .catch(() => {
          this.fradio = ""; //清空选中
        });
    },
    //弹窗回调，刷新家庭成员列表
    refFamily(newobj) {
      this.getfamily();
      this.ftableRow = newobj;
    },
  },
  activated() {
    //进入会触发
    if (this.treeWrapscrollTop > 0) {
      //这句必须，不然scrollTop会undefined
      this.$refs.tree_wrap.scrollTop = this.treeWrapscrollTop;
    }
  },
  deactivated() {
    //退出后触发
    this.treeWrapscrollTop = this.$refs.tree_wrap.scrollTop;
  },
  components: {
    vueZtree,
    CusDialog,
    CostObjDialog,
    linkCusDialog,
    inheritDialog,
    FamilyDialog,
    carList,
    billList,
  },
};
</script>
<style lang="scss" scoped>
.el-body {
  height: 100%;
  width: 100%;
  overflow: auto;
  padding-left: 220px;
  background: #ffffff;
  border-radius: 5px;
  .el-title {
    height: 100%;
    float: left;
    width: 220px;
    margin-left: -220px;
    padding: 0 17px;
    overflow: auto;
    border-right: 1px solid #f1f1f1;
  }
  .el-content {
    float: right;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 25px 30px 0 30px;
  }
}

.lablename {
  font-size: 14px;
  color: #606266;
  margin-right: 5px;
}

.tabletop {
  // padding: 0px 30px 0 30px;
}

.val {
  width: 170px;
  height: 35px;
}

.select {
  width: 100%;
}

.customedetail {
  width: 100%;
  overflow: auto;
}

.customedetail2 {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}

.tablebottom {
  border-top: 4px solid #eff0f0;
  padding: 16px 30px 0 30px;
}

.typechange {
  width: 106px;
  height: 35px;
  background: #ffffff;
  color: #2e8ad7;
}
.typecheck {
  background: #fff;
  color: #3a8ee6;
  border-color: #3a8ee6;
  border-radius: 0 !important;
  width: 102px;
}

.tablebody {
  padding: 0 30px;
}

.totalmoney {
  padding: 30px 30px 10px 30px;
  font-size: 14px;
  color: #666;
  text-align: left;
}

.table .el-table__row {
  height: 52px;
}

.table .el-table .current-row {
  background: #f3f7ff;
}

.table .cell {
  text-align: center;
}

.table .is-leaf {
  height: 52px;
  background: #eff0f0 !important;
}

.tree .el-scrollbar__wrap {
  margin-right: -10px !important;
}

.select .el-select {
  width: 100%;
}

.el-form-margin-bottom {
  margin-bottom: 20px;
}

.el-table .cell {
  text-decoration: underline;
}

.table-title {
  padding: 16px 0 10px 0;
  font-size: 18px;
  color: #666;
  text-align: center;
}

.family {
  height: 190px;
  margin-top: 15px;
}
</style>

<style>
.customedetail .el-table__empty-text {
  left: 548px !important;
}

.CustomerFile .el-select {
  width: 100%;
}

.CustomerFile .el-button {
  margin-left: 0px;
  margin-right: 10px;
}
</style>
