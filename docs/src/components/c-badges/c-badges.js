window.CBadges = new Vue({
  data() {
    return {
      tickets: 1
    };
  },
  methods: {
    getTicket() {
      return this.tickets++;
    }
  },
  watch: {}
});