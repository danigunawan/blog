<template >
  <div>
    <h3>Author List</h3>
    <ul class="list-group list-group-flush">
      <router-link
        :to="{
          name: 'AuthorArticle',
          params: { id: author._id }
        }"
        class="list-group-item list-group-item-action"
        v-for="author in authors" :key="author._id"
      >
         <h2>{{ author.name }}</h2>
         <h6>{{ author.description }}</h6>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Authors',
  data () {
    return {
      authors: []
    }
  },
  created () {
    this.fetchAuthors()
  },
  methods: {
    fetchAuthors () {
      this.$http.get('/users').then(res => {
        this.authors = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
