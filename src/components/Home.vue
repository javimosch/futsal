<template>
  <div>
    <h2>HOME3</h2>
    <h4 v-if="authenticated">
        You are logged in!
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </h4>
    <button @click="test()">PROFILE</button>
  </div>
</template>

<script>
  import { getPrivateStartupBattles } from '../api/battles';
  export default {
    name: 'home',
    props: ['auth', 'authenticated'],
    methods: {
      async test() {
        let rta = await getPrivateStartupBattles();
        console.log('RTA', rta);
      }
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>
