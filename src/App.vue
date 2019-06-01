<template>
  <div id="app">
    <h1 id= "title">
      福井のイベント情報
    </h1>
    <div id= "getjson">
      <div id= app>
      <div id="key-serch">
        <h3>キーワード検索</h3>
        <input v-model="message" placeholder="キーワードで検索を行います">
      </div>
      <div id="category">
        <h3>カテゴリ検索</h3>
        <select v-model="selected">
            <option disabled value="">選択してください</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
      </div>
      <div id="example-3">
          <button v-on:click="say('10')">10件表示</button>
          <event-info source="events" number="eventsnumber" roll=10></event-info>
          <button v-on:click="say('30')">30件表示</button>
          <button v-on:click="say('')">全件表示</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'c:/workspace/fukui_webpage/node_modules/axios'
import EventInfo from './components/EventInfo.vue'
export default {
  components: {
    EventInfo
  }
}
var getjson = new Vue({ // eslint-disable-line
  el: '#getjson',
  data () {
    return {
      events: null
    }
  },
  mounted () {
    axios
      .get(' https://raw.githubusercontent.com/jigjp/intern_exam/master/fukui_event.json')
      .then(response => (this.events = response))
  }
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
