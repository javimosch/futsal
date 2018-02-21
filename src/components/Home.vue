<template>
  <div :class="$style.home+' content_wrapper'">
    
    <h1>Available matches in Paris</h1>
    <list title="Matches" :items="users" :options="userListOptions"></list>
    
  </div>
</template>

<script>
  import MyButton from './Button'
  import List from './List'
  //import Alert from './Alert'
  import { getPrivateStartupBattles } from '../api/battles';
  export default {
    name: 'home',
    props: ['auth', 'authenticated'],
    data() {
      return {
        users: [{
          name: "Fabio"
        }],
        userListOptions: {
          renderItem: (item)=> item.name
        }
      };
    },
    methods: {
      async test() {
        let rta = await getPrivateStartupBattles();
        console.log('RTA', rta);
      }
    },
    components: {
      MyButton, List
    }
  }
</script>

<style lang="scss" module>
  @import '~$css/variables.scss';
  .home{
    border:0;
  }
</style>
