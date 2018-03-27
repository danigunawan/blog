import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let host = 'http://localhost:3000'
const hostname = document.location.hostname
if (hostname !== 'localhost') {
  host = 'http://blog-api.geekosta.com'
}
const request = axios.create({
  baseURL: host
})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articles: 0,
    loading: false
  },
  mutations: {
    fillArticles (state, articles) {
      state.articles = articles
      state.loading = false
    },
    startLoading (state) {
      state.loading = true
    }
  },
  actions: {
    fetchArticles (context) {
      context.commit('startLoading')
      request.get('/api/articles').then(res => {
        context.commit('fillArticles', res.data.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }

})

export default store
