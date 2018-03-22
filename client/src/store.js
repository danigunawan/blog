import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articles: 0
  },
  mutations: {
    fillArticles (state, articles) {
      state.articles = articles
    }
  },
  actions: {
    fetchArticles (context) {
      request.get('/api/articles').then(res => {
        context.commit('fillArticles', res.data.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }

})

export default store
