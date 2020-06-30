import axios from '@/utils/api.request'

const _api = '_api'

export function getProfessionListRequest() {
  return axios.request({
    url: `/${_api}/`
  })
}