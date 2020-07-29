<template>
  <div class="deptpost">
    <!-- 外层dialog -->
    <el-dialog :visible="deptpostVisible" :show-close="false">
      <!-- 设置模板 -->
      <el-row :gutter="53">
        <el-col :span="24">
          分配岗位组
        </el-col>
      </el-row>
      <el-tabs type="border-card">
        <span v-for="item in postNum" :key="item.id">
          <el-button style="margin: 5px" :type="tableButton.indexOf(item.id) != -1?'danger':''" @click="deptclick(item.id)">{{item.title}}</el-button>
        </span>
      </el-tabs>
      <!-- 外部dialog footer -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="ispostDialog(false)" class='default-btn'>取 消</el-button>
        <el-button type="primary" @click="postDialog(false)" class='primary-btn'>确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'deptpost',
  props: {
    deptpostVisible: {
      type: Boolean,
      default: true
    },
    // 传过来点击当前条信息
    tableData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      postNum: [],
      tableButton: []
    }
  },
  beforeMount() {
    this.setPostdeptzi()
  },
  methods: {
    ...mapActions(['setPostStaff', 'setPostdoStaff']),
    setPostdeptzi() {
      this.$on('setPostdept', (res) => {
        this.setPostStaff(res).then(data => {
          if(data.status === 200) {
            let database = data.data.data
            this.postNum = []
            for(let i = 0; i < database.length; i++) {
              this.$set(this.postNum, i, database[i])
            }
          }else {
            this.$message({type: 'warning', message: '请求失败'})
          }
        })
      })
    },
    // 关闭弹框
    ispostDialog(boo) {
      this.$emit('clospostrDialog', boo)
    },
    postDialog(boo) {
      let jurisdiction = {
        id: this.tableData.id,
        data: this.tableButton
      }
      this.setPostdoStaff(jurisdiction).then(data => {
        let dea = data.data
        if(dea.code === 0) {
          this.$message({type: 'success', message: dea.msg})
          this.tableButton = []
          this.$emit('clospostrDialog', boo)
        }
      })
    },
    deptclick(id) {
      if(this.tableButton.includes(id)) {
        let xia = this.tableButton.indexOf(id)
        this.tableButton.splice(xia, 1)
      }else{
        this.tableButton.push(id)
      }
    }
  }
}
</script>
