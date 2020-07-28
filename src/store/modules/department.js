import {getDepartmentListRequest, addDepartmentRequest, reviseDepartmentInfoRequest, deleteDepartmentRequest, setProOccRequest, setEmployeelistRequest, addStaffRequest, ExportEmployeeRequest, ImportStaffRequest} from '@/api/department'
const department = {
  state: {
    departmentList: [],
    employeeList: []
  },
  mutations: {
    SAVE_DEPARTMENTLIST(state, departmentList) {
      state.departmentList = departmentList
    },
    SAVE_SETEMPLOYEE(state, employeeList) {
      // console.log(employeeList.data)
      state.employeeList = employeeList.data
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
    },
    // 获取员工信息
    setEmployeelist({commit}, num) {
      return new Promise((resolve, reject) => {
        setEmployeelistRequest(num).then(({data}) => {
          commit('SAVE_SETEMPLOYEE', data.data)
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 导出员工列表
    ExportEmployeelist(_, num) {
      return new Promise((resolve, reject) => {
        ExportEmployeeRequest(num)
      })
    },
    // 导入员工列表
    ImportStaff(_, files) {
      return new Promise((resolve, reject) => {
        ImportStaffRequest(files).then((data) => {
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 添加员工
    addStaff(_, personCre) {
      return new Promise((resolve, reject) => {
        addStaffRequest(personCre).then(({data}) => {
          return resolve(data)
        }).then(err => {
          return reject(err)
        }).catch(err => {
          return reject(err)
        })
      })
    }
  }
}
export default department
