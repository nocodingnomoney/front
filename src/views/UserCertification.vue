<template>
  <div id="content">
    <md-table v-model="userList" md-card id="tableCard">
      <md-table-toolbar>
        <h1 class="md-title" id="listLabel">用户认证</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }"> 
        <md-table-cell md-label="ID" md-numeric>{{item.id}}</md-table-cell>
        <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
        <md-table-cell md-label="Gender">{{item.gender}}</md-table-cell>
        <md-table-cell>
          <md-button class="md-dense md-primary">认证</md-button>
        </md-table-cell>
        <md-table-cell>
          <md-button class="md-dense md-primary">取消</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  export default {
    name: 'UserCertification',
    components: {},
    data(){
      return{
        userList: [
          {id:1,name:'Lee',gender:'male'},
          {id:2,name:'Bob',gender:'male'},
          {id:555,name:'May',gender:'female'}
        ]
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

</style>