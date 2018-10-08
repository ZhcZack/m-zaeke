import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /**
         * 全局IP地址
         */
        globalIp: `http://manager.zaeke.com:9999`,
        /**
         * 账号内容
         */
        userInfo: {
            id: 0,
            type: 0,
            account: '',
            nickname: '',
            username: '',
            phone: '',
            email: '',
            img: '',
            mark: '',
            cover: ''
        },
        /**
         * 账号登录信息
         */
        accountInfo: {
            account: '',
            token: ''
        },
        headerHidden: false,
        footerHidden: false,
        headerSlideShow: false
    },
    getters: {
        logined(state) {
            if (!state.userInfo.account) {
                return false
            }
            return state.userInfo.account !== ''
        },
        navShown(state) {
            return state.headerSlideShow
        }
    },
    mutations: {
        updateUserInfo(state, info) {
            state.userInfo = info
        },
        updateAccountInfo(state, info) {
            state.accountInfo = info
            localStorage.setItem('bz', JSON.stringify(info))
        },
        resetAccountInfo(state) {
            state.accountInfo = {}
        },
        resetUserInfo(state) {
            state.userInfo = {}
        },
        logout() {
            this.commit('resetAccountInfo')
            this.commit('resetUserInfo')
            localStorage.removeItem('bz')
        },
        toggleHeaderSlide(state) {
            state.headerSlideShow = !state.headerSlideShow
        },
        headerSlideUp(state) {
            state.headerSlideShow = false
        },
        hideHeader(state) {
            state.headerHidden = true
        },
        hideFooter(state) {
            state.footerHidden = true
        },
        showHeader(state) {
            state.headerHidden = false
        },
        showFooter(state) {
            state.footerHidden = false
        }
    }
})
