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
    <el-dialog :visible="outerVisible" :show-close="false">
      <!-- 设置模版 -->
      <!-- <el-row :gutter="53" class="marB20">
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
      </el-row> -->
      <!-- 部门/工种/岗位/人员 radio -->
      <el-radio-group v-model="tabRadioCurrentValue" class='marB20 radio-color'>
        <el-radio-button label="dept" v-if="tabRadio.includes('dept')">部门</el-radio-button>
        <el-radio-button label="pro" v-if="tabRadio.includes('pro')">工种</el-radio-button>
        <el-radio-button label="occ" v-if="tabRadio.includes('occ')">岗位</el-radio-button>
        <el-radio-button label="person" v-if="tabRadio.includes('person')">人员</el-radio-button>
      </el-radio-group>
      <!-- 部门content -->
      <el-tabs v-model="defaultDeptTabsValue" type="border-card" @tab-click="handleDeptTabsClickdept" class="tab-color" v-show="tabRadioCurrentValue === 'dept'" @tab-remove="removeTab">
        <el-tab-pane v-for="items in deptTabs" :label="items.name" :name="items.id" :key="items.id" :pid="items.pid">
          <!-- 数据 -->
          <span v-for="item in items.children" :key="item.id" >
            <el-button style="margin: 5px" :type="item.id == tableData.didId?'danger':''" @click="deptClick(item)">{{item.name}}</el-button>
          </span>
        </el-tab-pane>
      </el-tabs>
      <!-- 字母 -->
      <el-menu mode="horizontal" background-color="#F5F7FA" active-text-color="#38A28A" @select="handleSelect"
      :default-active="PYDefaultValue" v-if="tabRadioCurrentValue === 'pro' || tabRadioCurrentValue === 'occ'">
        <el-menu-item v-for="item in PYArr" :key="item.index" :index="item.index">{{item.text}}</el-menu-item>
        <!-- <el-menu-item index="0">所有</el-menu-item>
        <el-menu-item index="1">AB</el-menu-item>
        <el-menu-item index="2">CD</el-menu-item>
        <el-menu-item index="3">EFG</el-menu-item>
        <el-menu-item index="4">HJ</el-menu-item>
        <el-menu-item index="5">KL</el-menu-item>
        <el-menu-item index="6">MNO</el-menu-item>
        <el-menu-item index="7">PQR</el-menu-item>
        <el-menu-item index="8">STW</el-menu-item>
        <el-menu-item index="9">XYZ</el-menu-item>
        <el-menu-item index="#">#</el-menu-item> -->
      </el-menu>
      <!-- 工种content -->
      <el-tabs type="border-card" class="tab-color" v-show="tabRadioCurrentValue === 'pro'">
        <el-row>
          <el-button type="text" class="text-btn marL10" @click="ispidcontent">取消全选</el-button>
          <el-button type="text" class="text-btn" @click="pidcontent">全选</el-button>
        </el-row>
        <!-- 数据 -->
        <!-- <el-badge v-for="item in items.children" :key="item.id" :value="0" :max="99" class="item">
          <el-button size='mini' :class="deptCheckedId.includes(item.id)?'default-btn default-btn-active':'default-btn'" @click="deptIsChecked(item)">{{item.name}}</el-button>
        </el-badge> -->
        <span v-for="item in newProfession" :key="item.id" >
          <el-button style="margin: 5px" :type="tableData.pidArrs.indexOf(item.cid) != -1?'danger':''" @click="proClick(item.cid)">{{item.name}}</el-button>
        </span>
      </el-tabs>
      <!-- 岗位content -->
      <el-tabs type="border-card" class="tab-color" v-show="tabRadioCurrentValue === 'occ'">
        <el-row>
          <el-button type="text" class="text-btn marL10" @click="isgidcontent">取消全选</el-button>
          <el-button type="text" class="text-btn" @click="gidcontent">全选</el-button>
        </el-row>
        <!-- 数据 -->
        <span v-for="item in newOccupation" :key="item.id" >
          <el-button style="margin: 5px" :type="tableData.gidArrs.indexOf(item.cid) != -1?'danger':''" @click="occClick(item.cid)">{{item.name}}</el-button>
        </span>
      </el-tabs>
      <!-- 外部dialog footer -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeOuterDialog(false)" class='default-btn'>取 消</el-button>
        <el-button type="primary" @click="closeOuterDialog(false);handleConfirmUseLayoutBtn()" class='primary-btn'>确定</el-button>
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
      default: ['dept', 'pro', 'occ']
    },
    // 传过来点击当前条信息
    tableData: {
      type: Object,
      default: {}
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
      tabRadioCurrentValue: this.tabRadio[1], // 当前tabRadio
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
      // 工种tabs
      proTabs: [
        // {
        //   name: '全部',
        //   id: '0',
        //   children: [],
        //   pid: '-1'
        // }
      ],
      // 岗位tabs
      occTabs: [
        // {
        //   name: '全部',
        //   id: '0',
        //   children: [],
        //   pid: '-1'
        // }
      ],
      deptCheckedId: [], // 部门选中id
      // 提交的
      tijiao: {
        id: '',
        did: '',
        gid: [],
        pid: []
      },
      PYArr: [
        {index: '0', text: '全部'},
        {index: '1', text: 'AB'},
        {index: '2', text: 'CD'},
        {index: '3', text: 'EFG'},
        {index: '4', text: 'HJ'},
        {index: '5', text: 'KL'},
        {index: '6', text: 'MNO'},
        {index: '7', text: 'PQR'},
        {index: '8', text: 'STW'},
        {index: '9', text: 'XYZ'},
        {index: '#', text: '#'}
      ],
      PYDefaultValue: '0',
      newProfession: [], // 新的工种列表
      newOccupation: [], // 新的岗位列表
      selectionList: [],
      PYObj: {
        '0': {arr: ['*'], text: '全部'},
        '1': {arr: ['A', 'B'], text: 'AB'},
        '2': {arr: ['C', 'D'], text: 'CD'},
        '3': {arr: ['E', 'F', 'G'], text: 'EFG'},
        '4': {arr: ['H', 'J'], text: 'HJ'},
        '5': {arr: ['K', 'L'], text: 'KL'},
        '6': {arr: ['M', 'N', 'O'], text: 'MNO'},
        '7': {arr: ['P', 'Q', 'R'], text: 'PQR'},
        '8': {arr: ['S', 'T', 'W'], text: 'STW'},
        '9': {arr: ['X', 'Y', 'Z'], text: 'XYZ'},
        '#': {arr: ['#'], text: '#'}
      }
    }
  },
  watch: {
    // 初始化dept tabs列表 部门
    dept(newDept) {
      this.deptTabs[0].children = newDept.dept
      // this.proTabs = newDept.profession
      // this.occTabs = newDept.occupation
      // console.log(this.proTabs[0].children)
      // console.log(this.deptTabs[0].children.dept)
      // console.log(this.deptTabs[0].children.profession)
      // console.log(this.deptTabs[0].children.occupation)
    },
    // tabRadioCurrentValue(newName) {
    //   this.tabRadioCurrentValue = newName
    // },
    // 切换工种部门岗位
    tabRadioCurrentValue(newTabRadioCurrentValue, oldTabRadioCurrentValue) {
      if(newTabRadioCurrentValue === 'pro' || newTabRadioCurrentValue === 'occ') {
        this.handleSelect(this.PYDefaultValue)
      }
    },
    // 监听传过来的数值
    tableData: {
      handler: function (newVal, oldVal) {
      },
      deep: true,
      // 代表开启深度监控。意思是数据的任何一个属性发生变化，监视函数需要执行
      immediate: true
      // 如果immediate 设置为true, 代表代码一加载 立马执行监视函数
    }
    // 岗位
    // occupation(newDept) {
    //   this.deptTabs[0].children = newDept
    // }
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
    ...mapActions(['getDeptProOccList', 'settinging']),
    // 关闭dialog，点击确定要通过父组件将outerVisible设置为false来关闭，否则不关闭
    closeOuterDialog(boo) {
      let objParams = {
        outerVisible: boo
      }
      this.$emit('closeOuterDialog', objParams)
    },
    handleSelect(key, keyPath) {
      this.PYDefaultValue = key
      this.newProfession = []
      this.newOccupation = []
      this.PYObj[key].arr.map(item => {
        if(this.tabRadioCurrentValue === 'pro') {
          this.profession.map(ite => {
            if(item === ite.pinyin) {
              this.newProfession.push(ite)
            }else if(item === '#' && !ite.pinyin) {
              this.newProfession.push(ite)
            }else if(item === '*') {
              this.newProfession = this.profession
            }
          })
        }else if(this.tabRadioCurrentValue === 'occ') {
          this.occupation.map(ite => {
            if(item === ite.pinyin) {
              this.newOccupation.push(ite)
            }else if(item === '#' && !ite.pinyin) {
              this.newOccupation.push(ite)
            }else if(item === '*') {
              this.newOccupation = this.occupation
            }
          })
        }
      })
    },
    // 部门级别切换
    handleDeptTabsClickdept(tab, event) {
      this.deptTabs.map((item, ind) => {
        if(ind > tab.index) {
          this.deptTabs.splice(ind, this.deptTabs.length)
        }
      })
    },
    // pid 全选
    pidcontent() {
      let professionPro = this.newProfession
      this.tableData.pidArrs = []
      for(let i = 0; i < professionPro.length; i++) {
        this.tableData.pidArrs.push(professionPro[i].cid)
        this.tijiao.pid.push(professionPro[i].cid)
      }
      this.tijiao.pid = [...new Set(this.tijiao.pid)]
    },
    // pid 全取消
    ispidcontent() {
      this.tableData.pidArrs = []
      this.tijiao.pid = []
    },
    // gid 全选
    gidcontent() {
      let occupationPro = this.newOccupation
      this.tableData.gidArrs = []
      for(let i = 0; i < occupationPro.length; i++) {
        this.tableData.gidArrs.push(occupationPro[i].cid)
        this.tijiao.gid.push(occupationPro[i].cid)
      }
      this.tijiao.gid = [...new Set(this.tijiao.gid)]
    },
    // gid 全取消
    isgidcontent() {
      this.tableData.gidArrs = []
      this.tijiao.gid = []
    },
    // 提交
    handleConfirmUseLayoutBtn() {
      this.settinging(this.tijiao).then(data => {
        let del = data.data.code
        if(del === 0) {
          this.$message({
            message: '恭喜你，修改成功',
            type: 'success'
          })
        }else{
          this.$message.error('错了哦，修改失败')
        }
      })
    },
    // 部门级别切换
    handleDeptTabsClick(tab, event) {
      // this.deptTabs.map((item, ind) => {
      //   if(ind > tab.index) {
      //     this.deptTabs.splice(ind, this.deptTabs.length)
      //   }
      // })
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
    // 循环
    // xunhuan(arr) {
    //   if(arr.children && arr.children.length) {
    //     this.xunhuan(arr.children)
    //   }else{
    //     this.tableData.didId = arr.id
    //     this.tijiao.did = arr.id
    //   }
    // },
    // 部门选中
    deptClick(checkItem) {
      if(checkItem.children && checkItem.children.length) {
        let obj = {
          name: checkItem.name,
          id: checkItem.id,
          children: checkItem.children,
          pid: checkItem.pid
        }
        let deptTabs = this.deptTabs
        let val = []
        deptTabs.forEach(item => {
          if(item.id === obj.id) {
            val.push('true')
          }else{
            val.push('false')
            // this.deptTabs.push(obj)
          }
        })
        let a = val.includes('true')
        if(!a) {
          this.deptTabs.push(obj)
          this.defaultDeptTabsValue = checkItem.id
        }
        // console.log(this.deptTabs)
      }else{
        this.tableData.didId = checkItem.id
        this.tijiao.did = checkItem.id
      }
    },
    // 移除
    removeTab(targetName) {
      let deptTabs = this.deptTabs
      for(let i = 0; i < deptTabs.length; i++) {
        if(deptTabs[i].id === targetName) {
          this.deptTabs.splice(i, 1)
          if(this.deptTabs.length <= 1) {
            this.defaultDeptTabsValue = '0'
          }else {
            this.defaultDeptTabsValue = deptTabs[i - 1].id
          }
        }
      }
    },
    proClick(name) {
      if(this.tableData.pidArrs.includes(name)) {
        let xia = this.tableData.pidArrs.indexOf(name)
        this.tableData.pidArrs.splice(xia, 1)
      }else{
        this.tableData.pidArrs.push(name)
      }
      this.tijiao.pid = this.tableData.pidArrs
    },
    occClick(name) {
      if(this.tableData.gidArrs.includes(name)) {
        let xia = this.tableData.gidArrs.indexOf(name)
        this.tableData.gidArrs.splice(xia, 1)
      }else{
        this.tableData.gidArrs.push(name)
      }
      this.tijiao.gid = this.tableData.gidArrs
    },
    // 调取部门/工种/岗位列表
    init() {
      this.getDeptProOccList(this.tabRadio).then(({data}) => {
        this.newProfession = data.profession
        this.newOccupation = data.occupation
      })
    }
  },
  computed: {
    ...mapState({
      // dept: state => state.common.deptProOccList.dept
      dept: state => state.common.deptProOccList,
      profession: state => state.common.deptProOccList.profession, // 工种列表
      occupation: state => state.common.deptProOccList.occupation  // 岗位列表
      // occupation: state => state.common.deptProOccList.occupation,
      // profession: state => state.common.deptProOccList.profession
    })
  },
  beforeMount() {
    this.tijiao.id = this.tableData.id
    this.tijiao.did = this.tableData.didId
    this.tijiao.pid = this.tableData.pidArrs
    this.tijiao.gid = this.tableData.gidArrs
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
