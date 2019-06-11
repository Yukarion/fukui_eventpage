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
          <option disabled value=""></option>
          <option>選択してください</option>
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
        <button v-on:click="displayChange(10)">10件表示</button>
        <button v-on:click="displayChange(30)">30件表示</button>
        <button v-on:click="displayChange(events.length)">全件表示</button>
      </div>
      <div v-if="pageexist">
        <li v-for="pagenumber in page" v-bind:key="pagenumber" id= "paging" >
          <button v-on:click="gopage(pagenumber)">{{pagenumber}}</button>
        </li>
      </div>
      <event-info
        v-for="rolling in rollid"
        v-bind:rolling="rolling"
        v-bind:events="eventsfilter"
        v-bind:pagenum="pagenum"
        v-bind:key="eventsfilter[rolling].id"
        v-bind:roll="roll"
      ></event-info>
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
      pageexist: true,
      pagenum: 1,
      selected: '選択してください',
      message: '',
      rollid: [],
      rollkeep: 10,
      eventsfilter: []
    }
  },
  async created () {
    let res
    await axios.get('https://raw.githubusercontent.com/jigjp/intern_exam/master/fukui_event.json')
      .then(json => {
        res = json.data
      })
    this.events = res
    this.eventsfilter = res
    this.evenum = this.events.length
    for (let i = 0; i < this.evenum; i++) {
      this.eventsfilter[i].id = i
    }
    this.rolling(10)
    console.log(this.events)
  },
  methods: {
    displayChange (pageLeng) {
      this.rollkeep = pageLeng
      this.pagenum = 1
      this.rolling(pageLeng)
    },
    rolling (pageLeng) {
      this.roll = pageLeng
      this.evenum = this.eventsfilter.length
      if (this.evenum > this.roll) {
        if (this.evenum % this.roll === 0) {
          this.page = Math.floor(this.evenum / this.roll)
        } else {
          this.page = Math.floor(this.evenum / this.roll + 1)
        }
        this.pageexist = true
        this.rollid = []
        for (let t = 0; t < this.roll; t++) {
          this.rollid[t] = t
        }
      } else {
        this.roll = this.evenum
        this.rollid = []
        for (let t = 0; t < this.evenum; t++) {
          this.rollid[t] = t
        }
        this.pageexist = false
      }
    },
    gopage (pagenumber) {
      this.pagenum = pagenumber
      if (pagenumber === this.page) {
        let lastRoll = this.evenum - (pagenumber - 1) * this.roll
        this.rollid = []
        for (let t = 0; t < lastRoll; t++) {
          this.rollid[t] = t
        }
      } else {
        this.rolling(this.roll)
      }
    }
  },
  watch: {
    message: function () {
      this.pagenum = 1
      this.evenum = this.events.length
      this.eventsfilter = []
      if (this.message === '') {
        this.eventsfilter = this.events
      } else {
        for (let i = 0; i < this.evenum; i++) {
          let event = this.events[i]
          if (event.event_name.indexOf(this.message) !== -1 ||
              event.address.indexOf(this.message) !== -1 ||
              event.description.indexOf(this.message) !== -1 ||
              event.category.indexOf(this.message) !== -1 ||
              event.event_place.indexOf(this.message) !== -1) {
            this.eventsfilter.push(event)
          }
        }
      }
      this.rolling(this.rollkeep)
    },
    selected: function () {
      this.pagenum = 1
      this.evenum = this.events.length
      this.eventsfilter = []
      if (this.selected === '選択してください') {
        this.eventsfilter = this.events
      } else {
        for (let i = 0; i < this.evenum; i++) {
          let event = this.events[i]
          if (event.category.indexOf(this.selected) !== -1) {
            this.eventsfilter.push(event)
          }
        }
      }
      this.rolling(this.rollkeep)
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
