<template >
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h5>Author: {{ article.user.name }}</h5>
        <h6>{{ article.createdAt }}</h6>
        <h1 class="text-center">{{article.title}}</h1>
        <p v-html="article.text"></p>
        <button class="btn btn-success" @click="likeArticle"><b>{{ article.likes }}</b> Like This <i class="far fa-thumbs-up"></i></button>
      </div>
    </div>
    <hr/>
    <h3>Other Stories</h3>
    <div class="row">
      <div class="col-md-12">
      <other-article></other-article>
      </div>
    </div>
  </div>
</template>
<script>
import OtherArticle from '@/components/OtherArticle'
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
  components: {
    OtherArticle
  },
  methods: {
    likeArticle () {
      const id = this.$route.params.id
      const app = this
      this.$http.get(`/api/articles/${id}/like`).then(res => {
        app.article.likes = res.data.data.likes
      }).catch(err => {
        console.log(err)
      })
    },
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
p {
  font-size: 20px;

}
</style>
