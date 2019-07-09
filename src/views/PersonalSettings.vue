<template>
  <div class="personal-settings">
    <md-card>
      <md-card-header>
        <md-icon class="md-primary">settings</md-icon>
        <md-card-header-text>
          <div class="md-title">个人设置</div>
        </md-card-header-text>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="account md-layout-item">
            <md-icon class="md-primary accountIcon">person_outline</md-icon>
            <span class="textHead">账号:</span>
            <span class="text">{{id}}</span>
          </div>
          <div class="name md-layout-item">
            <md-icon class="md-primary">chat_bubble_outline</md-icon>
            <span class="textHead">名称:</span>
            <span class="text">{{name}}</span>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="level md-layout-item">
            <md-icon class="md-primary">label_outline</md-icon>
            <span class="textHead">类别:</span>
            <span class="text">{{type}}</span>
          </div>
          <div class="type md-layout-item">
            <md-icon class="md-primary">sort</md-icon>
            <span class="textHead">级别:</span>
            <span class="text">{{level}}</span>
          </div>
        </div>

        <md-button class="md-raised md-primary" @click="handleModify()">修改密码</md-button>
      </md-card-content>
    </md-card>

    <md-dialog class="modifyDialog" :md-active.sync="showModifyDialog">
      <md-dialog-title>修改密码</md-dialog-title>

      <md-field :class="isOldEmpty">
        <md-icon>lock_open</md-icon>
        <label>原密码</label>
        <md-input type="password" v-model="inputOldPassword"></md-input>
        <span class="md-error">输入原密码</span>
      </md-field>

      <md-field :class="isFirstEmpty">
        <md-icon>lock_outline</md-icon>
        <label>输入新密码</label>
        <md-input type="password" v-model="firstPassword"></md-input>
        <span class="md-error">输入修改后的密码</span>
      </md-field>

      <md-field :class="isSecondEmpty">
        <md-icon>check_circle_outline</md-icon>
        <label>确认新密码</label>
        <md-input type="password" v-model="secondPassword"></md-input>
        <span class="md-error">再次输入以确认新密码</span>
      </md-field>

      <md-dialog-actions>
        <md-button class="md-primary" @click="verifyModify()">确认</md-button>
        <md-button class="md-primary" @click="showModifyDialog=false">取消</md-button>
      </md-dialog-actions>

      <md-content v-if="firstPassword!=secondPassword&&touched" class="hint">{{hint}}</md-content>
    </md-dialog>
  </div>
</template>

<script>
//账号 名字 类型 级别
import Vue from "vue";
import { MdCard, MdField, MdIcon } from "vue-material/dist/components";
import apis from "@/apis/apis.js";

Vue.use(MdCard);
Vue.use(MdIcon);
Vue.use(MdField);

export default {
  name: "PersonalSettings",
  components: {},
  data() {
    return {
      id: null,
      name: null,
      type: null,
      level: null,
      realOldPassword: null,
      inputOldPassword: "",
      firstPassword: "",
      secondPassword: "",
      newPassword: null,

      showModifyDialog: false,
      touched: false,
      hint: "两次密码不一致"
    };
  },

  mounted: function() {
    apis.getSelf(
      {
        method: "GET",
        url: `/common/getSelf`
      },
      res => {
        let staff = res.data;
        this.id = staff.id;
        this.name = staff.name;
        this.type = this.typeTo(staff.type);
        this.level = staff.level;
      },
      () => {}
    );
  },

  computed: {
    isOldEmpty() {
      return {
        "md-invalid": this.inputOldPassword == "" && this.touched
      };
    },
    isFirstEmpty() {
      return {
        "md-invalid": this.firstPassword == "" && this.touched
      };
    },
    isSecondEmpty() {
      return {
        "md-invalid": this.secondPassword == "" && this.touched
      };
    }
  },

  methods: {
    typeTo: function(type) {
      let typeName = "";
      switch (type) {
        case 0:
          typeName = "游客";
          break;
        case 1:
          typeName = "系统管理员";
          break;
        case 2:
          typeName = "供应商管理员";
          break;
        case 3:
          typeName = "产品录入岗";
          break;
        case 4:
          typeName = "产品审核岗";
          break;
        case 5:
          typeName = "产品配置岗";
          break;
        default:
          typeName = "未知类型";
          break;
      }
      return typeName;
    },
    handleModify: function() {
      this.showModifyDialog = true;
      this.inputOldPassword = "";
      this.firstPassword = "";
      this.secondPassword = "";
      this.touched = false;
    },

    verifyModify: function() {
      this.touched = true;
      if (
        this.inputOldPassword != "" &&
        this.firstPassword != "" &&
        this.secondPassword != ""
      ) {
        if (this.firstPassword != this.secondPassword) {
          //密码不一致
        } else {
          //均不为空且两次新密码一致
          this.newPassword = this.firstPassword;
          apis.changePassword(
            {
              method: "GET",
              url: `/common/changePassword/${this.inputOldPassword}/${this.newPassword}`
            },
            res => {
              console.log(res);
              let mess = res.data.data;
              if (mess == "原密码错误") {
                //nothing
              }
              if (mess == "修改密码成功") {
                this.$snackbar({
                  message: "修改密码成功"
                });
                this.showModifyDialog = false;
              }
            },
            () => {}
          );
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.personal-settings {
  width: 600px;
  margin: 20px auto;
}
.md-title {
  font-size: 25px;
  margin-bottom: 20px;
}

.md-icon {
  margin-right: 5px;
}

.md-card-header {
  .md-icon {
    margin-right: 8px;
    font-size: 32px !important;
    position: relative;
    left: 0;
    bottom: 5px;
  }
}

.text,
.textHead {
  font-size: 16px;
}

.textHead {
  padding-right: 10px;
}

.md-layout {
  margin-top: 20px;
  margin-bottom: 20px;
}

.md-icon {
  position: relative;
  left: 0;
  bottom: 2px;
}

.md-button {
  margin-left: 4px;
}
.modifyDialog {
  width: 400px;
}
.md-field {
  margin: 20px auto;
  max-width: 300px;
}
.hint {
  color: red !important;
  margin-left: 25px;
}
</style>