<template >
  <div>
    <h3>Author List</h3>
    <ul class="list-group list-group-flush">
      <li :key="author._id" class="list-group-item" v-for="author in authors">
         <h2>{{ author.name }}</h2>
         <h6>{{ author.description }}</h6>
      </li>
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
