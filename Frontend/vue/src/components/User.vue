<template>
  <div style="margin-top: 20px">
      <span>По такому поиску найдено {{users.length}}</span>
      <div class='user' v-for="user in users" :key="user.id">
        <img :src='user.avatar' alt=''>
        <div class='user-info'>
          <p>{{user.first_name}} {{user.last_name}}</p>
          <span>id - {{user.id}}</span>
          <span>{{user.email}}</span>
        </div>
      </div>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'

export default {
  setup(){
        const store = useStore();
        
        const users = computed(() => store.getters['User/allUsers']);


        return {users}
    }
}
</script>

<style>
  .user {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
  }

  .user img {
    width: 100px;
    height: 100px;
  }

  .user-info {
    margin-left: 5px;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
  }
</style>