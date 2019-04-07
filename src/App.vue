<template>
  <div id="app">
    <img src="./assets/logo.png">
    <section style="max-width:60rem; margin:auto;">
          <Multiselect :options="users"></Multiselect>
    </section>
  </div>
</template>


<script>
import Multiselect from './components/Multiselect/Multiselect.vue';

export default {
  name: 'app',
  components: {
    Multiselect,
  },
  computed: {
    users() {
      return this.$store.state.users.users;
    },
  },
  mounted() {
    this.$store.dispatch('get:users');
  },
};
</script>



<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
