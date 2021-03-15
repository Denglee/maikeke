<template>
  <div class="tabs-main">
    <el-tabs :tab-position="tabPosition" id="tabs-message"
             v-model="tabActiveName">
      <el-tab-pane lazy name="name1" label="个人信息">
        <PersonalInfo></PersonalInfo>
      </el-tab-pane>
      <el-tab-pane lazy name="name2" label="账户设置">
        <AccountSetup></AccountSetup>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PersonalInfo from "@/views/System/AccountCenter/PersonalInfo";
import AccountSetup from "@/views/System/AccountCenter/AccountSetup";
export default {
  name: "userinfo",
  components:{PersonalInfo, AccountSetup},
  data() {
    return {
      tabPosition: 'left',
      tabActiveName:'name1',
    }
  },
  methods: {},
  created() {

  },
}
</script>
