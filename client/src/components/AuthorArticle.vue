<template >
  <div class="container">
    <div >
      <h2>{{profile.name}}</h2>
      <h4 v-if="profile.description">{{profile.description}}</h4>
      <h5 v-else>No Description About The Author</h5>
    </div>
    <hr/>
    <h3>My Story </h3>
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
         <p v-html="article.text.replace(/<(.|\n)*?>/g, '').substr(0,25)"></p>
         <p>Author: <b>{{ article.user.name}}</b></p>
         <p>{{ article.createdAt }}</p>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'AuthorStory',
  data () {
    return {
      articles: [],
      profile: {
        name: '',
        description: ''
      }
    }
  },
  created () {
    this.fetchArticles()
    this.getProfile()
  },
  methods: {
    fetchArticles () {
      const app = this
      const id = app.$route.params.id
      this.$http.get(`/api/articles/author/${id}`).then(res => {
        app.articles = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    getProfile () {
      const app = this
      const id = app.$route.params.id
      this.$http.get(`/users/profile/${id}`).then(res => {
        app.profile = res.data.data
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
