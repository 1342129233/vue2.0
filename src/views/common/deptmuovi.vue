<template>
  <div class="deptmuovi">
    <el-dialog title="移动部门" :visible.sync="dialogFormdeptmuovi" :before-close="handleClose">
      <el-tabs type="border-card">
        <span v-for="item in newdepartmentList" :key="item.did">
          <el-button style="margin: 5px" :type="tableButton.includes(item.did) ?'danger':''" @click="deptclick(item.did)">{{item.name}}</el-button>
        </span>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogmuovi(false)">取 消</el-button>
        <el-button type="primary" @click="isdialogFormdeptmuovi(false)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'deptmuovi',
  props: {
    dialogFormdeptmuovi: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newdepartmentList: [],  // 部门列表数据
      tableButton: ''  // 选中部门
    }
  },
  methods: {
    ...mapActions(['getDepartmentList']),
    deptclick(id) {
      if(this.tableButton.includes(id)) {
        this.tableButton = ''
      }else{
        this.tableButton = id
      }
    },
    isdialogFormdeptmuovi(val) {
      this.$emit('ismuovi', val)
    },
    dialogmuovi(val) {
      this.$emit('cismuovi', val)
    },
    handleClose() {
      this.$emit('ismuovi', false)
    }
  },
  beforeMount() {
    this.getDepartmentList().then(({data}) => {
      this.newdepartmentList = data
    })
  }
}
</script>
