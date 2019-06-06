<template>
    <ul id="event-info" class="eventinfo">
        <li v-for="rolling in roll" v-bind:key= "rolling.id" >
          <h4 id="event-name">{{put(rolling).eventname}}</h4>
          <h6 id= "event-date">{{put(rolling).eventstart_date}}～{{put(rolling).eventend_date}}</h6>
          <div id="modalOpen">
            <button id="show-modal" v-on:click="showModal = true,putdescription(rolling)">詳細</button>
            <modal v-if="showModal" v-on:close="showModal = false">
              <h3 slot="header">{{eventname}}</h3>
              <h2 slot="body">
                <p id="description">内容：{{event.description}}</p>
                <p id="category">カテゴリ：{{event.category}}</p>
                <p id="remarks">備考：{{event.remarks}}</p>
                <p id="event_place">場所：{{event.event_place}}</p>
                <p id="event_date">日時：{{event.start_date}}～{{event.end_date}}</p>
                </h2>
            </modal>
          </div>
        </li>
                  <!--modal from vue.js official-->
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
      eventname: {},
      eventstart_date: {},
      eventend_date: {},
      index: 0 
    }
  },
  props: ["roll","events","pagenum"],
  methods: {
    putdescription (rlg) {
      for (var key in this.events[rlg]) {
        event[key] = this.events[rlg][key]
      }
    },
    put (rolling) {
      let name = 'event_name'
      let start = 'start_date'
      let end = 'end_date'
      console.log(this.events)
      this.index = rolling + this.roll * (this.pagenum - 1) - 1
      this.eventname = this.events[this.index][name]
      console.log(this.eventname)
      this. eventstart_date = this.events[this.index][start]
      this. eventend_date = this.events[this.index][end]
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
  width: 300px;
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
</style>
