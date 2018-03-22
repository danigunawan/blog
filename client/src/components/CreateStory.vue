<template >
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
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
        <button @click="submitArticle" class="btn btn-success btn-block">Save</button>
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
  methods: {
    submitArticle () {
      const app = this
      if (app.validateForm()) {
        this.$http.post('/api/articles', this.article, { headers: { token: localStorage.token } }).then(res => {
          app.show = true
          app.alert = 'alert alert-success'
          this.alert_message = '<b>Success</b> Create New Article'
          app.article.title = ''
          app.article.text = ''
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
