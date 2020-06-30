<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>企业管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/businessmanagement/personset">员工管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow='always' class='marT20'>
      <el-form :inline="true">
        <el-form-item label='部门选择' label-width='70px' class='from-item-marb0'>
          <el-input label='部门选择' :style="{width: '170px'}" class='input-focus' v-model="deptName" placeholder="请输入部门名称"/>
        </el-form-item>
        <el-form-item label='工种选择' label-width='70px' class='from-item-marb0'>
          <!-- <el-input label='工种选择' :style="{width: '170px'}" class='input-focus' v-model="pro"/> -->
          <el-select v-model="proId" 
              clearable placeholder="请选择工种" 
              class="select-color"
              popper-class="select-options-color">
            <el-option
              v-for="item in profession"
              :key="item.cid"
              :label="item.name"
              :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='岗位选择' label-width='70px' class='from-item-marb0'>
          <el-select v-model="occId" 
              clearable placeholder="请选择岗位" 
              class="select-color"
              popper-class="select-options-color">
            <el-option
              v-for="item in occupation"
              :key="item.cid"
              :label="item.name"
              :value="item.cid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='' label-width='70px' class='from-item-marb0'>
          <el-input :style="{width: '200px'}" class='input-focus' v-model="keyword" placeholder="请输入用户名/手机号/姓名"/>
        </el-form-item>
        <el-form-item class='from-item-marb0 fr marR0'>
          <el-button class='primary-btn' icon="el-icon-search" @click="sift">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow='always' class='marT20'>
      <div slot="header" class="clearfix">
        <el-breadcrumb class='inline_flex'>
          <el-breadcrumb-item>部门列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button class='primary-btn marL10' @click="openDialog({row: null,tit: ''})">添加员工</el-button>
        <el-button class='primary-btn'>批量导入员工</el-button>
      </div>
      <el-table :data="newdepartmentList" row-key="did" :header-cell-style="{backgroundColor: '#F5F7FA'}" max-height="400">
        <el-table-column prop='' label='头像' align='center' width="150">
          <template>
            <el-avatar shape="square" :size="50" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop='name' label='真实姓名' align='center' width="150"></el-table-column>
        <el-table-column prop='name' label='手机号' align='center' width="150"></el-table-column>
        <el-table-column prop='name' label='部门' align='center' width="150"></el-table-column>
        <el-table-column prop='name' label='工种' align='center' width="150"></el-table-column>
        <el-table-column prop='name' label='岗位' align='center' width="150"></el-table-column>
        <el-table-column prop='name' label='加入时间' align='center' width="150"></el-table-column>
        <el-table-column prop='' label='操作' align='center' width='200px' fixed="right">
          <template slot-scope="scope">
            <!-- <el-button type='text' class="text-btn">修改信息</el-button>
            <el-button type='text' class="text-btn">修改密码</el-button> -->
            <el-button type='text' class="text-btn" @click="openSetDeptProOccDialog">部门工种岗位设置</el-button>
            <el-button type='text' class="text-btn">分配岗位组</el-button>
            <!-- <el-button type='text' class="error-text-btn">删除员工</el-button> -->
            <el-dropdown trigger="click">
              <el-button type='text'>更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
              <el-dropdown-menu>
                <el-dropdown-item>修改信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>删除员工</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="dialogTit" :visible.sync="dialogFormVisible">
      <el-form :model="departmentInfo">
        <el-form-item label="部门名称" label-width="120px">
          <el-input v-model="departmentInfo.name" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="部门简介" label-width="120px">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="departmentInfo.des"
            :style="{width: '400px'}"
            class='input-focus'>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog(false)" class='default-btn'>取 消</el-button>
        <el-button type="primary" @click="closeDialog(true)" class='primary-btn' :loading="addLoading">{{isRevise?'修改':'添加'}}</el-button>
      </div>
    </el-dialog>
    <Deptworkjobper 
      :outerVisible="outerVisible" 
      :FproCheckedId="proCheckedId"
      :FoccCheckedId="occCheckedId"
      @closeDeptproocc="closeDeptproocc" 
      :tabRadio="['dept','pro','occ']"></Deptworkjobper>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Deptproocc from '../common/deptproocc.vue'
