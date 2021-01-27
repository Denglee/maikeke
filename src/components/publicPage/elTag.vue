<template>
  <div class="public-main">

    <el-form :model="addForm" ref="RefAddForm" label-width="136px" class="public-diaForm">
      <!--        <div class="form-subTitle">店铺信息</div>-->
<!--      <el-form-item label="店铺账号名称：" prop="storeName" :rules="{ required: true, message: '请输入店铺账号名称', trigger: 'blur' }">-->
<!--        <el-input type="text" v-model="addForm.storeName" autocomplete="off" clearable placeholder="用于卖家区分各个账号"></el-input>-->
<!--      </el-form-item>-->

    <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        clearable
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "KeywordRank",
  data() {
    return{

      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      tempTag: '',
      isChange: false,

      addForm:{

      },
    }
  },
  methods:{

    /*关闭 tag*/
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    /*显示 input */
    showInput() {
      this.tempTag = '';
      this.inputVisible = true;
      this.inputValue = '';
      this.isChange = false;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    /*tag操作*/
    handleInputConfirm() {
      let inputValue = this.inputValue;
      //去除空格
      inputValue = inputValue.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      if(inputValue == ''){
        this.inputVisible = false;
        return;
      }
      //判断新增的值是否重复
      if(this.dynamicTags.indexOf(inputValue) != -1 && this.tempTag != inputValue){
        this.openWarring();
        return;
      }
      //判断是否修改原有的值，是则替换修改好的值，否则新增
      if(this.isChange){
        this.dynamicTags[this.dynamicTags.indexOf(this.tempTag)] = this.inputValue;
        this.inputVisible = false;
        return;
      }
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },


    //提示
    openWarring(text) {
      if(!text){
        var text = '警告!不允许添加重复数据！';
      }
      this.$message({
        message: text,
        type: 'warning',
        duration: '1000'
      });
    },

  },
  created() {

  },
}
</script>

<style scoped>
  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>