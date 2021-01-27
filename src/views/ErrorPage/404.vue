<template>
    <div class="lostPage-box">
        <div class="title-404">很抱歉，页面丢失了，请及时联系管理员！</div>
        <el-button class="btn-backIndex" @click="backIndex">返回主页</el-button>
        <el-button class="btn-back" @click="back">返回上页</el-button>
    </div>
</template>

<script>
    export default {
        methods: {
            backIndex(){
                this.$router.push({
                    path:'/Index'
                })
            },
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>
/*404*/
.lostPage-box {
  width: 100%;
  height: 100vh;
  text-align: center;
  background: url("~@/assets/images/public/bg_404.png") no-repeat 50% 50%;
  background-size: cover;

  .title-404 {
    color: #fff;
    font-size: 28px;
    padding-top: 60vh;
  }

  .el-button {
    border: none;
    padding: 16px 30px;
    font-size: 20px;
    font-weight: 500;
  }

  .btn-backIndex {
    background-color: #ff8a7e;
    color: #fff;
    margin-right: 70px;
    margin-top: 48px;
    border-radius: 6px;

    &:hover {
      background-color: #fff;
      color: #ff8a7e;
    }
  }
}

</style>