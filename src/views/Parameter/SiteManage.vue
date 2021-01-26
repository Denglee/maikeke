<template>
  <div class="public-main organize-box">
    <div class="organizeL-box" style='padding: 0'>
      <el-menu
          :default-active="activeMenu"
          @open="handleOpen"
          @close="handleClose">

        <el-submenu :index="indexFirst+''" :data-index="indexFirst+''" v-for="(siteFirst,indexFirst) in siteArr2" :key="indexFirst">
          <template slot="title">
            <span>{{ siteFirst.name }}</span>
          </template>
          <el-menu-item>
            <el-button @click.native.stop="FnBtnAddSiteShow(siteFirst)">添加</el-button>
          </el-menu-item>
          <el-menu-item :index="indexFirst+''+'-'+indexSecond+''" :data-index="indexFirst+''+'-'+indexSecond+''" v-for="(siteSecond,indexSecond) in siteFirst.child" :key="indexSecond"
          class="site-item">
            <span @click="FnChoose(indexFirst)">{{siteSecond.name}}</span>
            <el-dropdown size="medium"  class="site-dropdown">
              <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </el-submenu>

      </el-menu>

    </div>
    <div class="organizeR-box">
      <div class="alignR">
        <el-button icon="el-icon-folder-add" @click="FnBtnAddShow" :loading="btnState.btnAdd" class="public-btn">新增国家站点</el-button>
      </div>

      <el-table class="public-table" border
                :data="tableArr"
                ref="refTable"
                height="600">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="country" label="国家站点"></el-table-column>
        <el-table-column prop="site" label="所属区域站点"></el-table-column>
        <el-table-column prop="hostCountry" label="所在国家"></el-table-column>
        <el-table-column prop="currencyCode" label="结算货币代码"></el-table-column>
        <el-table-column prop="currencySymbol" label="货币符号"></el-table-column>
        <el-table-column prop="img" label="站点图片"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">

          </template>
        </el-table-column>
      </el-table>

    </div>

    <!--添加\编辑区域站点 -->
    <el-dialog :append-to-body="true"
               title="添加\编辑区域站点"
               :visible.sync="diaState.diaAddSite"
               custom-class="public-dialog"
               :close-on-click-modal="false"
               @close='FnCloseAddSite'
               width="800px">
      <el-form :model="addSiteForm" ref="RefAddSiteForm" label-width="136px" class="public-diaForm">
        <el-form-item label="区域站点名称：" prop="regionName" :rules="{ required: true, message: '请输入区域站点名称', trigger: 'blur' }">
          <el-input type="text" v-model="addSiteForm.regionName" autocomplete="off" clearable placeholder="区域站点名称"></el-input>
        </el-form-item>
        <el-form-item label="所属平台：" prop="plateName" :rules="{ required: true, message: '请输入所属平台', trigger: 'blur' }">
          <el-input type="text" v-model="addSiteForm.plateName" autocomplete="off" clearable placeholder="所属平台"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="note">
          <el-input type="textarea" v-model="addSiteForm.note" autocomplete="off" clearable placeholder="描述"></el-input>
        </el-form-item>

        <el-form-item class="alignR">
          <el-button type="primary" @click="diaState.diaAddSite = false;" :loading="btnState.btnCancelSite">取消</el-button>
          <el-button type="primary" @click="FnBtnSaveAddSite('RefAddSiteForm')" :loading="btnState.btnSubmitSite">保存</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

    <!--添加国家站点 -->
    <el-dialog :append-to-body="true"
               title="添加/编辑国家站点"
               :visible.sync="diaState.diaAddCountry"
               custom-class="public-dialog"
               :close-on-click-modal="false"
               @close='FnCloseAdd'
               width="800px">
      <el-form :model="addForm" ref="RefAddForm" label-width="160px" class="public-diaForm">
        <el-form-item label="国家站点编号：" prop="No" :rules="{ required: true, message: '请输入国家站点编号', trigger: 'blur' }">
          <el-input type="text" v-model="addForm.No" autocomplete="off" clearable placeholder="国家站点编号"></el-input>
        </el-form-item>
        <el-form-item label="国家站点名称：" prop="country" :rules="{ required: true, message: '请输入国家站点名称', trigger: 'blur' }">
          <el-input type="text" v-model="addForm.country" autocomplete="off" clearable placeholder="国家站点名称"></el-input>
        </el-form-item>
        <el-form-item label="所属区域站点：" prop="site" :rules="{ required: true, message: '请输入所属区域站点', trigger: 'blur' }">
          <el-input type="text" v-model="addForm.site" autocomplete="off" clearable placeholder="所属区域站点"></el-input>
        </el-form-item>
        <el-form-item label="所在国家：" prop="hostCountry" :rules="{ required: true, message: '请输入所在国家', trigger: 'blur' }">
          <el-input type="text" v-model="addForm.hostCountry" autocomplete="off" clearable placeholder="所在国家"></el-input>
        </el-form-item>
        <el-form-item label="交易结算货币类型：" prop="currencyCode" :rules="{ required: true, message: '请输入交易结算货币类型', trigger: 'blur' }">
          <el-input type="text" v-model="addForm.currencyCode" autocomplete="off" clearable placeholder="交易结算货币类型"></el-input>
        </el-form-item>
        <el-form-item label="所属平台：" prop="plate" :rules="{ required: true, message: '请输入所属平台', trigger: 'blur' }">
          <el-input type="text" v-model="addForm.plate" autocomplete="off" clearable placeholder="所属平台"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-input type="text" v-model="addForm.state" autocomplete="off" clearable placeholder="状态"></el-input>
        </el-form-item>
        <el-form-item label="站点图片：" prop="img">
          <el-input type="text" v-model="addForm.img" autocomplete="off" clearable placeholder="站点图片"></el-input>
        </el-form-item>

        <el-form-item class="alignR">
          <el-button type="primary" @click="diaState.diaAddCountry = false;" :loading="btnState.btnCancel">取消</el-button>
          <el-button type="primary" @click="FnBtnAdd('RefAddForm')" :loading="btnState.btnSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>



  </div>
