<template>
  <div id="app">
    Hello World!
    <p>
      <router-link to="/">Go To Home</router-link>
      <router-link to="/about">Go To About 3</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
  };
</script>