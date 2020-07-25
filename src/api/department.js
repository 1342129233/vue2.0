import axios from '@/utils/api.request'

const _api = '_api'
// 获取部门列表
export function getDepartmentListRequest() {
  return axios.request({
    url: `/${_api}/admin/department/list`
  })
}
// 添加部门
export function addDepartmentRequest(data) {
  return axios.request({
    url: `/${_api}/admin/department/partcreate/${data.pid}`,
    method: 'POST',
    data
  })
}
// 修改部门信息
export function reviseDepartmentInfoRequest(data) {
  return axios.request({
    url: `/${_api}/admin/department/partedit/${data.did}`,
    method: 'POST',
    data
  })
}
// 删除部门信息
export function deleteDepartmentRequest(data) {
  return axios.request({
    url: `/${_api}/admin/department/partdel/${data}`
  })
}
// 部门下设置工种岗位
export function setProOccRequest(data) {
  return axios.request({
    url: `/${_api}/admin/department/partdepart/${data.did}`,
    method: 'POST',
    data
  })
}

// 设置员工列表
export function setEmployeelistRequest(num) {
  let data = num
  return axios.request({
    url: `/${_api}/admin/person/list`,
    method: 'POST',
    data
  })
}

// 添加员工
export function addStaffRequest(data) {
  return axios.request({
    url: `/${_api}/admin/person/cre`,
    method: 'POST',
    data
  })
}