</template>

<script>
export default {
  name: "SiteManage",
  data() {
    return {
      activeMenu:'0-0',
      btnState:{
        btnAdd:false,
        btnCancel:false,

        btnAddSite:false,
        btnCancelSite:false,
        btnSubmitSite:false,
      },
      diaState:{
        diaAddTitle:'添加',
        diaAddSite:false,  /*添加站点  */

        diaAddCountry:true,   /*添加国家站点*/
      },
      siteArr2:[
        {
          name:'amazon',
          id:'amazon1',
          child:[
            {
              name:'北美',
              id:'beimei1',
            },
            {
              name:'南美',
              id:'nanmei1',
            },
          ]
        },
        {
          name:'ebay',
          id:'ebay1',
          child:[
            {
              name:'北美',
              id:'beimei2',
            },
            {
              name:'南美',
              id:'nanmei2',
            },
          ]
        },
      ],

      /*区域站点*/
      addSiteForm:{
        regionName:'',
        plateName:'',
        note:'',
      },
      addForm:{

      },

      siteArr:[
        {
          id:1,
          name:'北美站',
          value:'bm',
        },
        {
          id:2,
          name:'南美站',
          value:'bm',
        },
      ],
      tableArr:[
        {
          country:'美国',
          site:'北美站',
          hostCountry:'美国',
          currencyCode:'USD',
          currencySymbol:'$',
          plate:'1',
          img:'',
          state:'1',
        },
      ],

    }
  },
  methods: {
    FnChoose(val){
      console.log(val);
    },

    handleOpen(val){
      console.log(val);
    },
    handleClose(val){
      console.log(val);
    },

    /*区域站点 A 弹出*/
    FnBtnAddSiteShow(val){
      console.log(val);
      this.addSiteForm.regionName = val.name;
      this.diaState.diaAddSite = true;
    },

    /*区域站点 B 关闭*/
    FnCloseAddSite(){

    },

    /*区域站点 C 保存 */
    FnBtnSaveAddSite(){

    },

    /*添加 站点 显示*/
    FnBtnAddShow(){
      this.diaState.diaAddCountry = true;
      this.diaState.submitType='add';
      // this.$refs['RefAddForm'].resetFields();
    },

    /* 添加 取消  */
    FnCloseAdd() {
      this.GLOBAL.btnStateChange(this, 'btnState', 'btnCancel');
      console.log(this.addForm);
      this.$refs['RefAddForm'].resetFields();
    },

  },
  created() {

  },
}
</script>
<style lang="scss">
  .site-item{
    display: flex;
    height: 42px !important;
    line-height: 42px !important;
    padding: 0 0 0 30px !important;
    &:hover{
      background-color: #f4f4f4;
      cursor: pointer;
    }
    span{
      //border: solid 1px red;
      flex: 1;
    }
    .site-dropdown{
      text-align: right;
      flex: 1;
      i{
        width: 80px;
        display: inline-block;
        padding: 6px 0;
        text-align: right;
      }
    }
  }


  .organizeL-box{
    .is-opened .el-submenu__title{
      //border-left: solid 2px #005ad4;
    }
  }

</style>