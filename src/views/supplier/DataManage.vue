<template>
  <div id="content">
    <!--  这是 新增供应商 的对话框 -->
    <md-dialog :md-active.sync="showCreateDialog">
      <md-dialog-title>添加供应商</md-dialog-title>
      <div class="md-layout md-gutter dialogInput">
        <!-- <div class="md-layout-item md-size-30">
          <md-field :class="isNewIdEmpty">
            <label>账号</label>
            <md-input v-model="newId"></md-input>
            <span class="md-error">账号不能为空</span>
          </md-field>
        </div> -->

        <div class="md-layout-item md-size-30">
          <md-field :class="isNewNameEmpty">
            <label>名称</label>
            <md-input v-model="newName"></md-input>
            <span class="md-error">名称不能为空</span>
          </md-field>
        </div>

        <div class="md-layout-item md-size-20">
          <md-switch v-model="newCertify" class="md-primary">是否认证</md-switch>
        </div>

        <div class="md-layout-item md-size-20">
          <md-switch v-model="newBlack" class="md-primary">黑名单</md-switch>
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="createSupplier()">确认</md-button>
        <md-button class="md-primary" @click="showCreateDialog = false">取消</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!--  这是 修改信息 的对话框 -->
    <md-dialog :md-active.sync="showUpdateDialog">
      <md-dialog-title>修改信息</md-dialog-title>
      <div class="md-layout md-gutter dialogInput">
        <!-- <div class="md-layout-item md-size-30">
          <md-field :class="isUpdateIdEmpty">
            <label>账号</label>
            <md-input v-model="updateId"></md-input>
            <span class="md-error">账号不能为空</span>
          </md-field>
        </div> -->

        <div class="md-layout-item md-size-30">
          <md-field :class="isUpdateNameEmpty">
            <label>名称</label>
            <md-input v-model="updateName"></md-input>
            <span class="md-error">名称不能为空</span>
          </md-field>
        </div>

        <div class="md-layout-item md-size-20">
          <md-switch v-model="updateCertify" class="md-primary">是否认证</md-switch>
        </div>

        <div class="md-layout-item md-size-20">
          <md-switch v-model="updateBlack" class="md-primary">黑名单</md-switch>
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="verifyUpdate">确认</md-button>
        <md-button class="md-primary" @click="showUpdateDialog = false">取消</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!--  这是 删除 的对话框 -->
    <md-dialog :md-active.sync="showDeleteDialog">
      <md-dialog-title>删除信息</md-dialog-title>
      <div class="md-layout md-gutter dialogInput">
        <!-- <div class="md-layout-item">
          <md-field>
            <label>账号</label>
            <md-input v-model="currentId" readonly></md-input>
          </md-field>
        </div> -->

        <div class="md-layout-item">
          <md-field>
            <label>名称</label>
            <md-input v-model="currentName" readonly></md-input>
          </md-field>
        </div>

        <div class="md-layout-item">
          <md-switch v-model="currentCertify" class="md-primary" disabled>是否认证</md-switch>
        </div>

        <div class="md-layout-item">
          <md-switch v-model="currentBlack" class="md-primary" disabled>黑名单</md-switch>
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="vertifyDelete">确认</md-button>
        <md-button class="md-primary" @click="showDeleteDialog = false">取消</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!--展示供应商资料的表格 -->
    <md-table v-model="userList" md-card id="tableCard">
      <md-table-toolbar>
        <h1 class="md-title" id="listLabel">资料管理</h1>
        <md-button class="md-raised md-primary" @click="handleCreate()">添加供应商</md-button>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <!-- <md-table-cell md-label="ID" md-numeric>{{item.id}}</md-table-cell> -->
        <md-table-cell md-label="名称">{{item.name}}</md-table-cell>
        <md-table-cell md-label="认证情况">{{item.certification ? '是':'否'}}</md-table-cell>
        <md-table-cell>
          <md-button
            class="md-dense md-primary"
            @click="handleUpdate(item.id, item.name, item.certification, item.black_list)"
          >修改信息</md-button>
        </md-table-cell>
        <md-table-cell>
          <md-button
            class="md-dense md-primary"
            @click="handleDelete(item.id, item.name, item.certification, item.black_list)"
          >删除</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

import apis from "@/apis/apis.js";

Vue.use(VueMaterial);
// import Vue from 'vue'

