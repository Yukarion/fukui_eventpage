<template>
    <ul id="event-info" class="eventinfo">
      <div id = "event-name">{{event_name}}</div>
  <table rules="none" border="1" >
    <tbody>
        <tr>
            <td id= "event-date">{{event_start_date}}～{{event_end_date}}</td>
            <td id= "event-place">{{event_place}}</td>
        </tr>
    </tbody>
  </table>
          <div id="modalOpen">
            <button id="show-modal" v-on:click="showModal = true">詳細</button>
            <modal v-if="showModal" v-on:close="showModal = false">
              <h3 slot="header">{{event_name}}</h3>
              <h5 slot="body">
                <p id="description">内容：{{event["description"]}}</p>
                <p id="event_category">カテゴリ：{{event["category"]}}</p>
                <p id="remarks">備考：{{event["remarks"]}}</p>
                <p id="event_place">場所：{{event["event_place"]}}</p>
                <p id="event_date">日時：{{event["start_date"]}}～{{event["end_date"]}}</p>
                <p id="event_place_url">URL：{{event["event_place_url"]}}</p>
                <p id="transportation">アクセス：{{event["transportation"]}}</p>
                </h5>
              <h5 slot="footer">
                <p id="contact">連絡先：{{event["contact"]}}</p>
                <p id="contact_phone_number">電話番号：{{event["contact_phone_number"]}}</p>
                <p id="mail_address">メールアドレス：{{event["mail_address"]}}</p>
                <button v-on:click="showModal = false">閉じる</button>
              </h5>
            </modal>
          </div>
          <script type="text/x-template" id="modal-template">
            <transition name="modal">
              <div class="modal-mask">
                <div class="modal-wrapper">
                  <div class="modal-container">
                    <div class="modal-header">
                      <slot name="header">
                        default header
                      </slot>
                    </div>
                    <div class="modal-body">
                      <slot name="body">
                        default body
                      </slot>
                    </div>
                    <div class="modal-footer">
                      <slot name="footer">
                        default footer
                        <button class="modal-default-button" v-on:click="$emit('close')">
                          閉じる
                        </button>
                      </slot>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </script>
        </ul>
</template>
<script>
import Vue from 'vue'

Vue.component('modal', {
  template: '#modal-template'
})

export default {
  data () {
    return {
      showModal: false,
      event: {},
      event_name: String,
      event_start_date: String,
      event_end_date: String,
      event_place: String,
      index: 0
    }
  },
  props: ['rolling', 'events', 'pagenum', 'roll'],
  created () {
    this.index = this.rolling + this.roll * (this.pagenum - 1)
    this.event_name = this.events[this.index].event_name
    this.event_start_date = this.events[this.index].start_date
    this.event_end_date = this.events[this.index].end_date
    this.event_place = this.events[this.index].event_place
    for (var key in this.events[this.index]) {
      this.event[key] = this.events[this.index][key]
    }
  },
  watch: {
    pagenum: function () {
      this.index = this.rolling + this.roll * (this.pagenum - 1)
      this.event_name = this.events[this.index].event_name
      this.event_start_date = this.events[this.index].start_date
      this.event_end_date = this.events[this.index].end_date
      this.event_place = this.events[this.index].event_place
      for (var key in this.events[this.index]) {
        this.event[key] = this.events[this.index][key]
      }
    },
    events: function () {
      this.index = this.rolling + this.roll * (this.pagenum - 1)
      this.event_name = this.events[this.index].event_name
      this.event_start_date = this.events[this.index].start_date
      this.event_end_date = this.events[this.index].end_date
      this.event_place = this.events[this.index].event_place
      for (var key in this.events[this.index]) {
        this.event[key] = this.events[this.index][key]
      }
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  height: 70%;
  width: 60%;
  overflow: scroll;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  font-size: 110%
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
#event-info {
  width: auto;
  height: 5%;
  margin: 5%;
  padding: 1%;
  background-color:rgb(151, 241, 151);
}
table{
  width: 100%;
  border-top-style:1px;
  border:0;
  background-color:rgb(255, 255, 255);
}
#event-name {
  font-size:x-large
}
td {
  width: 50%;
  margin: auto;
  padding: 1% 1%;

}
</style>
