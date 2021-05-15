<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="自定义栏位"
      class="el-dialog-double FieldConfigDialog"
      :visible.sync="visible"
      @close="$emit('update:showFieldConfig', false)"
      :close-on-click-modal="false"
    >
      <section class="content_wrap">
        <div class="title">拖动区块调整显示顺序</div>
        <draggable v-model="newData" class="list-groud">
          <transition-group type="transition" :name="'flip-list'">
            <div v-for="item in newData" :key="item.content" class="list-li">
              <el-dropdown :hide-on-click="false" size="medium">
                <el-tag>
                  {{ item.content }}
                </el-tag>
                <el-dropdown-menu
                  slot="dropdown"
                  class="list-dropdown-menu dropArrow"
                >
                  <el-dropdown-item>
                    <label class="dropdown-list-title">宽度:</label>
                    <el-input
                      type="danger"
                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                      v-model="item.width"
                      onchange="widthChange"
                      class="dropdown-list-input"
                    ></el-input>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </transition-group>
        </draggable>
      </section>
      <section class="field_wrap">
        <div class="title">选择自定义显示列</div>
        <el-checkbox-group
          v-model="checkData"
          class="list-groud"
          @change="checkChange"
        >
          <el-checkbox-button
            v-for="item in fieldData"
            :label="item.content"
            :key="item.content"
          ></el-checkbox-button>
        </el-checkbox-group>
      </section>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveClcik">保存</el-button>
        <el-button type="primary" @click="clearClcik">清空</el-button>
        <el-button type="danger" @click="cancelForm">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  props: ["showFieldConfig"],
  components: { draggable },
  data() {
    return {
      title: "新增",
      visible: this.showFieldConfig,
      tags: [],
      checkData: [], //选中栏位
      fieldData: [], //默认栏位
      newData: [], //选中后 重组新的数组  用于已选中宽度设置
      code: "",
    };
  },
  watch: {
    showFieldConfig() {
      this.visible = this.showFieldConfig;
      if (this.visible) {
      }
    },
  },
  methods: {
    getReceiptData(queryData, configData, code) {
      this.code = code; //模块标识
      this.fieldData = configData; //默认全部配置的栏位
      this.checkData = [];
      if (queryData.length > 0) {
        //设置如果有选中的栏位  则高亮按钮
        queryData.forEach((item) => {
          if (item.code == this.code) {
            this.newData = JSON.parse(item.content); //选中后 重组新的数组  用于拖动快区域数据设置
            if (this.newData.length > 0) {
              JSON.parse(item.content).forEach((item2) => {
                this.checkData.push(item2.content);
              });
            }
          }
        });
      }
      console.log(this.checkData);
    },
    checkChange(val) {
      //选择自定义显示列选中事件
      this.newData = [];
      this.fieldData.forEach((item) => {
        val.forEach((item2) => {
          if (item.content == item2) {
            var data = {};
            data.content = item.content;
            data.width = item.width;
            data.field = item.field;
            this.newData.push(data); //选中的数据重组新数组
          }
        });
      });
    },
    saveClcik() {
      //保存
      this.$emit("RefreshItem", this.newData);
      this.cancelForm();
    },
    clearClcik() {
      //清空
      this.newData = [];
      this.checkData = [];
    },
    cancelForm() {
      this.$emit("update:showFieldConfig", false);
    },
  },
};
</script>
<style lang="scss">
.FieldConfigDialog {
  .el-dialog {
    width: 700px !important;
    text-align: left;
    .el-dialog__header {
      background: #fff;
      font-size: 16px;
    }
    .el-dialog__body {
      background: #eff0f0;
      padding: 20px;
    }
    .el-dialog__footer {
      background: #fff;
    }
  }
  .list-groud {
    padding: 24px;
    background: #fff;
  }
  .title {
    padding: 10px 20px;
    color: #353b64;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
  }
  .el-tag {
    margin-left: 10px;
  }
  .el-checkbox-button__inner {
    border-left-color: #409eff;
    border: 1px solid #dcdfe6;
    border-radius: 4px !important;
    margin: 0 10px 10px 0;
    color: #455689;
    background: #e6e8f3;
    border-radius: 4px 4px 4px 4px;
    border: unset;
    font-size: 12px;
    padding: 8px 12px;
    height: unset;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .el-tag {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.65);
    background: #fff;
    border: 1px solid #d9d9d9;
  }
  .list-li {
    display: inline-block;
    margin: 0 0 10px 0;
  }
}
.dropdown-list-title {
  display: inline-block !important;
}
.dropdown-list-input.el-input {
  width: 65px;
}
.el-dropdown-link {
  cursor: pointer;
}
.list-dropdown-menu {
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background: none !important;
    color: rgba(0, 0, 0, 0.65);
  }
}
.el-popper[x-placement^="bottom"].dropArrow .popper__arrow {
  display: inline !important;
} //显示箭头
</style>
