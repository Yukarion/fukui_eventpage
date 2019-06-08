<template>
  <div id="app">
    <h1 id= "title">
      福井のイベント情報
    </h1>
      <div id= "app">
      <div id="keySerch">
        <h3>キーワード検索</h3>
        <input v-model="message" placeholder="キーワードで検索を行います">
      </div>
      <div id="category">
        <h3>カテゴリ検索</h3>
        <select v-model="selected">
          <option disabled value="">選択してください</option>
          <option>音楽</option>
          <option>歴史</option>
          <option>スポーツ</option>
          <option>こども</option>
          <option>文化・芸術</option>
          <option>食・健康</option>
          <option>自然・環境</option>
          <option>講座・セミナー</option>
          <option>観光・祭り</option>
          <option>その他</option>
        </select>
      </div>
      <div id="changeDisplay">
        <button v-on:click="numget(),rolling('10')">10件表示</button>
        <button v-on:click="numget(),rolling('30')">30件表示</button>
        <button v-on:click="numget(),rolling('evenum')">全件表示</button>
      </div>
      <div v-if="pageexe">
        <li v-for="pagenum in page" v-bind:key="pagenum" id= "paging" >
          <button v-on:click="gopage(pagenum)">{{pagenum}}</button>
        </li>
      </div>
      <event-info v-bind:events="events" v-bind:roll="roll" v-bind:pagenum="pagenum"></event-info>
    </div>
  </div>
</template>

<script>
import EventInfo from './components/EventInfo.vue'
import axios from 'c:/workspace/tmp/fukui_eventpage/node_modules/axios'

export default {
  components: {
    EventInfo
  },
  data () {
    return {
      events: [],
      evenum: null,
      roll: 10,
      page: null,
      pageexe: true,
      pagenum: 1,
      selected: '',
      message: ''
    }
  },
  async created () {
    let res
    await axios.get('https://raw.githubusercontent.com/jigjp/intern_exam/master/fukui_event.json')
      .then(json => {
        res = json.data
      })
    this.events = res
    this.evenum = this.events.length
    this.page = Math.floor(this.evenum / this.roll)
  },
  methods: {
    numget () {
      this.evenum = this.events.length
    },
    rolling (roll) {
      if (this.evenum % roll === 0) {
        this.page = Math.floor(this.evenum / roll)
      } else {
        this.page = Math.floor(this.evenum / roll + 1)
      }
      if (roll === this.evenum) {
        this.pageexe = false
      } else {
        this.pageexe = true
      }
    },
    gopage (pgenum) {
      this.pagenum = pgenum
    }
  }
}
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
