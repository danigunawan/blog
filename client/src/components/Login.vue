<template >
  <div class="container">
    <div class="row">
      <div class="col-md-4 offset-md-4">
       <h1>Welcome back.</h1>
       <p>Sign in to access your personalized homepage, follow authors and topics you love, and clap for stories that matter to you</p>
        <div class="fb-login-button" data-max-rows="1" data-size="large"  data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" onlogin="checkLoginState()" data-use-continue-as="false"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    margin-top: 30px;

  }
</style>
