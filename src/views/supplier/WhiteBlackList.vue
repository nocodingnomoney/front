<template>
  <div id="content">
    <md-app-drawer md-permanent="clipped">
      <md-list>
        <md-list-item @click="showList('白名单')">
          <md-icon>add</md-icon>
          <span class="md-list-item-text">白名单</span>
        </md-list-item>

        <md-list-item @click="showList('黑名单')">
          <md-icon>add</md-icon>
          <span class="md-list-item-text">黑名单</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-table v-model="currentList" md-card id="tableCard">
      <md-table-toolbar>
        <h1 class="md-title" id="listLabel">黑/白名单</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <!-- <md-table-cell md-label="ID" md-numeric>{{item.id}}</md-table-cell> -->
        <md-table-cell md-label="名称">{{item.name}}</md-table-cell>
        <!-- <md-table-cell>
          <md-button class="md-dense md-primary" @click="handleRemove(item.id)">移除</md-button>
        </md-table-cell> -->
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
//   MdDrawer,
//   MdToolbar,
//   MdList,
//   MdIcon,
//   MdButton,
//   MdSnackbar,
//   MdTable
// } from 'vue-material/dist/components'

// Vue.use(MdDrawer)
// Vue.use(MdToolbar)
// Vue.use(MdList)
// Vue.use(MdIcon)
// Vue.use(MdButton)
// Vue.use(MdSnackbar)
// Vue.use(MdTable)

export default {
  name: "TableBasic",
  data() {
    return {
      showWhite: false,
      showBlack: false,
      currentList: [],
      whiteList: [],
      blackList: []
    };
  },
  methods: {
    showList: function(listName) {
      let label = document.getElementById("listLabel");
      label.textContent = listName;

      if (listName == "白名单") {
        this.showWhite = true;
        this.showBlack = false;

        apis.getAllWhite(
          {
            method: "GET",
            url: `/provide/getAllWhite`
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
            this.whiteList = list;
          },
          () => {}
        );

        this.currentList = this.whiteList;
      }

      if (listName == "黑名单") {
        this.showWhite = false;
        this.showBlack = true;

        apis.getAllBlack(
          {
            method: "GET",
            url: `/provide/getAllBlack`
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
            this.blackList = list;
          },
          () => {}
        );

        this.currentList = this.blackList;
      }
    },

    // handleRemove: function(id) {
    //   alert("remove" + id);
    // }
  }
};
</script>

<style lang="scss" scoped>
#content {
  margin-top: 20px;
}
.md-app-drawer {
  width: 12%;
  float: left;
}

#tableCard {
  margin-left: 15vw;
  margin-right: auto;
  width: 50%;
}
</style>