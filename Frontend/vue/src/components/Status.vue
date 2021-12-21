<template>
  <div class='status'>
      <p>Запуская кроулер - воркер начнет с периодичностью в 1 минуту добывать пользователей, по умолчанию: 2 запроса по одному пользователю - итого 2 пользователя в минуту</p>
      <p>RabbiqMQ под докером запускается достаточно долго, пока MQ не запустится - API и Crawler и кнопки не будут работать</p>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .status {
        max-width: 300px;
        max-height: 310px;
        box-sizing: border-box;
        margin-left: 20px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid black;
    }
</style>