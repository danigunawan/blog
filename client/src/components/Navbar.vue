<template >
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
     <router-link to="/" class="navbar-brand">Medium Clone</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item " v-if="isLogin">
          <router-link to="/my-articles" class="nav-link">My Story</router-link>
        </li>
        <li class="nav-item " v-if="isLogin">
          <router-link to="/create-article" class="nav-link">Create New Story</router-link>
        </li>
        <li class="nav-item " v-if="isLogin">
          <a href="#" class="nav-link" onclick="fbLogout()">Logout</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" v-model="query" type="search" placeholder="Search" aria-label="Search">
        <button  @click="search" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
      <button style="display: none" class="btn-check-login" @click="checkLogin"></button>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      isLogin: false,
      query: null
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    search () {
      this.$emit('search', this.query)
    },
    checkLogin () {
      const token = localStorage.token
      if (token !== undefined) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    }
  }
}
</script>
