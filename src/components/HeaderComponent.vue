<template>
<div class="w3-center w3-margin-top" style="max-width: 85%; margin:auto;">
<ul>
  <li><a href="/feed">Feed</a></li>
  <li><a :href="'/profile/'+this.$store.getters.id">Meu perfil</a></li>
  <li><router-link to="/pedidosAmizade">Pedidos de amizade</router-link></li>
  <li>
    <div class="dropdown">
      <button class="dropbtn" v-on:click="notificacoes" ref="notificacoesA">Notificacoes</button>
      <div class="dropdown-content" ref="notificacoesNaoVistas">
        
      </div>
    </div>
  </li>
  
 <span v-if="isLoggedIn">

  <li>
    <router-link to="/login" exact v-on:click.native="logout">
      Log out
    </router-link>

  </li>
  </span>
</ul>
</div>

</template>

<script>
import store from '../store'
import axios from 'axios';

export default {
  name: 'FeedComponent',
  data(){
    return {
      error:'',
      loginIn: '',
      notificacoesH: [],
      rota:''

    }
  },  
  async created(){
    try{
      
         this.loginIn = this.$store.getters.isLoggedIn;
         this.rota = this.$route.path
    }catch(e) {
        this.error=e.message;
        console.log("Erro" + this.error);
    }
  },
  computed : {
      isLoggedIn : function(){
        let x =  this.$store.getters.isLoggedIn;
        return x;
        }
       
    },
    methods: {
       logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      },
      notificacoes: function (e){
        e.preventDefault();
        if(this.notificacoesH.length > 0){
          let not = this.notificacoesH.reduce((a,e) => a+e.texto+'\n','')
          alert('Notificações:\n'+not)
          //faz pedido para ver notificacoes (ate pode igual o array ao devolvido pelo pedido)
          const defaultOptions = {
                    headers: {
                        Authorization: this.$store.getters.token
                    },
          };
          let body = {
            notificacoes: this.notificacoesH
          }
          axios.post('http://localhost:3000/api/perfil/veNotificacoes',body,{defaultOptions})
          .then(dados => {
            this.notificacoesH = []
            this.$refs.notificacoesA.innerHTML = 'Notificações'
          })
          .catch(erro => console.dir(erro))
          
        }
        //depois é para por na div notificacoesNaoVistas por paragrafos
      },
      adicionaNotificacoes(notificacoes){
          this.notificacoesH = notificacoes
          if(notificacoes.length > 0) this.$refs.notificacoesA.innerHTML = 'Notificações (' + notificacoes.length + ')'
          
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: teal;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid #e7e7e7;
  background-color: white;
  border-radius: 15px;
  margin-bottom: 10px;
  
 
}

li {
  float: left;
}

.dropbtn {
  background-color: white;
  cursor: pointer;
  display: block;
  color: #666;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  border-radius: 15px;
  border-style: hidden;
}

.dropdown {
  position: relative;
  display: inline-block;
  overflow: visible;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: teal;
  color: white;

}

li a {
  display: block;
  color: #666;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  border-radius: 15px;
}

li a:hover:not(.active) {
  background-color: teal;
  color: white;
}

li a.active {
  color: white;
  background-color: teal;
}



</style>
