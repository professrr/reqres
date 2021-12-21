<template>
  <div class='status'>
      <p>Запуская кроулер - воркер начнет с периодичностью в 1 минуту добывать пользователей, по умолчанию: 2 запроса по одному пользователю - итого 2 пользователя в минуту. Конфиг кроулера можно поменять в конструктуре класса Crawler (Scrapper/Utils/crawler.js)</p>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .status {
        max-width: 300px;
        max-height: 210px;
        box-sizing: border-box;
        margin-left: 20px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid black;
    }
</style>