import Deptworkjobper from '../common/deptworkjobper'
export default {
  name: 'departmentset',
  components: {
    Deptproocc,
    Deptworkjobper
  },
  data() {
    return {
      newdepartmentList: [], // 部门列表数据
      dialogFormVisible: false, // dialog显示隐藏
      dialogTit: '添加部门', // dialog title
      addLoading: false, // 添加部门loading
      // 部门信息
      departmentInfo: {
        pid: 0,
        name: '',
        des: ''
      },
      keyword: '', // 搜索关键字
      isRevise: false, // 是否是修改部门信息
      outerVisible: false, // 子组件dialogVisible
      setProOccDid: '0', // 要设置的工种岗位部门id
      proCheckedId: [],
      occCheckedId: [],
      deptName: '',
      proId: '',
      occId: ''
    }
  },
  methods: {
    ...mapActions(['getDepartmentList', 'addDepartment', 'reviseDepartmentInfo', 'deleteDepartment', 'setProOcc']),
    openSetDeptProOccDialog() {
      this.outerVisible = true
    },
    // 弹出dialog
    openDialog({row, tit}) {
      this.dialogFormVisible = true
      if(tit === 'addChildDepartment') {
        this.dialogTit = '添加子部门'
        this.departmentInfo = {
          pid: row.did,
          name: '',
          des: ''
        }
      }else if(tit === 'departmentInfoRevise') {
        this.isRevise = true
        this.dialogTit = '修改部门信息'
        this.departmentInfo = {
          did: row.did,
          name: row.name,
          des: row.des
        }
      }else{
        this.dialogTit = '添加部门'
        this.departmentInfo = {
          pid: 0,
          name: '',
          des: ''
        }
      }
    },
    // 关闭dialog
    closeDialog(dialogFormVisible) {
      if(dialogFormVisible) {
        this.addLoading = true
        if(this.isRevise) {
          this.reviseDepartmentInfo(this.departmentInfo).then(({data}) => {
            this.dialogFormVisible = false
            this.addLoading = false
            this.getDepartmentList().then(({data}) => {
              this.newdepartmentList = data
            })
          }).catch(() => {
            this.dialogFormVisible = false
          })
        }else{
          this.addDepartment(this.departmentInfo).then(({data}) => {
            this.addLoading = false
            this.dialogFormVisible = false
            this.$message.success('添加成功')
            this.getDepartmentList().then(({data}) => {
              this.newdepartmentList = data
            })
          }).catch(() => {
            this.dialogFormVisible = false
          })
        }
      }else{
        this.dialogFormVisible = dialogFormVisible
        this.addLoading = false
      }
    },
    // 筛选
    sift() {
      let itemPath = []
      let newArrData = []
      this.siftChild(this.departmentList, itemPath)
      Array.from(new Set(itemPath))
      this.departmentList.map(item => {
        if(itemPath.includes(item.did)) {
          newArrData.push(item)
        }
      })
      this.newdepartmentList = newArrData
    },
    // 递归查找返回path
    siftChild(children, itemPath) {
      children.map((item, ind) => {
        if(item.name.indexOf(this.keyword) !== -1) {
          itemPath.push(item.path.split('|')[1])
        }else{
          if(item.children && item.children.length) {
            this.siftChild(item.children, itemPath)
          }else{
            return false
          }
        }
      })
    },
    // 下拉选中
    handleCommand({tit, scopeRow}) {
      switch(tit) {
        case 'departmentInfoRevise':
          this.openDialog({tit, row: scopeRow})
          break
        case 'workCategorySet':
          this.openDeptproocc(scopeRow)
          break
        case 'deleteCurrentDepartment':
          this.isDeleteCurrentDepartment(scopeRow)
          break
        default:
          return false
      }
    },
    // 打开子组件dialog
    openDeptproocc(scopeRow) {
      this.setProOccDid = scopeRow.did
      this.outerVisible = true
    },
    // 关闭子组件dialog
    closeDeptproocc(boo, obj) {
      let setProOccParams = {
        did: this.setProOccDid,
        workcid: obj.proCheckedId,
        postcid: obj.occCheckedId
      }
      if(boo) {
        this.setProOcc(setProOccParams).then(({data}) => {
          if(data.code) {
            this.$message({type: 'success', message: '工种岗位设置成功'})
          }else{
            this.$message({type: 'error', message: data.msg})
          }
        })
      }
      this.outerVisible = false
      this.proCheckedId = []
      this.occCheckedId = []
    },
    // 是否删除当前部门
    isDeleteCurrentDepartment(scopeRow) {
      this.$confirm(`您确定要删除<${scopeRow.name}>吗`, '提示', {
        type: 'warning',
        cancelButtonClass: 'default-btn',
        confirmButtonClass: 'error-btn',
        confirmButtonText: '删除'
      }).then(() => {
        this.deleteDepartment(scopeRow.did).then((data) => {
          if(data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }else{
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  computed: {
    ...mapState({
      departmentList: state => state.department.departmentList,
      profession: state => state.common.deptProOccList.profession,
      occupation: state => state.common.deptProOccList.occupation
    })
  },
  mounted() {
    this.getDepartmentList().then(({data}) => {
      this.newdepartmentList = data
    })
  }
}
</script>
<style lang="stylus" scoped>
  .inline_flex
    display inline-flex
  .fr
    float right
  .marR0
    margin-right 0px
  .el-dropdown-menu__item:hover
    color #38A28A
    border-color #38A28A
</style>