import {getDepartmentListRequest, addDepartmentRequest, reviseDepartmentInfoRequest, deleteDepartmentRequest, setProOccRequest} from '@/api/department'
const department = {
  state: {
    departmentList: []
  },
  mutations: {
    SAVE_DEPARTMENTLIST(state, departmentList) {
      state.departmentList = departmentList
    }
  },
  actions: {
    // 获取部门列表
    getDepartmentList({commit}) {
      return new Promise((resolve, reject) => {
        getDepartmentListRequest().then(({data}) => {
          commit('SAVE_DEPARTMENTLIST', data.data)
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 添加部门
    addDepartment(_, departmentInfo) {
      return new Promise((resolve, reject) => {
        addDepartmentRequest(departmentInfo).then(({data}) => {
          return resolve(data)
        }).then(err => {
          return reject(err)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 修改部门信息
    reviseDepartmentInfo(_, departmentInfo) {
      return new Promise((resolve, reject) => {
        reviseDepartmentInfoRequest(departmentInfo).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 删除部门
    deleteDepartment(_, did) {
      return new Promise((resolve, reject) => {
        deleteDepartmentRequest(did).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 部门下设置工种岗位
    setProOcc(_, setProOccParams) {
      return new Promise((resolve, reject) => {
        setProOccRequest(setProOccParams).then(({data}) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    }
  }
}
export default department