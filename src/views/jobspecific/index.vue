<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>企业管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/businessmanagement/jobspecific">岗位设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow='always' class='marT20'>
      <div slot="header" class="clearfix">
        <el-breadcrumb class='inline_flex'>
          <el-breadcrumb-item>岗位列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button class='primary-btn' @click="openDialog(null)">添加岗位</el-button>
      </div>
      <el-table :data="newWorkcategoryList" row-key="id" :header-cell-style="{backgroundColor: '#F5F7FA'}">
        <el-table-column prop='name' label='岗位名称' align='center'></el-table-column>
        <el-table-column prop='des' label='岗位简介' align='center'></el-table-column>
        <el-table-column prop='' label='操作' align='center' width='200px'>
          <template slot-scope="scope">
            <el-button type="text" class="text-btn" @click="openDialog(scope.row)">修改</el-button>
            <el-button type="text" class="error-text-btn" @click="isDeleteCurrentOcc(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="dialogTit" :visible.sync="dialogFormVisible">
      <el-form :model="occupationInfo">
        <el-form-item label="工种名称" label-width="120px">
          <el-input v-model="occupationInfo.name" :style="{width: '400px'}" class='input-focus'></el-input>
        </el-form-item>
        <el-form-item label="工种简介" label-width="120px">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="occupationInfo.des"
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
  </div>
</template>
<script>
export default {
  name: 'jobspecific',
  data() {
    return {
      newWorkcategoryList: [
        {name: 'lalla', des: 'sajisn', id: '0'}
      ],
      dialogFormVisible: false,
      dialogTit: '添加岗位',
      occupationInfo: {
        id: '',
        name: '',
        des: ''
      },
      addLoading: false,
      isRevise: false
    }
  },
  methods: {
    // ...mapActions(['getProfessionList'])
    openDialog(row) {
      this.dialogFormVisible = true
      this.occupationInfo = {
        name: '',
        des: '',
        id: ''
      }
      if(row) {
        this.isRevise = true
        this.occupationInfo = {
          name: row.name,
          des: row.des,
          id: row.id
        }
      }else{
        this.isRevise = false
      }
    },
    closeDialog(boo) {
      this.dialogFormVisible = false
    },
    isDeleteCurrentOcc(scopeRow) {
      this.$confirm(`您确定要删除<${scopeRow.name}>吗`, '提示', {
        type: 'warning',
        cancelButtonClass: 'default-btn',
        confirmButtonClass: 'error-btn',
        confirmButtonText: '删除'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted() {
    // this.getProfessionList()
  }
}
</script>
<style lang="stylus" scoped>
  .inline_flex
    display inline-flex
</style>