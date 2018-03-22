<template >
  <div class="container">
    <h3>Search Story</h3>
    <ul class="list-group list-group-flush" v-if="searchArticle.length" >
      <router-link
        :to="{
          name: 'Article',
          params: { id: article._id }
        }"
        class="list-group-item list-group-item-action"
        v-for="article in searchArticle" :key="article._id"
        @click.native="closeSearch"
      >
         <h2>{{ article.title }}</h2>
         <p v-html="article.text.substr(0,30)"></p>
         <p>Author: <b>{{ article.user.name}}</b></p>
         <p>{{ article.createdAt }}</p>
      </router-link>
    </ul>
    <div style="margin-top:30px" class="alert alert-warning" v-else>
      <b>Not Found</b> there is no story with text <b>{{query}}</b>
    </div>
    <div style="margin-top:30px">
      <button @click="closeSearch" class="btn btn-warning" >Close Search</button>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'Articles',
  data () {
    return {
      searchArticle: []
    }
  },
  created () {
    const app = this
    this.searchArticle = []
    this.articles.forEach(article => {
      var check = article.title.toLowerCase().search(this.query)
      if (check >= 0) app.searchArticle.push(article)
    })
  },
  props: ['query'],
  watch: {
    query (newValue) {
      const app = this
      this.searchArticle = []
      this.articles.forEach(article => {
        var check = article.title.toLowerCase().search(this.query)
        console.log(check)
        if (check >= 0) app.searchArticle.push(article)
      })
    }
  },
  computed: mapState(['articles']),
  methods: {
    closeSearch () {
      this.$emit('close')
    }
  }
}
</script>

<style >
  h3 , h2 , h2 , h2 {
   color: rgba(0,0,0,.84) !important
  }
  .container {
    margin-top: 30px;

  }
</style>
