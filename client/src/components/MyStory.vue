<template >
  <div class="container">
    <div v-if="!isEdit" >
      <h2>{{profile.name}}</h2>
      <h4 v-if="profile.description">{{profile.description}}</h4>
      <h5 v-else>No Description About The Author</h5>
      <button class="btn btn-success" @click="editProfile">Edit</button>
    </div>
    <div v-if="isEdit">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" v-model="profileEdit.name" />
      </div>
      <div class="form-group">
        <label>Description</label>
        <input type="text" class="form-control" v-model="profileEdit.description" />
      </div>
      <button class="btn btn-primary" @click="saveProfile">Save</button>
      <button class="btn btn-danger" @click="cancelEdit">Cancel</button>
    </div>
    <hr/>
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
      articles: [],
      profile: {
        name: '',
        description: ''
      },
      profileEdit: {
        name: '',
        description: ''
      },
      isEdit: false
    }
  },
  created () {
    this.fetchArticles()
    this.getProfile()
  },
  methods: {
    editProfile () {
      this.isEdit = true
      this.profileEdit = {
        name: this.profile.name,
        description: this.profile.description
      }
    },
    saveProfile () {
      const app = this
      this.$http.put('/users/profile', this.profileEdit, {headers: { token: localStorage.token }}).then(res => {
        app.profile = res.data.data
        app.isEdit = false
      }).catch(err => {
        console.log(err)
      })
    },
    cancelEdit () {
      this.isEdit = false
    },
    fetchArticles () {
      const app = this
      this.$http.get('/api/articles/me', {headers: { token: localStorage.token }}).then(res => {
        app.articles = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    getProfile () {
      const app = this
      this.$http.get('/users/profile', {headers: { token: localStorage.token }}).then(res => {
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
