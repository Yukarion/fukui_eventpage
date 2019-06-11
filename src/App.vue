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
        <button v-on:click="rolling(10)">10件表示</button>
        <button v-on:click="rolling(30)">30件表示</button>
        <button v-on:click="rolling(events.length)">全件表示</button>
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
      selected: '',
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
    this.evenum = this.events.length
    this.eventsfilter = res
    if (this.evenum % this.roll === 0) {
      this.page = Math.floor(this.evenum / this.roll)
    } else {
      this.page = Math.floor(this.evenum / this.roll + 1)
    }
    for (let i = 0; i < this.evenum; i++) {
      this.eventsfilter[i].id = i
    }
    for (let t = 0; t < this.roll; t++) {
      this.rollid[t] = t
    }
    console.log(this.eventsfilter)
  },
  methods: {
    rolling (pageLeng) {
      this.roll = pageLeng
      this.evenum = this.eventsfilter.length
      if (this.evenum > this.roll){
        if (this.evenum % this.roll === 0) {
          this.page = Math.floor(this.evenum / this.roll)
        } else {
          this.page = Math.floor(this.evenum / this.roll + 1)
        }
        this.pageexist = true
        for (let i = 0; i < this.evenum; i++) {
          this.eventslength[i].id = i
        }
        this.rollid = []
        for (let t = 0; t < this.roll; t++) {
          this.rollid[t] = t
        }
        this.pagenum = 1
      }else{
        this.roll = this.evenum
        this.rollid = []
        for(let t = 0;t < this.evenum; t++){
          this.rollid[t] = t
          console.log(t)
        }
        this.pageexist = false
      }
    },
    gopage (pagenumber) {
      if (pagenumber === this.page && pagenumber * this.roll !== this.evenum) {
        console.log(this.evenum - (pagenumber - 1) * this.roll)
        this.rollid = []
        for (let t = 0; t < (this.evenum - (pagenumber - 1) * this.roll); t++) {
          this.rollid[t] = t
        }
      }
      this.pagenum = pagenumber
      console.log(this.pagenum)
    }
  },
  watch: {
    message: function () {
      this.roll = 10
      this.pagenum = 1
      this.evenum = this.events.length
      this.eventsfilter = []
      if(this.message === 0){
        this.eventsfilter = this.events
      }else{
      for (let i = 0; i < this.evenum; i++) {
        let event = this.events[i]
        if (event.event_name.indexOf(this.message) !== -1) {
          this.eventsfilter.push(event)
        }
      }
      }
      console.log(this.eventsfilter)
      this.rolling(this.roll)
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
