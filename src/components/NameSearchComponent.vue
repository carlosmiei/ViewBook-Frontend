<template>
<div class="container">
<!-- The Grid -->
<div class="w3-row-padding">

    <!-- Left Column -->
    <div class="w3-third" >
    
      <SideProfileComponent ref="sideProfile"/>
    <!-- End Left Column -->
    </div>


    <div class="w3-twothird"  v-on:submit.prevent="pesquisarNome">
        <form class="form" action="##" method="post" id="searchName">
          <input type="text" class="form-control" name="nome" id="nome" placeholder="Pesquisar utilizador por nome"  required=true v-model="pesquisaNome">
           <button class="w3-btn w3-teal"  style="float: left;width:100%;margin:auto;" > Pesquisar</button>
        </form>
    </div>
    <!-- Right Column -->
    <div class="w3-twothird" >
        <div class="w3-container w3-card w3-white w3-margin-bottom">
        <h2 class="w3-text-grey w3-padding-16"><i class="	fa fa-camera-retro fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Lista de utilizadores</h2>
        <hr>
        <hr>
        
        <div class="post" v-for="f in peeps" v-bind:item="f" v-bind:key="f._id">
          <!-- Comentarios-->
          <div class="w3-container">
              <a v-bind:href="'/profile/' + f._id"><h5><b>{{f.nome}}</b></h5></a>
              <div v-if="f.fotos.length>0">
                <img v-bind:src="'http://localhost:3000/upload/'+f._id+'/Fotos/' + f.fotos[0].id"  width="80" height="80">
              </div>
              <div v-else>
                <img v-bind:src="'https://i.stack.imgur.com/l60Hf.png'"  width="80" height="80">
              </div>  
          </div>
          <hr>
        </div>
        </div>



    <!-- End Right Column -->
    </div>
    
  <!-- End Grid -->
  </div>
  
  <!-- End Page Container -->
</div>


</template>

<script>
import FeedService from '../FeedService';
import SideProfileComponent from './SideProfileComponent';
import InsertPubComponent from './InsertPubComponent';
import axios from 'axios';
export default {
  components: {
    SideProfileComponent,
    InsertPubComponent
  },
  name: 'FeedComponent',
  data(){
    return {
      peeps:[],
      error:'',
      todo:[{text:"abc"},{text:"cde"},{text:"def"}],
      pesquisaNome: '',
      id: '',
      infoUser: ''
    }
  },  
  async created(){
    try{
        this.pesquisaNome = this.$route.params.nome
        this.peeps =  await FeedService.getPeople(this.$store.getters.token,this.pesquisaNome);
        this.infoUser = await FeedService.getTotalInfo(this.$store.getters.token,this.$store.getters.id)
        this.$parent.notificacoesHeader(this.infoUser.notificacoes.filter(n => {return !n.vista}))
        this.$refs.sideProfile.carregaPerfil(this.infoUser)
    }catch(e) {
        this.error=e;
        console.log("Erro" + this.error);
    }
  },
  methods:{
     pesquisarNome: function (event) {
        FeedService.getPeople(this.$store.getters.token,this.pesquisaNome)
        .then(dados => this.peeps = dados)
        .catch(e => {
          this.error = e
          console.log(e)
        })
     },
     calc: function (){
       var x = 12323232;
       return x;
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
  color: #727572;
}
</style>
