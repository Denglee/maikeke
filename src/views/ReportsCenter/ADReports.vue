<template>
  <div class="tabs-main">
    <el-tabs :tab-position="tabPosition" id="tabs-message" v-model="tabActiveName" @tab-click="FnChangeTab">
      <el-tab-pane lazy label="SP-广告活动" name="name1">
        <!--中间部分-->
        <div class="tab-content">
          <el-form class="public-form">
            <el-select v-model="formData.projectName" filterable multiple clearable collapse-tags
                       popper-class="elSelect-checkbox" class="public-select" @change='chooseProject($event)'>
              <el-option v-for="(item, index) in projectArr"
                         :key="index"
                         :value="item.name"
                         :label="item.value">
                <span class="check"></span>
                <span style="margin-left: 8px">{{ item.value }}</span>
              </el-option>
            </el-select>

            <el-date-picker
                class="public-datePicker"
                v-model="formData.order_time"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
            </el-date-picker>

            <!--搜索-->
            <el-button icon="el-icon-search" @click="FnSearchShop" :loading="btnState.btnSearchLoad" class="public-btn">
              搜索
            </el-button>

            <!--设置-->
            <el-popover
                placement="bottom"
                width="400"
                trigger="manual"
                v-model="diaState.diaShowPopSet"
                label-width='180px'>
              <el-form class="public-form" :model="setForm">

                <el-form-item label="展示量">
                  <div class="public-selInp">
                    <el-select placeholder="请选择" v-model="setForm.shopType">
                      <el-option v-for="(item,index) in symbolArr" :key="index"
                                 :value="item.value"
                                 :label="item.label">
                      </el-option>
                    </el-select>
                    <el-input placeholder="请输入" autocomplete="off" v-model="setForm.shopNum" clearable></el-input>
                  </div>
                </el-form-item>

                <el-form-item label="点击量">
                  <div class="public-selInp">
                    <el-select placeholder="请选择" v-model="setForm.clickType">
                      <el-option v-for="(item,index) in symbolArr" :key="index"
                                 :value="item.value"
                                 :label="item.label"></el-option>
                    </el-select>
                    <el-input placeholder="请输入" autocomplete="off" v-model="setForm.clickNum" clearable></el-input>
                  </div>
                </el-form-item>

                <div class="formR-main">
                  <el-button type="primary" class="public-btn" :loading="btnState.btnAddRankMonit"
                             @click="diaState.diaShowPopSet = false">取消
                  </el-button>
                  <el-button type="primary" class="public-btn" :loading="btnState.btnAddRankMonit"
                             @click="FnBtnSaveSet">保存
                  </el-button>
                </div>

              </el-form>

              <el-button slot="reference" @click="diaState.diaShowPopSet = !diaState.diaShowPopSet"
                         class="btn-set" icon="el-icon-setting"></el-button>

            </el-popover>

          </el-form>

          <!-- 表格-->
          <el-table class="public-table" border
                    :data="tableStaff"
                    ref="multipleTable">
            <el-table-column prop="store" label="店铺"></el-table-column>
            <el-table-column prop="country" label="国家"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="active" label="广告活动" sortable></el-table-column>
            <el-table-column prop="day" label="日期">
              <template slot-scope="{row}">
                <div class="status-connect">{{ row.time | dateFormat }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="shopNum" label="展示量" sortable></el-table-column>
            <el-table-column prop="clickNum" label="点击量"></el-table-column>
            <el-table-column prop="CTR" label="CTR" sortable>
              <template slot-scope="{row}" slot="header">
                <el-tooltip placement="top">
                  <span class='tr-tooltip'>次品量/不可售量 <i class="el-icon-question"></i></span>
                  <div slot="content">
                    <div>点击率=点击量/展示量。</div>
                    <div>注意：一旦识别出无效点击，系统最多会在 3 天内从您的支出统计数据中删除这些点击记录。
                      日期范围（含过去 3 天内的支出）可能因点击和支出失效而有所调整。
                    </div>
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="money" label="花费"></el-table-column>

          </el-table>

          <el-pagination
              background
              layout="total, prev, pager,next, sizes, jumper"
              :page-sizes="[10, 20, 50, 100]"
              :current-page="pageArr.pageNum"
              :total="pageArr.total"
              :page-size="pageArr.pageSize"
              @size-change='sizeChange'
              @current-change="PageCurrent">
          </el-pagination>
        </div>

      </el-tab-pane>

      <el-tab-pane lazy label="SP-广告组" name="name2">

      </el-tab-pane>

      <el-tab-pane lazy label="SP-推广的商品" name="name3">
<!--        <tinymce ref="editor"-->
<!--                 style="max-width: 80%;"-->
<!--                 v-model="user_des"-->
<!--                 :disabled="disabled"-->
<!--                 @onClick="onClick">-->
<!--        </tinymce>-->
<!--        <el-button @click="btnTinmyce">保存</el-button>-->

        <VueTinymce
            v-model="content"
            :setup="setup"
            :setting="setting" />

      </el-tab-pane>

      <el-tab-pane lazy label="SP-投放报表" name="name4">

      </el-tab-pane>

      <el-tab-pane lazy label="SP-搜索词" name="name5">

      </el-tab-pane>

      <el-tab-pane lazy label="SP-广告位" name="name6">

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import tinymce from "@/components/tinymce/tinymce";

import VueTinymce from "@packy-tang/vue-tinymce"
export default {
  name: "ADReports",
  inject: ['reLoad'],
  components:{ tinymce, VueTinymce},
  data() {
    return {
      disabled: false,
      user_des:'',
      // content: '<h1 style="text-align: center;">长恨歌</h1><p style="text-align: center;">汉皇重色思倾国，御宇多年求不得。<br />杨家有女初长成，养在深闺人未识。<br />天生丽质难自弃，一朝选在君王侧。<br />回眸一笑百媚生，六宫粉黛无颜色。<br />春寒赐浴华清池，温泉水滑洗凝脂。<br />侍儿扶起娇无力，始是新承恩泽时。<br />云鬓花颜金步摇，芙蓉帐暖度春宵。<br />春宵苦短日高起，从此君王不早朝。<br />承欢侍宴无闲暇，春从春游夜专夜。<br />后宫佳丽三千人，三千宠爱在一身。<br />金屋妆成娇侍夜，玉楼宴罢醉和春。<br />姊妹弟兄皆列土，可怜光彩生门户。<br />遂令天下父母心，不重生男重生女。<br />骊宫高处入青云，仙乐风飘处处闻。<br />缓歌慢舞凝丝竹，尽日君王看不足。<br />渔阳鼙鼓动地来，惊破霓裳羽衣曲。</p><p style="text-align: center;">九重城阙烟尘生，千乘万骑西南行。<br />翠华摇摇行复止，西出都门百余里。<br />六军不发无奈何，宛转蛾眉马前死。<br />花钿委地无人收，翠翘金雀玉搔头。<br />君王掩面救不得，回看血泪相和流。<br />黄埃散漫风萧索，云栈萦纡登剑阁。<br />峨嵋山下少人行，旌旗无光日色薄。<br />蜀江水碧蜀山青，圣主朝朝暮暮情。<br />行宫见月伤心色，夜雨闻铃肠断声。<br />天旋日转回龙驭，到此踌躇不能去。<br />马嵬坡下泥土中，不见玉颜空死处。<br />君臣相顾尽沾衣，东望都门信马归。<br />归来池苑皆依旧，太液芙蓉未央柳。<br />芙蓉如面柳如眉，对此如何不泪垂。<br />春风桃李花开夜，秋雨梧桐叶落时。<br />西宫南苑多秋草，落叶满阶红不扫。<br />梨园弟子白发新，椒房阿监青娥老。<br />夕殿萤飞思悄然，孤灯挑尽未成眠。<br />迟迟钟鼓初长夜，耿耿星河欲曙天。<br />鸳鸯瓦冷霜华重，翡翠衾寒谁与共。<br />悠悠生死别经年，魂魄不曾来入梦。</p><p style="text-align: center;">临邛道士鸿都客，能以精诚致魂魄。<br />为感君王辗转思，遂教方士殷勤觅。<br />排空驭气奔如电，升天入地求之遍。<br />上穷碧落下黄泉，两处茫茫皆不见。<br />忽闻海上有仙山，山在虚无缥缈间。<br />楼阁玲珑五云起，其中绰约多仙子。<br />中有一人字太真，雪肤花貌参差是。<br />金阙西厢叩玉扃，转教小玉报双成。<br />闻道汉家天子使，九华帐里梦魂惊。<br />揽衣推枕起徘徊，珠箔银屏迤逦开。<br />云鬓半偏新睡觉，花冠不整下堂来。</p><p style="text-align: center;">风吹仙袂飘飖举，犹似霓裳羽衣舞。<br />玉容寂寞泪阑干，梨花一枝春带雨。<br />含情凝睇谢君王，一别音容两渺茫。<br />昭阳殿里恩爱绝，蓬莱宫中日月长。<br />回头下望人寰处，不见长安见尘雾。<br />惟将旧物表深情，钿合金钗寄将去。<br />钗留一股合一扇，钗擘黄金合分钿。<br />但令心似金钿坚，天上人间会相见。</p><p style="text-align: center;">临别殷勤重寄词，词中有誓两心知。<br />七月七日长生殿，夜半无人私语时。<br />在天愿作比翼鸟，在地愿为连理枝。<br />天长地久有时尽，此恨绵绵无绝期。</p>',
      // setting: {
      //   menubar: false,
      //   toolbar: "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
      //   toolbar_drawer: "sliding",
      //   quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
      //   plugins: "link image media table lists fullscreen quickbars",
      //   language: 'zh_CN', //本地化设置
      //   height: 350
      // },

      content: "<p>html content</p>",
      setting: {
        height: 500
      },

      tabPosition: 'left',
      tabActiveName: 'name3',
      formData: {
        projectName: '',
        order_time: '',
      },
      pageArr: {
        pageNum:1,
        total:110,
        pageSize:10,
      },
      setForm: {
        shopType: '',
        shopNum: '',
        clickType: '',
        clickNum: '',
      },
      diaState: {
        diaShowPopSet: false,
      },
      btnState: {
        btnSearchLoad: false,
      },
      symbolArr: [
        {
          value: '1',
          label: '>',
        }, {
          value: '2',
          label: '=',
        }, {
          value: '3',
          label: '<',
        }
      ],

      tableStaff: [
        {
          store:'店铺1',
          country:0,
          type:0,
          active:'JR1 jump rope',
          day:'1608538812',
          shopNum:1923,
          clickNum:139,
          CTR:'7.23%',
          money:'$202.84',
        },
        {
          store:'店铺2',
          country:0,
          type:0,
          active:'JR1 jump rope自动',
          day:'1608538812',
          shopNum:3074,
          clickNum:37,
          CTR:'1.23%',
          money:'$22.84',
        },
      ],
      projectArr: [
        {
          name: 'shop1',
          value: '店铺1',
        },
        {
          name: 'shop2',
          value: '店铺2',
        },
        {
          name: 'shop3',
          value: '店铺3',
        },
        {
          name: 'shop4',
          value: '店铺4',
        }
      ],

      checkedRows: [],  //选中的值

    }
  },
  methods: {
    setup(editor) {
      console.log(editor)
    },


    /*页面刷新*/
    FnRefresh() {
      // this.reLoad();
      // window.location.href="http://localhost:8282/ ";
    },

    /*tab 切换点击事件  */
    FnChangeTab(tab, e) {
      console.log(tab);
    },

    chooseProject(val) {
      console.log(val);
    },

    /* 1.10、 编辑选中 */
    checkedStaff(val) {
      console.log(val);
      this.checkedRows = val;
    },

    //点击行触发，选中或不选中复选框
    handleRowClick(row, column, event) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    /*搜索*/
    FnSearchShop() {
      console.log(this.formData);
      this.GLOBAL.btnStateChange(this, 'btnState', 'btnSearchLoad');
    },

    /*保存设置*/
    FnBtnSaveSet() {
      // this.btnState.btnSaveSet = true;
      console.log(this.setForm);
    },

    /*分页 */
    PageCurrent(page) {
      console.log(page);
      // this.staffPage = page;
      // this.getStaffIndex();
    },
    sizeChange(size) {
      console.log(size);
    },


    // 鼠标单击的事件
    onClick (e, editor) {
    },
    // 清空内容
    clear () {
      this.$refs.editor.clear()
    },


    btnTinmyce(){
      console.log(this.user_des);
    },
  },
  created() {
    // this.addNum();
  },

}
</script>
