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
    <div class="w3-twothird" id='corpo'>
        <div id="amizade">
          <div class="left2">
            <form class="w3-container" v-on:submit.prevent="funcaoAmizade" id="formAmizade">
              
            </form>
          </div>
          <div class="left2">
            <form class="w3-container" v-on:submit.prevent="funcaoAmizadeRecusa" id="formAmizadeRecusa">
              
            </form>
          </div>
          
        </div>
        <div id="seraFeed"> 
          <PubComponent :feedProp="this.feed" ref="componentePubs"/>
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
import PubComponent from './PubComponent';
import axios from 'axios';
export default {
  components: {
    SideProfileComponent,
    InsertPubComponent,
    PubComponent
  },
  name: 'ProfileComponent',
  data(){
    return {
      feed:[],
      perfil:{},
      error:'',
      todo:[{text:"abc"},{text:"cde"},{text:"def"}],
      hashtag:'',
      idPerfil: '',
      id:'',
      infoUser:''
    }
  },  
  async created(){
    try{
        this.idPerfil = this.$route.params.id
        this.perfil =  await FeedService.getProfile(this.$store.getters.token,this.idPerfil);
        this.feed = this.perfil.publicacoes
        if(this.perfil._id == this.$store.getters.id){
           
        }
        else{
          //document.getElementById('amizade').innerHTML = '<form class="w3-container" v-on:submit.prevent="funcaoAmizade"><input type="submit" value="" id="botaoAmizade"></form>';
          document.getElementById('formAmizade').innerHTML = '<input type="submit" class="w3-btn w3-teal"  style="float: left;width:100%;margin:auto;" value="" id="botaoAmizade">';
          let valorAmizade = 'Adicionar amizade'
          
          if(this.perfil.pedidosAmizade.filter(word => word.from.id==this.$store.getters.id).length > 0){

              valorAmizade = 'Remover pedido'
          }
          else{
          
          if(this.perfil.pedidosAmizade.filter(word => word.to.id==this.$store.getters.id).length > 0){
              valorAmizade = 'Aceitar pedido'
              document.getElementById('botaoAmizade').value=valorAmizade;
              document.getElementById('formAmizadeRecusa').innerHTML = '<input type="submit" class="w3-btn w3-teal"  style="float: left;width:100%;margin:auto;" value="Recusar pedido" id="botaoAmizadeAceitar">';
          
          }
          else{
          if(this.perfil.amigos.filter(word => word.id==this.$store.getters.id).length > 0){
            valorAmizade = 'Remover amizade'
            document.getElementById('botaoAmizade').value=valorAmizade;
          }
          }
          }
          document.getElementById('botaoAmizade').value=valorAmizade;

          //console.dir(document.getElementById('componentePubs'))//.alteraFeed(this.feed)
          // var PubComp = Vue.extend(PubComponent)
          // var instance = new PubComp({
          //     propsData: { feedProp: this.feed }
          // })
          // instance.$mount() // pass nothing
          // document.getElementById("seraFeed").appendChild(instance.$el)
          //document.getElementById("seraFeed").innerHTML = '<PubComponent :feedProp="this.feed"/>';
          
        }
        this.$refs.componentePubs.alteraFeed(this.feed)
        this.$refs.sideProfile.carregaPerfil(this.perfil)
        this.infoUser = await FeedService.getTotalInfo(this.$store.getters.token,this.$store.getters.id)
        this.$parent.notificacoesHeader(this.infoUser.notificacoes.filter(n => {return !n.vista}))
      

    }catch(e) {
        this.error=e;
        console.log("Erro" + this.error);
    }
  },
  methods:{
     comentar: function(event,id){

        
        try {
           // fazer aqui o post do comentário que para ja nao funciona
            var para = document.createElement("P");                      
            var t = document.createTextNode(event.target.value); 
        
           let body = {
              publicacao: id,
              corpo: t.data
           }
           axios.post('http://localhost:3000/api/pubs/comment',body)

           para.appendChild(t);
            //document.getElementById(id).insertAdjacentHTML('beforeend', '<hr>');
            document.getElementById(id).appendChild(para);
            

        } catch(e){
          //lidar com o erro
          console.log(e)

        }

     },
     funcaoAmizade: function (e){
       e.preventDefault();
       let body = {
         id: this.perfil._id,
         nome: this.perfil.nome
       }
       let url = 'http://localhost:3000/api/perfil/adicionaPedido'

       let valorAmizade = document.getElementById('botaoAmizade').value
       let novoValorAmizade = 'Remover pedido'

       if(valorAmizade == 'Remover pedido'){
          body.notificacao = false
          url = 'http://localhost:3000/api/perfil/recusaPedido'
          novoValorAmizade = 'Adicionar amizade'
       
       }
       else{

         if(valorAmizade == 'Aceitar pedido'){
            url = 'http://localhost:3000/api/perfil/aceitaPedido'
            novoValorAmizade = 'Remover amizade'
         }
         else{
           
           if(valorAmizade == 'Remover amizade'){
              url = 'http://localhost:3000/api/perfil/removeAmizade'
              novoValorAmizade = 'Adicionar amizade'
           }
         }
       }


       FeedService.trataAmizade(this.$store.getters.token,body,url)
          .then(dados => {
            document.getElementById('botaoAmizade').value=novoValorAmizade
            if(valorAmizade == 'Aceitar pedido'){
              document.getElementById('formAmizadeRecusa').innerHTML=''
            }  
          })
          .catch(e => console.dir(e))
     },
     funcaoAmizadeRecusa: function (e){
       e.preventDefault();
        let body = {
         id: this.perfil._id,
         nome: this.perfil.nome,
         recusa: true
       }
        let url = 'http://localhost:3000/api/perfil/recusaPedido'
        let novoValorAmizade = 'Adicionar amizade'
        FeedService.trataAmizade(this.$store.getters.token,body,url)
          .then(dados => {
            document.getElementById('botaoAmizade').value=novoValorAmizade
            document.getElementById('formAmizadeRecusa').innerHTML=''
          })
          .catch(e => console.dir(e))
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
  color: #42b983;
}

.left2{
float:left;
width:50%;
}
</style>
