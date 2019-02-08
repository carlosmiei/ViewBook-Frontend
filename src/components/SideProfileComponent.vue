<template>
      <div class="pri" >
       <div class="w3-white w3-text-grey w3-card-4">
        <div class="w3-display-container">
          

           <!-- Imprimir foto de perfil-->
            <!-- Imprimir Imagens-->
            <div v-if="perfil.fotos && perfil.fotos.length>0">
                <carousel-3d>
                        <slide v-for="(imagem,i) in perfil.fotos" :index="i" :key="i" >
                            <img :src="'http://localhost:3000/upload/' + perfil._id + '/Fotos/' + imagem.id" height="270" width="360">
                        </slide>
                </carousel-3d>
            </div>
        </div>
        <div class="w3-container">
          <div class="w3-container">
            <h2 v-if="this.perfil.nome" class="w3-text-grey w3-padding-16">{{this.perfil.nome}}</h2>
            <h2 v-else></h2>
          </div>
          <div class="tabela">
            <table  align="center"> 
              <tr v-if="this.perfil.morada">
                  <td > <i class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i></td>
                  <td >
                      <div v-if="this.perfil.morada.rua">
                        {{this.perfil.morada.rua}}
                      </div>
                      <div v-if="this.perfil.morada.localização">
                        {{this.perfil.morada.localização}}
                      </div>
                      <div v-if="this.perfil.morada.codigoPostal">
                        {{this.perfil.morada.codigoPostal}}
                      </div>                    
                  </td>   
              </tr>
              <tr v-if="this.perfil.email">
                 <td><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i></td>
                 <td>{{this.perfil.email}}</td>
              </tr>
              <tr v-if="this.perfil.telefone">
                <td><i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i></td>
                <td>{{this.perfil.telefone}}</td>
              </tr>
              <tr v-if="this.perfil.nascimento">
                <td>
                  <i class="fa fa-birthday-cake fa-fw w3-margin-right w3-large w3-text-teal"></i>
                </td>
                <td>
                  {{this.perfil.nascimento}}
                </td>

              </tr>
              <tr>
                <td>
                  <i class="	fas fa-smile-beam custom fa-fw w3-margin-right w3-large w3-text-teal"></i>
                  
                </td>                 
                <td v-if="this.perfil.sexo=='M'">Masculino</td>          
                <td v-else-if="this.perfil.sexo=='F'">Feminino</td>          
                <td v-else>Outro</td>

              </tr>
            </table>
         
          <hr>
          </div>
          <p v-if="this.perfil.amigos" class="w3-large w3-text-teal"><b><i class="fa fa-globe fa-fw w3-margin-right w3-text-teal"></i><a :href="'/amigos/'+this.perfil._id"> {{this.perfil.amigos.length}} Amigos</a></b></p>
        </div> 
      
      <div class="">
        <br>
        <table class="w3-table-all">
          <tr>
             <th>Atividade</th>
             <td><i class="glyphicon glyphicon-dashboard fa-1x w3-margin-right w3-text-teal"></i></td>
           </tr>
           <hr>
           <tr>
              <th>Publicações</th>
              <td v-if="this.perfil.publicacoes"><b>&ensp;{{this.perfil.publicacoes.length}}</b></td>
           </tr>
         </table>
      </div>
       <hr>       
        <button class="w3-btn w3-teal" type="submit" style="float: left;width:100%;margin:auto;" onclick="window.location.href='/profile/infoPessoais'"><i class="glyphicon glyphicon-ok-sign" > </i> Consultar Perfil</button>
      <hr>
      </div><br>
      </div>
</template>

<script>

export default {
  name: 'SideProfileComponent',
  data(){
    return {
      error:'',
      perfil:''
    }
  },  
  async created(){
    try{
        
    }catch(e) {
        this.error=e.message;
        console.log("Erro" + this.error);
    }
  },
  methods:{
     carregaPerfil: function(per){
       this.perfil = per
       
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

i p{
 display: inline-block;
  margin-right: 1em;
}


</style>
