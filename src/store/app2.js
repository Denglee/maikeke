// import sessionStorage from 'js-cookie'

const state = {
  collapsed: sessionStorage.getItem('sideMenuStatus') ? !!+sessionStorage.getItem('sideMenuStatus') : false
}

const getters = {
  collapsed: (state) => state.collapsed
}

const mutations = {

  taggleSideMenu(state) {
    state.collapsed = !state.collapsed
    if (state.collapsed) {
      sessionStorage.setItem('sideMenuStatus', 1)
    } else {
      sessionStorage.setItem('sideMenuStatus', 0)
    }
  },
  openSideMenu(state) {
    state.collapsed = false
    sessionStorage.setItem('sideMenuStatus', 0)
  },

  closeSideMenu(state) {
    state.collapsed = true
    sessionStorage.setItem('sideMenuStatus', 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
