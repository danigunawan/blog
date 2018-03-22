<template >
  <div>
    <h3>Story List</h3>
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
  name: 'Articles',
  data () {
    return {
      isLogin: false,
      articles: []
    }
  },
  created () {
    this.fetchArticles()
  },
  methods: {
    fetchArticles () {
      this.$http.get('/api/articles').then(res => {
        this.articles = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
