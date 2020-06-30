import { getProfessionListRequest } from '@/api/workcategory'
const workcategory = {
  state: {

  },
  actions: {
    getProfessionList() {
      return new Promise((resolve, reject) => {
        getProfessionListRequest().then(({data}) => {
          console.log(data)
          return resolve(data)
        }).catch(err => {
          return reject(err)
        })
      })
    }
  }
}
export default workcategory