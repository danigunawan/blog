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
import {mapState, mapActions} from 'vuex'
export default {
  name: 'Articles',
  data () {
    return {
      isLogin: false
    }
  },
  computed: mapState(['articles']),
  created () {
    this.fetchArticles()
  },
  methods: {
    ...mapActions(['fetchArticles'])
  }
}
</script>

<style >
  h3 , h2 , h2 , h2 {
   color: rgba(0,0,0,.84) !important
  }
</style>
