<template>
  <div class="content">
    <md-table class="tableCard" md-card v-model="userList" md-sort="name" md-sort-order="asc">
      <md-table-toolbar>
        <h1 class="md-title">用户管理</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{item.id}}</md-table-cell>
        <md-table-cell md-label="名称" md-sort-by="name">{{item.name}}</md-table-cell>
        <md-table-cell md-label="密码">{{item.password}}</md-table-cell>
        <md-table-cell md-label="类型" md-sort-by="type">{{computeType(item.type)}}</md-table-cell>
        <md-table-cell md-label="级别" md-sort-by="level">{{item.level}}</md-table-cell>
        <md-table-cell>
          <md-button class="md-dense md-primary" @click="handleUpdate(item)">修改信息</md-button>
        </md-table-cell>
        <md-table-cell>
          <md-button class="md-dense md-primary" @click="handleDelete(item)">删除</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <!-- 修改信息对话框-->
    <md-dialog class="updateDialog" :md-active.sync="showUpdateDialog">
      <md-dialog-title>修改信息</md-dialog-title>
      <div class="md-layout md-gutter inputFirstLine">
        <div class="md-layout-item">
          <md-field>
            <label>ID</label>
            <md-input v-model="updateUser.id" readonly></md-input>
          </md-field>
        </div>
        <div class="md-layout-item">
          <md-field>
            <label>名称</label>
            <md-input v-model="updateUser.name"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item">
          <md-field>
            <label>密码</label>
            <md-input v-model="updateUser.password"></md-input>
          </md-field>
        </div>
      </div>

      <div class="md-layout md-gutter inputSecondLine">
        <div class="md-layout-item">
          <md-field>
            <label for="typeInput">用户类型</label>
            <md-select v-model="updateUser.type" name="typeInput" id="typeInput">
              <md-option value="0">游客</md-option>
              <md-option value="1">系统管理员</md-option>
              <md-option value="2">供应商管理员</md-option>
              <md-option value="3">产品录入岗</md-option>
              <md-option value="4">产品审核岗</md-option>
              <md-option value="5">产品配置岗</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="md-layout-item">
          <md-field>
            <label for="levelInput">等级</label>
            <md-select v-model="updateUser.level" name="levelInput" id="levelInput">
              <md-option value="1">等级一</md-option>
              <md-option value="2">等级二</md-option>
            </md-select>
          </md-field>
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="verifyUpdate()">确认</md-button>
        <md-button class="md-primary" @click="showUpdateDialog = false">取消</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!--删除对话框 -->
    <md-dialog class="deleteDialog" :md-active.sync="showDeleteDialog">
      <md-dialog-title>修改信息</md-dialog-title>
      <p class="verify">确认删除ID为{{currentUser.id}}的用户</p>
      <md-dialog-actions>
        <md-button class="md-primary" @click="verifyDelete()">确认</md-button>
        <md-button class="md-primary" @click="showDeleteDialog = false">取消</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template> 

<script>
import Vue from "vue";

import apis from "@/apis/apis.js";
import {
  MdTable,
  MdMenu,
  MdButton,
  MdIcon,
  MdField,
  MdContent
} from "vue-material/dist/components";

Vue.use(MdTable);
Vue.use(MdMenu);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdField);
Vue.use(MdContent);

export default {
  name: "UserManage",
  components: {},
  data() {
    //id name passwd type level
    return {
      userList: [],

      //游客 供应商管理员 产品录入岗 产品审核岗 产品配置岗 系统管理员
      currentUser: {
        id: null,
        name: null,
        password: null,
        type: null,
        level: null
      },
      updateUser: {
        id: null,
        name: null,
        password: null,
        type: null,
        level: null
      },
      showUpdateDialog: false,
      showDeleteDialog: false
    };
  },

  mounted: function() {
    //获取用户列表，更新this.userList
    apis.getAllSupplier(
      {
        method: "POST",
        url: `/manage/getAll`
      },
      res => {
        var list = res.data;
        this.userList = list;
      },
      () => {}
    );
  },

  methods: {
    computeType: function(type){
      let typeName=''
      switch(type){
        case 0:
          typeName='游客'
          break
        case 1:
          typeName='系统管理员'
          break
        case 2:
          typeName='供应商管理员'
          break
        case 3:
          typeName='产品录入岗'
          break
        case 4:
          typeName='产品审核岗'
          break
        case 5:
          typeName='产品配置岗'
          break
        default:
          typeName='未知类型'
          break
      }
      return typeName
    },

    handleUpdate: function(selectedItem) {
      //弹出修改对话框
      this.currentUser = selectedItem;
      this.updateUser = this.currentUser;
      this.showUpdateDialog = true;
    },

    handleDelete: function(selectedItem) {
      //弹出删除对话框
      this.currentUser = selectedItem;
      this.showDeleteDialog = true;
    },

    verifyUpdate: function() {
      apis.updateUser(
        {
          method: "POST",
          url: `/manage/update`,
          data: this.updateUser
        },

        () => {},
        () => {}
      );

      this.showUpdateDialog = !this.showUpdateDialog;
    },

    verifyDelete: function() {
      apis.deleteUser(
        {
          method: "GET",
          url: `/manage/delete/${this.currentUser.id}`
        },

        () => {},
        () => {}
      );

      this.showDeleteDialog = !this.showDeleteDialog;
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  margin-top: 20px;
}

.tableCard {
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}

.md-table {
  color: red !important;
}

.updateDialog {
  min-width: 60vw;
}
.deleteDialog {
  width: 25vw !important;
}
.verify {
  text-align: center;
}

.inputFirstLine,
.inputSecondLine {
  margin-left: auto;
  margin-right: auto;
}
</style>