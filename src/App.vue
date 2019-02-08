<template>
  <div id="app">
    
    
    <div class="w3-content w3-margin-top"  style="max-width:1400px;">
      <header>
      <div  v-show="$route.path==='/login' || $route.path==='/register' ? false : true" id="cabecalho">
      <HeaderComponent ref='header'/>
      </div>
      </header>
        <router-view></router-view>
      <FooterComponent/>
    </div>
    
  </div>
</template>

<script>
import FeedComponent from './components/FeedComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import store from './store'
export default {
  name: 'app',
  components: {
    FooterComponent,
    HeaderComponent,
  },
  created:  function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });
  },
  methods: {
    notificacoesHeader: function (notificacoes){
      this.$refs.header.adicionaNotificacoes(notificacoes)
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
  margin-top: 20px;
}
</style>
