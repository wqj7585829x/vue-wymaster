<template>
  <!--ztree-->
  <div class="ztree_content_wrap" v-if="list.length > 0">
    <!-- 树搜索框 -->
    <el-input
      placeholder="按名称搜索"
      v-model="filterText"
      v-show="showInput"
      clearable
    ></el-input>
    <!-- 树列表 -->
    <!-- expand-on-click-node 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 -->
    <el-tree
      class="filter-tree"
      :data="list"
      :props="defaultProps"
      node-key="id"
      :show-checkbox="showCheckbox"
      :default-expanded-keys="isExpandArray"
      @keyup.native="keyup"
      :render-content="renderContent"
      :highlight-current="highlight"
      @node-click="handleNodeClick"
      @check="handleNodeCheck"
      :filter-node-method="filterNode"
      ref="TreeChildren"
    ></el-tree>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      filterText: "", //搜索框变量
      defaultProps: {
        children: "children",
        label: "name",
      },
      isExpandArray: [], //数据展开数组
      ClickOrgId: null, //默认点击node-key值
      highlight: true, //默认树节点高亮
      doubleclick: 0,
      isExpandShow: false,
      searchTxt: " ",
    };
  },
  props: {
    // 树数据
    list: {
      type: Array,
      twoWay: true,
    },
    //是否显示搜索框
    showInput: {
      type: Boolean,
    },
    // 是否显示选择框
    showCheckbox: {
      type: Boolean,
    },
  },
  watch: {
    //监听树搜索框
    filterText(val) {
      if (!val) {
        this.setAllExpand(false);
      }
      this.$refs.TreeChildren.setCheckedNodes([]);
      this.$refs.TreeChildren.filter(val);
    },
  },
  methods: {
    GofilterText(val) {
      //根据值，获取节点id，自动点击树
      console.log(this.list);
      this.filterText = val;
      let id = "";
      this.list.find((item) => {
        item.children.find((its) => {
          its.children.find((iks) => {
            iks.children.find((izs) => {
              if (izs.name == val) {
                id = izs.id;
              }
            });
          });
        });
      });
      let node = this.$refs.TreeChildren.getNode(id); // 根据el-tree的getNode方法获取到id相应的Node
      this.handleNodeClick(node.data, node); //获取点击树
    },
    //render-content自定义节点内容,节点的内容支持自定义，可以在节点区添加按钮或图标等内容
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <i class={data.iconClass} />
          <span style="margin-left:5px;" title={node.label}>
            {node.label}
          </span>
        </span>
      );
    },
    //按住键盘事件
    keyup(e) {
      this.highlight = true; //设置高亮
      e.target.click(); //键盘获取当前元素点击事件
    },
    //filter-node-method过滤搜索树函数 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
    filterNode(value, data, node) {
      if (!value) return true;
      this.searchTxt = value;
      return (
        data.name.toLowerCase().indexOf(value.toString().toLowerCase()) !== -1
      ); //返回true这个节点可以显示，返回 false 则表示这个节点会被隐藏
    },
    //点击获取当前点击数据
    handleNodeClick(data, node) {
      this.highlight = true; //设置高亮
      this.$emit("getTreeData", data, node); //点击传递数据给父级
      //console.log(this.$refs.TreeChildren.getNode(data).parent)
    },
    //选中展开
    setCheckTree(checkId) {
      if (checkId) {
        this.isExpandArray = [];
        this.isExpandArray.push(checkId); //展开数据设置node-key="orgId" 数据展开数组:default-expanded-keys="isExpandArray"
        this.$refs.TreeChildren.setCurrentKey(checkId); //setCurrentKey通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
      }
    },
    setEXpand() {
      this.isExpandArray = [];
    },
    //清除选中--分摊设置页面
    resetChecked() {
      this.highlight = false; //清除高亮
      this.$refs.TreeChildren.setCheckedKeys([]); //清除树选中节点事件
    },
    // 复选框选中 事件 -- 费用生成页面
    handleNodeCheck(data) {
      this.$emit("getTreeCheckData", data); //点击传递数据给父级
    },
    //复选框勾选--费用生成页面
    setCheckedTreeKeys(checkedKeys) {
      this.resetChecked();
      this.isExpandArray = [];
      this.isExpandArray.push(checkedKeys);
      this.$refs.TreeChildren.setCheckedKeys([checkedKeys]);
    },
    //复选框勾选并展开树
    setCheckedKeys(OpenKeys, checkedKeys) {
      this.resetChecked();
      this.isExpandArray = [];
      this.isExpandArray.push(OpenKeys);
      this.$refs.TreeChildren.setCheckedKeys(checkedKeys);
    },
    // 获取 复选框 选中节点 -- 费用生成页面
    getTreeCheckedNodes() {
      return this.$refs.TreeChildren.getCheckedNodes();
    },
    // 获取 选中节点 -- 费用生成页面
    getCurrentNode() {
      return this.$refs.TreeChildren.getCurrentNode();
    },
    //获取过滤输入框中的值
    getSearchTxt() {
      return this.searchTxt;
    },
    clearSearch() {
      this.filterText = "";
    },
    //设置全部展开和折叠。state参数为bool值   点击搜索框关闭按钮后折叠所有节点
    setAllExpand(state) {
      var nodes = this.$refs.TreeChildren.store.nodesMap;
      for (var i in nodes) {
        nodes[i].expanded = state;
      }
      this.setCheckTree(this.list[0].id);
    },
  },
};
</script>
<style>
.ztree_content_wrap {
  margin-top: 17px;
}
.ztree_content_wrap .el-tree-node__content {
  height: 30px;
}
.ztree_content_wrap .el-input {
  width: auto !important;
}
.ztree_content_wrap .el-input__inner {
  width: auto;
  outline: none;
  border: 1px solid #eceef2;
  border-radius: 20px;
  height: 30px;
  margin: 15px 30px;
}

