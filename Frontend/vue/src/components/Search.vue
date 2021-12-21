<template>
  <div>
      <div class='search'>
          <input type='text' v-model="search_value" placeholder="поиск по имени / фамилии">
          <div class='search-btns'>
              <button @click="searh()" class='search-btns-find'>Искать</button>
              <button @click="crawler_click()" class='search-btns-crawler'>{{crawler_is_active ? 'Остановить кроулер' : 'Запустить кроулер'}}</button>
          </div>
      </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import api from '../api'
import {useStore} from 'vuex'

export default {
    setup(){
        const store = useStore();
        const crawler_is_active = ref(false)
        const search_value = ref('')

        const crawler_click = () => {
            crawler_is_active.value = !crawler_is_active.value
            api({
                method: 'POST',
                url: '/',
                data: {
                    status: crawler_is_active.value
                }
            }).then(response => {
                console.log(response.data)
            })
        }

        const searh = () => {
            store.dispatch('User/ajaxGetUsers', {search_str: search_value.value, page_size: 12});
        }

        return {crawler_is_active, crawler_click, search_value, searh}
    }
}
</script>

<style>
    .search {
        display: flex;
        flex-direction: column;
    }

    .search input {
        min-width: 300px;
        height: 45px;
        border-radius: 10px;
        border: 1px solid black;
    }

    .search-btns {
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    }

    .search-btns button {
        height: 35px;
    }

    .search-btns-find {
        min-width: 110px;
    }

    .search-btns-crawler {
        min-width: 180px;
    }

</style>