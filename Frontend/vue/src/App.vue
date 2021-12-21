<template>
  <div class='content'>
    <div class='content-left'>
      <Search :users="users"/>
      <User :users="users"/>
    </div>
    <Status />
  </div>
</template>

<script>
import Status from './components/Status.vue'
import Search from './components/Search.vue'
import User from './components/User.vue'
import {ref} from 'vue'

export default {
  name: 'App',
  components: {
    Status,
    Search,
    User,
  },
  setup(){
    const users = ref([])
    users.value.push("a");
    return {users}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: center
}

.content-left {
  display: flex;
  flex-direction: column;
}
</style>
