<template>
<div class="container">
<!-- The Grid -->
<div class="w3-row-padding">

    <!-- Left Column -->
    <div class="w3-third" >
    
      <SideProfileComponent ref="sideProfile"/>
    <!-- End Left Column -->
    </div>

    <!-- Right Column -->
    <div class="w3-twothird" >
        <div class="w3-container w3-card w3-white w3-margin-bottom">
        <h2 class="w3-text-grey w3-padding-16"><i class="	fa fa-camera-retro fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Lista de utilizadores com pedidos pendentes</h2>
        <hr>
        <hr>
        
        <div class="post" v-for="f in this.pedidosAmizade" v-bind:item="f" v-bind:key="f.id">
          <!-- Comentarios-->
          <div class="w3-container">
              <a v-bind:href="'/profile/' + f.from.id"><h4><b>{{f.from.nome}}</b></h4></a>  
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
      pedidosAmizade:[],
      error:'',
      todo:[{text:"abc"},{text:"cde"},{text:"def"}],
      pesquisaNome: '',
      id: '',
      infoUser: ''
    }
  },  
  async created(){
    try{
        this.infoUser = await FeedService.getTotalInfo(this.$store.getters.token,this.$store.getters.id)
        this.pedidosAmizade = this.infoUser.pedidosAmizade.filter(a => a.to.id==this.$store.getters.id)
        this.$parent.notificacoesHeader(this.infoUser.notificacoes.filter(n => {return !n.vista}))
        this.$refs.sideProfile.carregaPerfil(this.infoUser)
        
    }catch(e) {
        this.error=e;
        console.log("Erro" + this.error);
    }
  },
  methods:{
     
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
