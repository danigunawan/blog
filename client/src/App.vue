<template>
  <div id="app">
    <navbar @search="getQuery" ></navbar>
    <search :query="query" v-if="query" @close="closeSearch"></search>
    <router-view v-if="!query"></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Search from '@/components/Search'
export default {
  name: 'App',
  data () {
    return {
      query: null
    }
  },
  components: {
    Navbar,
    Search
  },
  methods: {
    getQuery (payload) {
      this.query = payload
    },
    closeSearch () {
      this.query = null
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
