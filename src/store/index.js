import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tabsview from './modules/tabsview'
import language from './modules/language'
import permission from './modules/permission'
import common from './modules/common'
import home from './modules/home'
import department from './modules/department'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    tabsview,
    language,
    permission,
    common,
    home,
    department
  }
})