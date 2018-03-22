<template >
  <div class="container">
    <h3>My Story </h3>
    <ul class="list-group list-group-flush">
      <router-link
        :to="{
          name: 'ArticleEdit',
          params: { id: article._id }
        }"
        class="list-group-item list-group-item-action"
        v-for="article in articles" :key="article._id"
      >
         <h2>{{ article.title }}</h2>
         <p v-html="article.text.replace(/<(.|\n)*?>/g, '').substr(0,25)"></p>
         <p>Author: <b>{{ article.user.name}}</b></p>
         <p>{{ article.createdAt }}</p>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'MyStory',
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
      this.$http.get('/api/articles/me', {headers: { token: localStorage.token }}).then(res => {
        this.articles = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style type="text/css" media="screen">
.container {
  margin-top: 30px;
}
</style>
