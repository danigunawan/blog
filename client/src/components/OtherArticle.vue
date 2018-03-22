<template >
  <div>
    <ul class="list-group list-group-flush">
      <router-link
        :to="{
          name: 'Article',
          params: { id: article._id }
        }"
        class="list-group-item list-group-item-action"
        v-for="article in articles" :key="article._id"
      >
         <h2>{{ article.title }}</h2>
         <p v-html="article.text.substr(0,30)"></p>
         <p>Author: <b>{{ article.user.name}}</b></p>
         <p>{{ article.createdAt }}</p>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'OtherArticles',
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.fetchArticles()
  },
  methods: {
    fetchArticles () {
      this.$http.get('/api/articles').then(res => {
        this.articles = res.data.data.slice(0, 2)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style >
  h3 , h2 , h2 , h2 {
   color: rgba(0,0,0,.84) !important
  }
</style>
