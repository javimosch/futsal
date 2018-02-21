<template>
  <div 
  id="app"
  
  >
  
  
    <my-nav 
    :authenticated="authenticated"
    v-on:login="login()"
    v-on:logout="logout()"
    ></my-nav>
    <div class="container">
      <router-view 
        :auth="auth" 
        :authenticated="authenticated">
      </router-view>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue'
  
  import MyNav from './components/Nav'

  import AuthService from './auth/AuthService'
  const auth = new AuthService()
  const { login, logout, authenticated, authNotifier } = auth

  

  export default {
    
    components: {
      MyNav
    },
    name: 'app',
    data() {
      authNotifier.on('authChange', authState => {
        this.authenticated = authState.authenticated
      })
      return {
        auth,
        authenticated
      }
    },
    methods: {
     
      login,
      logout
    }
  }
</script>

<style>
  .btn-margin {
    margin-top: 7px
  }
</style>
