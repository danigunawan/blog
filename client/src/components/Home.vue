<template >
  <div class="container">
    <login v-if="!isLogin"></login>
    <div class="row">
      <div class="col-md-8">
        <articles></articles>
      </div>
      <div class="col-md-4">
        <authors></authors>
      </div>
    </div>
    <button style="display:none" class="btn-check-login" @click="checkLogin"></button>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Articles from '@/components/Articles'
import Authors from '@/components/Authors'
export default {
  name: 'App',
  data () {
    return {
      isLogin: false
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      const token = localStorage.token
      if (token !== undefined) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    }
  },
  components: {
    Login,
    Articles,
    Authors
  }
}
</script>
<style scoped>
  .container {
    margin-top: 30px;
  }
</style>
