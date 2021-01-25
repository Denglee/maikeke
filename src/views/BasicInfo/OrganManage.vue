<template>
  <div class="public-main">

    <el-form :model="departmentForm"  ref="RefAddForm" label-width="86px" class="public-form">
      <el-form-item label="部门名称：" prop="storeName">
        <el-input type="text" v-model="departmentForm.storeName" autocomplete="off" clearable placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="storeState">
        <el-select  v-model="departmentForm.storeState" filterable multiple clearable>
          <el-option v-for="( item, index ) in stateArr" :key="index"
                     :label="item.value"
                     :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-button icon="el-icon-circle-plus-outline" :loading="btnState.btnSearch" @click="FnBtnSearch" class="public-btn">查询</el-button>

      <div class="formR-main">
        <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnState.btnAdd" class="public-btn">新增部门</el-button>
      </div>
    </el-form>

    <el-table class="public-table" border
              :data="tableArr"
              ref="refTable"
              height="600"
              row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="rank" label="组织机构层级"></el-table-column>
      <el-table-column prop="charger" label="部门负责人"></el-table-column>
      <el-table-column prop="tel" label="电话"></el-table-column>
      <el-table-column prop="people" label="人数"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="btn('scope.row')">
            编辑<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "OrganManage",
  data(){
    return{
      btnState:{
        btnSearch:false,
        btnAdd:false,
      },
      departmentForm:{
        storeName:'',
        storeState:'',
      },
      stateArr:[
        {
          name:'部门1',
          value:'bumen1',
        }
      ],

      tableArr:[
        {
          id:1,
          rank:'唛壳科技',
          charger:'王先生',
          tel:'13454554741',
          people:'1',
          state:'1',
          remarks:'公司描述，备注',
          children: [
            {
              id:11,
              rank:'业务部',
              charger:'李先生',
              tel:'17654554741',
              people:'2',
              state:'2',
              remarks:'部门描述，备注',
              children: [
                {
                  id:111,
                  rank:'业务一部',
                  charger:'孙小姐',
                  tel:'18654554741',
                  people:'2',
                  state:'2',
                  remarks:'组员描述，备注',
                },
              ],
            },
          ],

        },
      ]
    }
  },
  methods:{
    btn(){

    },
    FnBtnAdd(){

    },
    FnBtnSearch(){

    },
  },
  created(){

  },
}
</script>
