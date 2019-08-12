<template>
  <div id="app">
    status{{message}}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      message:""
    }
  },
  methods:{
    register: function () {
      const self = this
      axios.post("http://localhost:5000/users/register",
      {username :"aaaa",password :"1111111",email :"123456@qq.com"})
       .then(function (res) {
         self.message = res.data
         // console.log(res.data)
      })
    },
    login: function () {
      const self = this
      axios.post("http://localhost:5000/users/login",
      {username:"aaaa",password: "1111111"})
        .then(function (res) {
          self.message = res.data
        })
    }
  },
  mounted() {
    this.login()
  },
  components: {

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
