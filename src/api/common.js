import axios from '@/utils/api.request'

const _api = '_api'
// 获取七牛token
export function uploadTokenResquest() {
  return axios.request({
    url: `${_api}/admin/CompanyAdmin/getqiniuuploadtoken`,
    method: 'GET'
  })
}
// 获取省市区列表
export function getPCATreeRequest() {
  return axios.request({
    url: `${_api}/admin/CompanyAdmin/getenterpriseareaall`,
    method: 'GET'
  })
}
// 获取部门工种岗位列表
export function getDeptProOccResquest(data = []) {
  let str = ''
  data.map((item, ind) => {
    str += `&k[${ind}]=${item}`
  })
  // 参数
  // let k = {
  //   0: 'dept',
  //   1: 'pro',
  //   2: 'occ'
  // }
  return axios.request({
    url: `${_api}/baseData/getBaseData?power_key=group_curd${str}`
  })
}
// 获取人员列表
export function getPersonListRequest(data) {
  let url = `/${_api}/baseData/selectUserList`
  let newdata = {
    keyword: data.phoneName,
    dept_id: data.deptId,
    profession: '',
    occupation: '',
    page: data.page,
    per_page: data.per_page
  }
  return axios.request({
    url,
    method: 'POST',
    data: newdata
  })
}
// 获取部门工种岗位模版列表
export function getDeptModalListRequest() {
  return axios.request({
    url: `/${_api}/template/list`
  })
}
// 创建修改部门工种岗位模版
export function cuDeptTemplateRequest(data) {
  return axios.request({
    url: `/${_api}/template/cu`,
    method: 'POST',
    data
  })
}