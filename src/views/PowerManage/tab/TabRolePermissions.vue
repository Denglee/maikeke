<template>
  <div>

    <el-table class="public-table" border
              :data="tableArr"
              ref="refTable">
      <el-table-column prop="menu" label="菜单模块"></el-table-column>
      <el-table-column prop="page" label="页面">
        <template slot-scope="scope">
          <el-checkbox-group
              v-model="checkedCities">
            <el-checkbox v-for="(city,index) in scope.row.page" :label="city.value" :key="index">{{ city.name }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
      <el-table-column prop="effect" label="功能项"></el-table-column>
      <el-table-column prop="data" label="数据权限"></el-table-column>
      <el-table-column prop="field" label="字段权限"></el-table-column>
    </el-table>

    <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址">
      </el-table-column>
    </el-table>


  </div>

</template>

<script>

export default {
  name: "RolePermissions",
  props: {
    checkID: {
      type: String,
    }
  },

  data() {
    return {
      checkedCities: [],

      tableArr: [
        {
          menu: 'sd',
          page: [
            {
              name: "增加",
              value: 'add',
            },
            {
              name: "修改",
              value: 'change',
            },
          ],
          effect: 'sd',
          data: 'sd',
          field: 'sd',
        },
      ],

      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              children: [
                {
                  id: 311,
                  date: '2016-05-01',
                  name: '王老老老虎',
                  address: '上海市普陀区金沙江路 1519 弄'
                },
              ]
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎速度速度',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
    }
  },
  methods: {},
  created() {

  },
}
</script>
