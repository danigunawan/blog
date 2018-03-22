<template >
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h5>Author: {{ article.user.name }}</h5>
        <h6>{{ article.createdAt }}</h6>
        <h1 class="text-center">{{article.title}}</h1>
        <p v-html="article.text"></p>
      </div>
    </div>
    <hr/>
    <h3>Related Articles</h3>
    <div class="row">
      <div class="col-md-12">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Article',
  data () {
    return {
      article: null
    }
  },
  created () {
    this.fetchArticle()
  },
  methods: {
    fetchArticle () {
      const id = this.$route.params.id
      const app = this
      this.$http.get(`/api/articles/${id}`).then(res => {
        app.article = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
.container {
  margin-top: 30px;
}
h1 {
  font-weight: 1000;
}
</style>