.ztree_content_wrap .el-input__icon {
  line-height: 28px !important;
}
/* 树图标css */
.custom-tree-node i {
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: -2px;
}
/*左边树每一级左间距*/
.el-tree-node.is-expanded > .el-tree-node__children .el-tree-node__content {
  padding-left: 10px !important;
}
.el-tree-node.is-expanded
  > .el-tree-node__children
  .el-tree-node__content
  + .el-tree-node__children
  .el-tree-node__content {
  padding-left: 20px !important;
}
.el-tree-node.is-expanded
  > .el-tree-node__children
  .el-tree-node__content
  + .el-tree-node__children
  .el-tree-node__content
  + .el-tree-node__children
  .el-tree-node__content {
  padding-left: 30px !important;
}

.TreeGroupIcon {
  background: url("./Image/TreeGroupIcon.png") no-repeat center/100% auto !important;
}
.TreeTenIcon {
  background: url("./Image/TreeTenIcon.png") no-repeat center/100% auto !important;
}
.TreePlotIcon {
  background: url("./Image/TreePlotIcon.png") no-repeat center/100% auto !important;
}
.TreeDepartIcon {
  background: url("./Image/TreeDepartIcon.png") no-repeat center/100% auto !important;
}
.TreeJobIcon {
  background: url("./Image/TreeJobIcon.png") no-repeat center/100% auto !important;
}
.TreeHouseIcon {
  background: url("./Image/TreeHouseIcon.png") no-repeat center/100% auto !important;
}
.TreeBuildIcon {
  background: url("./Image/TreeBuildIcon.png") no-repeat center/100% auto !important;
}
.TreeRoomIcon {
  background: url("./Image/TreeRoomIcon.png") no-repeat center/100% auto !important;
}
.TreeTableIcon {
  background: url("./Image/TreeTableIcon.png") no-repeat center/100% auto !important;
}
.TreeCustomerIcon {
  background: url("./Image/TreeCustomerIcon.png") no-repeat center/100% auto !important;
}
.TreeTenIconWithPeople {
  background: url("./Image/TreeTenIconWithPeople.png") no-repeat center/100%
    auto !important;
}
.TreeFileIcon {
  background: url("./Image/TreeFileIcon.png") no-repeat center/100% auto !important;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  color: #5490ef;
}
</style>
