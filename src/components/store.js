import Vue from 'vue'
import axios from 'axios'

const URL_BASE = 'https://raw.githubusercontent.com/jigjp/intern_exam/master/fukui_event.json'

export default
new Vue({
  data: {
    search_list: []
  },
  methods: {
    get_ajax (url, name) {
      return axios.get(URL_BASE + url)
        .then((res) => {
          Vue.set(this, name, res.data)
          this.$emit('GET_AJAX_COMPLETE')
        })
    },
    get_data (name) {
      return this.$data[name]
    }
  }
})
