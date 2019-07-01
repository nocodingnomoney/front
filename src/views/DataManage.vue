<template>
  <div id="content">

    <!--  这是 修改信息 的对话框 -->
    <md-dialog :md-active.sync="showUpdateDialog">
      <md-dialog-title>修改信息</md-dialog-title>
        <div class="md-layout md-gutter" id="dialogInput">
          <div class="md-layout-item md-size-35">
            <md-field>
              <label>账号</label>
              <md-input v-model="updateId"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-35">
            <md-field>
              <label>名称</label>
              <md-input v-model="updateName"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-30">
            <md-switch v-model="updateCertify" class="md-primary">是否认证</md-switch>
          </div>
        </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showUpdateDialog = false">确认</md-button>
        <md-button class="md-primary" @click="showUpdateDialog = false">取消</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!--  这是 删除 的对话框 -->
    <md-dialog :md-active.sync="showDeleteDialog">
      <md-dialog-title>删除信息</md-dialog-title>
        <div class="md-layout md-gutter" id="dialogInput">
          <div class="md-layout-item md-size-35">
            <md-field>
              <label>账号</label>
              <md-input v-model="currentId" readonly></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-35">
            <md-field>
              <label>名称</label>
              <md-input v-model="currentName" readonly></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-30">
            <md-switch v-model="currentCertify" class="md-primary" disabled>是否认证</md-switch>
          </div>
        </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDeleteDialog = false">确认</md-button>
        <md-button class="md-primary" @click="showDeleteDialog = false">取消</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!--展示供应商资料的表格 -->
    <md-table v-model="userList" md-card id="tableCard">
      <md-table-toolbar>
        <h1 class="md-title" id="listLabel">资料管理</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }"> 
        <md-table-cell md-label="ID" md-numeric>{{item.id}}</md-table-cell>
        <md-table-cell md-label="名称">{{item.name}}</md-table-cell>
        <md-table-cell md-label="认证情况">{{item.certify ? '是' : '否'}}</md-table-cell>
        <md-table-cell>
          <md-button class="md-dense md-primary" @click="handleUpdate(item.id, item.name, item.certify)">修改信息</md-button>
        </md-table-cell>
        <md-table-cell>
          <md-button class="md-dense md-primary" @click="handleDelete(item.id, item.name, item.certify)">删除</md-button>
        </md-table-cell>      
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import Vue from 'vue'

  import {
    MdDialog,
    MdList,
    MdIcon,
    MdButton,
    MdTable,
    MdSwitch
  } from 'vue-material/dist/components'

  Vue.use(MdDialog)

  Vue.use(MdList)
  Vue.use(MdIcon)
  Vue.use(MdButton)
  Vue.use(MdTable)
  Vue.use(MdSwitch)

  export default {
    name: 'DataManage',
    components: {},
    data(){
      return{
        showUpdateDialog: false,
        showDeleteDialog: false,
        currentId: null,
        currentName: null,
        currentCertify: null,
        updateId: null,
        updateName: null,
        updateCertify: null,
        userList: [
          {id:4545,name:'Lee',certify:true},
          {id:2558,name:'Bob',certify:false},
          {id:5558,name:'May',certify:true},
          {id:4545,name:'Lee',certify:true},
          {id:2558,name:'Bob',certify:false},
          {id:5558,name:'May',certify:true},
          {id:4545,name:'Lee',certify:true},
          {id:2558,name:'Bob',certify:false},
          {id:5558,name:'May',certify:true},
          {id:4545,name:'Lee',certify:true},
          {id:2558,name:'Bob',certify:false},
          {id:5558,name:'May',certify:true}
        ]
      }
    },

    methods: {
      handleUpdate : function(id,name,certify){
        this.showUpdateDialog=!this.showUpdateDialog
        this.currentId=id
        this.currentName=name
        this.currentCertify=certify
        this.updateId=this.currentId
        this.updateName=this.currentName
        this.updateCertify=this.currentCertify
      },

      handleDelete : function(id,name,certify){
        this.showDeleteDialog=!this.showDeleteDialog
        this.currentId=id
        this.currentName=name
        this.currentCertify=certify
      }
    }
  }
</script>
<style lang="scss" scoped>
#content{
  margin-top: 20px;
}
#tableCard{
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}

#dialogInput{
  margin-left: auto;
  margin-right: auto;
}

</style>