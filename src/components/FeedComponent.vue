<template>
<div class="container">
<!-- The Grid -->
<div class="w3-row-padding">

    <!-- Left Column -->
    <div class="w3-third borda" >
    
      <SideProfileComponent ref='sideProfile'/>
    <!-- End Left Column -->
    </div>




    <!-- Right Column -->
    
    <div class="w3-twothird w3-margin-bottom w3-card">
      <div class="utilizador left2">
        <div v-on:submit.prevent="pesquisarNome">
        <form class="form" action="##" method="post" id="searchName">
          <input type="text" class="form-control" name="nome" id="nome" placeholder="Pesquisar utilizador por nome"  required=true v-model="pesquisaNome">
           <button class="w3-btn w3-teal"  style="float: left;width:100%;margin:auto;" > Pesquisar Utilizador</button>
        </form>
         </div>
        </div>

      
    <div class="hashtag left2">
    <div  v-on:submit.prevent="pesquisar">
        <form class="form" action="##" method="post" id="searchHashtag">
          <input type="text" class="form-control" name="password" id="hash" required=true placeholder="Pesquisar hashtag"  v-model="hashtag">
           <button class="w3-btn w3-teal"  style="float: left;width:100%;margin:auto;" > Pesquisar Hashtag</button>
        </form>
        
      </div>
      </div>
      
      
      <hr>
      <InsertPubComponent/>
      <PubComponent ref="pubComponent" linkFeed="http://localhost:3000/api/feed"/>

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
  name: 'FeedComponent',
  data(){
    return {
      feed:[],
      error:'',
      todo:[{text:"abc"},{text:"cde"},{text:"def"}],
      hashtag:'',
      pesquisaNome: '',
      infoUser: '',
      id:''
    }
  },
  async created(){
    try{
      this.infoUser = await FeedService.getTotalInfo(this.$store.getters.token,this.$store.getters.id)
      this.$parent.notificacoesHeader(this.infoUser.notificacoes.filter(n => {return !n.vista}))
      this.$refs.sideProfile.carregaPerfil(this.infoUser)
      
    }
    catch(e){
      alert(e)
    }
  },
   watch:{
     feed(val) {
      this.feed= val;
       
    },
  },
  methods:{
    adicionaPub(pub){
      this.$refs.pubComponent.adicionaPub(pub)

    },
     pesquisar: function (event) {
        axios.get('http://localhost:3000/api/hashtag/' + this.hashtag)
        .then((data)=> {
            this.feed=data.data.publicacoes;
            this.$refs.pubComponent.alteraFeed(this.feed)            
        })
        .catch(erro => alert(erro))

     },
     pesquisarNome: function (event) {
        this.$router.push('/nome/'+this.pesquisaNome)
     },
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
          alert(e)

        }

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

.borda{
  border:solid 4px white;
  border-radius: 3px;
}
</style>
