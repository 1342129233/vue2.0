import axios from '@/utils/api.request'
import { getToken } from '@/common/auth'

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

// 导出员工列表
export function ExportEmployeeRequest() {
  // let data = num
  // window.location.href = `/${_api}/_api/admin/person/list?export=' + 'y' + '&token=' + getToken()
  window.location.href = `/${_api}/_api/` + 'admin/person/list?export=' + 'y' + '&token=' + getToken()
  // return axios.request({
  //   url: `/${_api}/admin/person/list`,
  //   method: 'POST',
  //   data
  // })
}

// 导入员工
export function ImportStaffRequest(files) {
  let data = {
    data: files
  }
  return axios.request({
    url: `/${_api}/admin/person/importUserDo`,
    method: 'POST',
    data
  })
}

// 分配岗位
export function setPostRequest(id) {
  return axios.request({
    url: `/_api/admin/person/${id}/setPost`,
    method: 'POST'
  })
}

// 分配岗位权限提交
export function setPostdoRequest(jurisdiction) {
  let id = jurisdiction.id
  let data = {
    rolegroupId: jurisdiction.data
  }
  return axios.request({
    url: `/_api/admin/person/${id}/setPostDo`,
    method: 'POST',
    data
  })
}
// 移动工种岗位位置
export function deptmoveRequest(datas) {
  let did = datas.did
  let data = {
    id: datas.id
  }
  console.log(data)
  return axios.request({
    url: `/_api/admin/department/partmove/${did}`,
    method: 'POST',
    data
  })
}
