<!-- 部门工种岗位人员组件 -->
<!-- 
必传属性：
  outerVisible：false（默认）控制本组件显示隐藏配合closeOuterDialog使用
必传事件：
  closeOuterDialog：通过父组件来实现显示隐藏
-->
<template>
  <div class="deptworkjobper">
    <!-- 外部dialog -->
    <el-dialog :visible.sync="outerVisible" :show-close="false">
      <!-- 设置模版 -->
      <el-row :gutter="53" class="marB20">
        <el-col :span="18">
          <el-select
            v-model="deptWorkJobTemValue"
            filterable
            allow-create
            placeholder='请选择模版'
            class="select-color"
            popper-class="select-options-color">
            <el-option key='' label="请选择模版" value=""></el-option>
            <el-option
              v-for="item in deptWorkJobTemList"
              :key="item.id"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button class="default-btn">保存模版</el-button>
          <el-button type="danger">删除模版</el-button>
        </el-col>
      </el-row>
      <!-- 部门/工种/岗位/人员 radio -->
      <el-radio-group v-model="tabRadioCurrentValue" class='marB20 radio-color'>
        <el-radio-button label="dept" v-if="tabRadio.includes('dept')">部门</el-radio-button>
        <el-radio-button label="pro" v-if="tabRadio.includes('pro')">工种</el-radio-button>
        <el-radio-button label="occ" v-if="tabRadio.includes('occ')">岗位</el-radio-button>
        <el-radio-button label="person" v-if="tabRadio.includes('person')">人员</el-radio-button>
      </el-radio-group>
      <!-- 部门content -->
      <el-tabs v-model="defaultDeptTabsValue" type="border-card" @tab-click="handleDeptTabsClick" class="tab-color" v-show="tabRadioCurrentValue === 'dept'">
        <el-tab-pane v-for="items in deptTabs" :label="items.name" :name="items.id" :key="items.id" :pid="items.pid">
          <el-row>
            <el-button type="text" class="text-btn marL10">取消全选</el-button>
            <el-button type="text" class="text-btn">全选</el-button>
          </el-row>
          <el-badge v-for="item in items.children" :key="item.id" :value="0" :max="99" class="item">
            <el-button size='mini' :class="deptCheckedId.includes(item.id)?'default-btn default-btn-active':'default-btn'" @click="deptIsChecked(item)">{{item.name}}</el-button>
          </el-badge>
        </el-tab-pane>
      </el-tabs>
      <!-- 外部dialog footer -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeOuterDialog(false)" class='default-btn'>取 消</el-button>
        <el-button type="primary" @click="closeOuterDialog(true)" class='primary-btn'>确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'deptworkjobper', // 组件name
  props: {
    // 组件visible
    outerVisible: {
      type: Boolean,
      default: false
    },
    // show 部门/工种/岗位/人员
    tabRadio: {
      type: Array,
      default: ['dept', 'pro', 'occ', 'person']
    }
    // 父组件传过来的deptCheckItem
    // deptCheckItemProp: {
    //   type: Array,
    //   default: []
    // }
  },
  data() {
    return {
      deptWorkJobTemList: [], // 模版列表
      deptWorkJobTemValue: '', // 选中模版value
      tabRadioCurrentValue: this.tabRadio[0], // 当前tabRadio
      defaultDeptTabsValue: '0', // 默认选中deptTabs
      // 部门tabs
      deptTabs: [
        {
          name: '全部',
          id: '0',
          children: [],
          pid: '-1'
        }
      ],
      deptCheckedId: [] // 部门选中id
    }
  },
  watch: {
    // 初始化dept tabs列表
    dept(newDept) {
      this.deptTabs[0].children = newDept
    }
    // 初始化部门选中item及tabs列表
    // deptCheckItemProp: {
    //   handler(newDeptCheckItem) {
    //     this.deptCheckId = []
    //     newDeptCheckItem.map(item => {
    //       this.deptCheckId.push(item.id)
    //     })
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  methods: {
    ...mapActions(['getDeptProOccList']),
    // 关闭dialog，点击确定要通过父组件将outerVisible设置为false来关闭，否则不关闭
    closeOuterDialog(boo) {
      let objParams = {
        outerVisible: boo
      }
      this.$emit('closeOuterDialog', objParams)
    },
    // 部门级别切换
    handleDeptTabsClick(tab, event) {
      this.deptTabs.map((item, ind) => {
        if(ind > tab.index) {
          this.deptTabs.splice(ind, this.deptTabs.length)
        }
      })
    },
    // 部门选中
    deptIsChecked(checkItem) {
      if(checkItem.children && checkItem.children.length) {
        let isDeptTabs = this.deptTabs.map(item => item.id !== checkItem.id ? 'true' : 'false')
        if(!isDeptTabs.includes('false')) {
          let obj = {
            id: checkItem.id,
            name: checkItem.name,
            pid: checkItem.pid,
            path: checkItem.path
          }
          let isFalse = checkItem.children.map(tem => tem.id === checkItem.id ? 'true' : 'false')
          if(!isFalse.includes('true')) {
            checkItem.children.unshift(obj)
          }
          this.deptTabs.push(checkItem)
        }
        this.defaultDeptTabsValue = checkItem.id
      }else{
        // this.$emit('upDeptCheckItemProp', checkItem)
        if(this.deptCheckedId.includes(checkItem.id)) {
          this.deptCheckedId.map((item, ind) => {
            if(item === checkItem.id) {
              this.deptCheckedId.splice(ind, 1)
              this.tagDeptList.map(item => {
                if(checkItem.pid === item.id) {
                  if(item.num) {
                    item.num -= 1
                  }else{
                    item.num = ''
                  }
                }
              })
            }
          })
        }else{
          this.deptCheckedId.push(checkItem.id)
          this.tagDeptList.map(item => {
            if(checkItem.pid === item.id) {
              if(item.num) {
                item.num += 1
              }else{
                item.num = 1
              }
            }
          })
        }
      }
    },
    // 调取部门/工种/岗位列表
    init() {
      this.getDeptProOccList(this.tabRadio)
    }
  },
  computed: {
    ...mapState({
      dept: state => state.common.deptProOccList.dept
    })
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="stylus" scoped>
.deptworkjobper >>> .el-dialog
  width 1040px
.deptworkjobper >>> .el-radio-button__inner
  width 250px
.deptworkjobper >>> .el-dialog__body
  padding-top 0
.el-button--text
  color #38A28A
  float right
.el-badge
  margin 5px 25px 5px 0
</style>