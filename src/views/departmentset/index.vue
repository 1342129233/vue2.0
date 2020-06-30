<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>企业管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/businessmanagement/departmentset">部门设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow='always' class='marT20'>
      <el-form>
        <el-form-item label='部门名称' label-width='70px' class='from-item-marb0'>
          <el-input label='部门名称' :style="{width: '200px'}" class='input-focus' v-model="keyword"/>
          <el-button class='primary-btn' icon="el-icon-search" @click="sift">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow='always' class='marT20'>
      <div slot="header" class="clearfix">
        <el-breadcrumb class='inline_flex'>
          <el-breadcrumb-item>部门列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button class='primary-btn' @click="openDialog({row: null,tit: ''})">添加部门</el-button>
      </div>
      <el-table :data="newdepartmentList" row-key="did" :header-cell-style="{backgroundColor: '#F5F7FA'}">
        <el-table-column prop='name' label='部门名称' header-align='center'></el-table-column>
        <el-table-column prop='child_count' label='下级部门（个）' align='center'></el-table-column>
        <el-table-column prop='' label='操作' align='center' width='200px'>
          <template slot-scope="scope">
            <el-dropdown size="mini" split-button class='dropdown-btn' @click="openDialog({row: scope.row, tit: 'addChildDepartment'})"
            @command="handleCommand">添加下级部门
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{tit: 'departmentInfoRevise', scopeRow: scope.row}">部门信息修改</el-dropdown-item>
                <el-dropdown-item :command="{tit: 'workCategorySet', scopeRow: scope.row}">工种岗位设置</el-dropdown-item>
                <el-dropdown-item :command="{tit: 'deleteCurrentDepartment', scopeRow: scope.row}">删除当前部门</el-dropdown-item>
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
    <Deptproocc 
      :outerVisible="outerVisible" 
      :FproCheckedId="proCheckedId"
      :FoccCheckedId="occCheckedId"
      @closeDeptproocc="closeDeptproocc" 
      :tabRadio="['dept','pro','occ','person']"></Deptproocc>
      <!-- <Deptworkjobper 
        :outerVisible="outerVisible"
        @closeOuterDialog="closeOuterDialog"
        :tabRadio="['dept','pro','occ','person']"
        :deptCheckItemProp.sync="deptCheckItemProp"
        @upDeptCheckItemProp="upDeptCheckItemProp"/> -->
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
      // deptCheckItemProp: [],

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
      occCheckedId: []
    }
  },
  methods: {
    ...mapActions(['getDepartmentList', 'addDepartment', 'reviseDepartmentInfo', 'deleteDepartment', 'setProOcc']),
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
            this.getDepartmentList().then(({data}) => {
              this.newdepartmentList = data
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
      departmentList: state => state.department.departmentList
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
  // .el-form-item
  //   margin 0
  .inline_flex
    display inline-flex

  .el-dropdown-menu__item:hover
    color #38A28A
    border-color #38A28A
</style>