// import {
//   MdDialog,
//   MdList,
//   MdIcon,
//   MdButton,
//   MdTable,
//   MdSwitch,
//   MdDrawer
// } from 'vue-material/dist/components'

// Vue.use(MdDialog)
// Vue.use(MdList)
// Vue.use(MdIcon)
// Vue.use(MdButton)
// Vue.use(MdTable)
// Vue.use(MdSwitch)
// Vue.use(MdDrawer)

export default {
  name: "DataManage",
  components: {},
  data() {
    return {
      showUpdateDialog: false,
      showDeleteDialog: false,
      showCreateDialog: false,

      newId: "",
      newName: "",
      newCertify: null,
      newBlack: null,

      currentId: "",
      currentName: "",
      currentCertify: null,
      currentBlack: null,

      updateId: "",
      updateName: "",
      updateCertify: null,
      updateBlack: null,

      userList: [{id: 12,name:'Lee',certification:'已认证',black_list:'黑名单'}],

      createTouched: false,
      updateTouched: false
    };
  },

  mounted: function() {
    // Code that will run only after the
    // entire view has been rendered
    apis.getAllSupplier(
      {
        method: "GET",
        url: `/provide/getAll`
      },
      res => {
        var list = res.data;
        for (let item of list) {
          if (item.certification == "已认证") {
            item.certification = true;
          } else {
            item.certification = false;
          }

          item.black_list = item.black_list == "黑名单" ? true : false;
        }

        this.userList = list;
      },
      () => {}
    );
  },

  computed: {
    isNewIdEmpty() {
      return {
        "md-invalid": this.newId == "" && this.createTouched
      };
    },
    isNewNameEmpty() {
      return {
        "md-invalid": this.newName == "" && this.createTouched
      };
    },
    isUpdateIdEmpty() {
      return {
        "md-invalid": this.updateId == "" && this.updateTouched
      };
    },
    isUpdateNameEmpty() {
      return {
        "md-invalid": this.updateName == "" && this.updateTouched
      };
    }
  },

  methods: {
    handleUpdate: function(id, name, certify, black) {
      this.showUpdateDialog = !this.showUpdateDialog;
      this.updateTouched=false;

      this.currentId = id;
      this.currentName = name;
      this.currentCertify = certify;
      this.currentBlack = black;
      this.updateId = this.currentId;
      this.updateName = this.currentName;
      this.updateCertify = this.currentCertify;
      this.updateBlack = this.currentBlack;
    },

    handleDelete: function(id, name, certify, black) {
      this.showDeleteDialog = !this.showDeleteDialog;
      this.currentName = name;
      this.currentCertify = certify;
      this.currentBlack = black;
      this.currentId = id;
    },

    handleCreate: function() {
      this.newId = "";
      this.newName = "";
      this.newCertify = false;
      this.newBlack = false;
      this.createTouched = false;
      this.showCreateDialog = !this.showCreateDialog;
    },

    createSupplier: function() {
      this.createTouched = true;

      //输入均不为空,则发起请求
      if (this.newId != "" && this.newName != "") {
        let nId = this.newId;
        let nName = this.newName;
        let nCertify = this.newCertify ? "已认证" : "未认证";
        let nBlack = this.newBlack ? "黑名单" : "白名单";

        apis.addSupplier(
          {
            method: "POST",
            url: `/provide/add`,
            data: {
              id: nId,
              name: nName,
              certification: nCertify,
              black_list: nBlack
            }
          },
          () => {},
          () => {}
        );
        this.showCreateDialog = false;
      }
    },

    vertifyDelete: function() {
      apis.deleteSupplier(
        {
          method: "GET",
          url: `/provide/delete/${this.currentId}`
        },

        () => {},
        () => {}
      );

      this.showDeleteDialog = false;
    },

    verifyUpdate: function() {
      this.updateTouched = true;

      //输入均不为空，则发起请求
      if (this.updateId != "" && this.updateName != "") {
        apis.updateSupplier(
          {
            method: "PUT",
            url: `/provide/update`,
            data: {
              id: this.updateId,
              name: this.updateName,
              certification: this.updateCertify ? "已认证" : "未认证",
              black_list: this.updateBlack ? "黑名单" : "白名单"
            }
          },

          () => {},
          () => {}
        );

        this.showUpdateDialog = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#content {
  margin-top: 20px;
}
#tableCard {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.md-dialog {
  min-width: 60vw;
}

.dialogInput {
  margin-left: auto;
  margin-right: auto;
}
</style>