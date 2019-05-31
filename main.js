document.addEventListener("DOMContentLoaded", function(event) {
Vue.component('modal', {
  template: '#modal-template'
})

var modalOpen = new Vue({
  el: '#modalOpen',
  data: {
    showModal: false
  }
})

new Vue({
  el: '#getjson',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get(' https://raw.githubusercontent.com/jigjp/intern_exam/master/fukui_event.json')
      .then(response => (this.info = response))
  }
})
})