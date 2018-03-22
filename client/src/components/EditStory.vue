<template >
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
            <li class="breadcrumb-item"><router-link to="/my-articles">My Story</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">Edit Story</li>
          </ol>
        </nav>
        <div :class="alert" v-if="show">
          <span v-html="alert_message"></span>
        </div>
        <div class="form-group">
          <label>Title</label>
          <input type="text" name="" id="" value="" class="form-control" v-model="article.title" />
        </div>
        <div class="form-group">
          <label>Text</label>
          <vue-editor v-model="article.text"></vue-editor>
        </div>
        <button @click="submitArticle" class="btn btn-success btn-block">Update</button>
        <button @click="deleteArticle" class="btn btn-danger btn-block">Delete</button>
      </div>
    </div>
  </div>
</template>
<script >
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  data () {
    return {
      article: {
        title: '',
        text: ''
      },
      show: false,
      alert: null,
      alert_message: null
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
    },
    deleteArticle () {
      const app = this
      const id = this.$route.params.id
      this.$http.delete(`/api/articles/${id}`, { headers: { token: localStorage.token } }).then(res => {
        app.show = true
        app.$router.push({ name: 'MyStory' })
      }).catch(err => console.log(err))
    },
    submitArticle () {
      const app = this
      const id = this.$route.params.id
      if (app.validateForm()) {
        this.$http.put(`/api/articles/${id}`, this.article, { headers: { token: localStorage.token } }).then(res => {
          app.show = true
          app.alert = 'alert alert-success'
          this.alert_message = '<b>Success</b> Update an Article'
        }).catch(err => console.log(err))
      }
    },
    validateForm () {
      if (this.article.title === '') {
        this.show = true
        this.alert = 'alert alert-danger'
        this.alert_message = '<b>Gagal</b> Title Harus Di Isi'
        return false
      }
      if (this.article.text === '') {
        this.show = true
        this.alert = 'alert alert-danger'
        this.alert_message = '<b>Gagal</b> Text Harus Di Isi'
        return false
      }
      return true
    }
  }
}
</script>
<style scoped>
  .container {
    margin-top: 30px;

  }
</style>
