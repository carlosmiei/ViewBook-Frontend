<template>
<div class="profile w3-container w3-white w3-center w3-margin-top" style="max-width:1200px;margin:auto;border-radius:5px;">
   <hr>
   <div class="container bootstrap snippet">
      <div class="row">
         <div class="col-sm-3">
            <!--left col-->
            <div class="text-center">
               <form id="formFinal" enctype="multipart/form-data" @submit.prevent="mudaFoto($event)">
                  <img v-if="this.info.fotos && this.info.fotos.length>0" :src="'http://localhost:3000/upload/'+ this.info._id + '/Fotos/' + this.info.fotos[0].id" alt="sem img" style="border-radius:5px" height="172" width="172">
                  <img v-else src="https://i.ibb.co/LPs87fX/fb.png" alt="sem img" style="border-radius:5px" height="172" width="172">
                  <h6>Upload a different photo...</h6>
                  <input accept="image/*" type="file" name="foto" id="upload" required=true class="text-center center-block file-upload">
                  <br>
                  <input type="submit" class="w3-btn w3-teal"  value="Alterar Foto" style="float: left;width:100%;margin:auto;"/>
               </form>

            </div>
            <br>
            <hr>
            <ul class="list-group">
               <li class="list-group-item text-muted">Atividade <i class="glyphicon glyphicon-dashboard fa-1x"></i></li>
               <li class="list-group-item text-right"><span class="pull-left"><strong>Publicações</strong></span><p v-if="this.info.publicacoes">{{this.info.publicacoes.length}}</p></li>
               <li class="list-group-item text-right"><span class="pull-left"><strong>Amigos</strong></span><p v-if="this.info.amigos">{{this.info.amigos.length}}</p></li>
            </ul>
         </div>
         <!--/col-3-->
         <div class="col-sm-9">
            <ul class="nav nav-tabs">
               <li class="active"><a data-toggle="tab" href="#home">Meu perfil</a></li>
            </ul>
            <div class="tab-content">
               <div class="tab-pane active" id="home">
                 
                  <form class="form" action="http://localhost:3000/api/perfil/alteraInfo" method="post" id="registrationForm" @submit.prevent="submete($event)">
                     <div class="form-group">
                        <div class="col-xs-6">
                           <label for="first_name">
                              <h5  class="w3-text-grey w3-padding-14" >Nome</h5>
                           </label>
                           <input type="text" class="form-control" name="first_name" id="first_name" v-model="info.nome" required=true>
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="col-xs-6">
                           <label for="phone">
                              <h5 class="w3-text-grey w3-padding-14" >Telefone</h5>
                           </label>
                           <input type="text"  pattern="9[1236][0-9]{7}|2[0-9]{8}" title="Insira um número de telemóvel válido" class="form-control" name="phone" id="phone" v-model="info.telefone">
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="col-xs-6">
                           <label for="sexo">
                              <h5 class="w3-text-grey w3-padding-14" >Sexo</h5>
                           </label>
                           <input disabled type="text" class="form-control" name="sexo" id="sexo" v-model="info.sexo">
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="col-xs-6">
                           <label for="email">
                              <h5 class="w3-text-grey w3-padding-14">Email</h5>
                           </label>
                           <input type="email" class="form-control" name="email" id="email" v-model="info.email" required=true>
                        </div>
                     </div>
                     <div class="form-group">
                        <div v-if="this.info.morada">
                          
                           <div class="row3"> <label><h5 class="w3-text-grey w3-padding-14" >Rua</h5></label> <input type="text" class="form-control" id="rua" v-model="info.morada.rua"> </div>
                           <div class="row3"> <label><h5 class="w3-text-grey w3-padding-14" >Localização</h5></label> <input type="text" class="form-control" id="localizacao" v-model="info.morada.localizacao"> </div>
                           <div class="row3"> <label><h5 class="w3-text-grey w3-padding-14" >Código-Postal</h5></label> <input  pattern="[0-9]{4}-[0-9]{3}" title="Insira um código de postal válido" type="text" class="form-control" id="codigoPostal" v-model="info.morada.codigoPostal"> </div>
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="col-xs-6">
                           <label for="password">
                              <h5 class="w3-text-grey w3-padding-14">Password Antiga</h5>
                           </label>
                           <input type="password" class="form-control" name="passwordAntiga" id="passwordAntiga" v-model="info.passwordAntiga">
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="col-xs-6">
                           <label for="password">
                              <h5 class="w3-text-grey w3-padding-14" >Password Nova</h5>
                           </label>
                           <input type="password" class="form-control" name="password" id="password" v-model="info.passwordNova">
                        </div>
                     </div>
                     <div class="form-group">
                        <div >
                           <label for="password2">
                              <h5 class="w3-text-grey w3-padding-14">Verifica password</h5>
                           </label>
                           <input type="password" class="form-control" name="password2" id="password2" v-model="info.passwordNovaVerifica" >
                        </div>
                     </div>
                     <div class="form-group">
                        <div>
                           <br>
                           <input  class="w3-btn w3-teal" value="Guardar" type="submit" style="float: left;width:100%;margin:auto;">
                           <!--	<button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button> -->
                        </div>
                     </div>
                  </form>
                  <hr>
               </div>
               <!--/tab-pane-->
               <!--/tab-pane-->

            </div>
            <!--/tab-pane-->
         </div>
         <!--/tab-content-->
      </div>
      <!--/col-9-->
   </div>
   <!--/row-->
</div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios';
export default {
    components: {

  },
   name: 'ProfileInfoComponent',
    data(){
        return {
            id: this.$store.getters.id,//this.$route.params.id,
            info:{}
        }
    },
    created(){
        axios.get('http://localhost:3000/api/perfil/' + this.id)
        .then((data)=> {
            this.info=data.data;
            if(!this.info.morada) this.info.morada={}

        })
        .catch(erro => console.log(erro))
    },
    methods:{
      submete(e){
      e.preventDefault()

      // verificar

      if (this.info.nome == '') {
          alert('O nome é de preenchimento obrigatório!')
          return false
      }
      if (this.info.email == '') {
          alert('O email é de preenchimento obrigatório!')
          return false
      }
                
      if((!this.info.passwordAntiga && !this.info.passwordNova) || 
            ((this.info.passwordNova == this.info.passwordNovaVerifica) && this.info.passwordAntiga && this.info.passwordNova && this.info.passwordNova != '')){
         const defaultOptions = {
            headers: {
               Authorization: this.$store.getters.token
            },
         };
         let publicacoesAntigas = this.info.publicacoes
         this.info.publicacoes = this.info.publicacoes.map(e => e._id)
         axios.post('http://localhost:3000/api/perfil/alteraInfo', this.info,defaultOptions)
         .then(da => {
            //document.getElementById('registrationForm').reset()
            this.info.passwordNova = null
            this.info.passwordNovaVerifica = null
            this.info.passwordAntiga = null
            alert('Alterações efetuadas com sucesso!')
         })
         .catch(erro => {
            this.info.passwordNova = null
            this.info.passwordNovaVerifica = null
            this.info.passwordAntiga = null
            alert(erro.response.data)
         })
         this.info.publicacoes = publicacoesAntigas
         }else{
            alert('Preencha todos os campos necessários para alterar a password!')
            this.info.passwordNova = null
            this.info.passwordNovaVerifica = null
            this.info.passwordAntiga = null
         }
         
      },
      mudaFoto(e){

        
        var fileInput = document.getElementById('upload');   
        var filename = fileInput.files[0].name;
        var form = $('#formFinal')[0];
        var data = new FormData(form);
        data.append('id', this.info._id)

       let file = data.get('foto')
            let expRegImage = /image/
            let result = expRegImage.test(file.type)
            if(result == true){ 
         
         const defaultOptions = {
            headers: {
               Authorization: this.$store.getters.token
            }
         };
         
         axios.post('http://localhost:3000/api/perfil/novaFoto', data, defaultOptions)
            .then(dados =>{
                 
                // var fotos = this.info.fotos
                var foto ={id:filename}
                this.info.fotos.unshift(foto)
                document.getElementById('formFinal').reset()
                 
                 }
                 )
            .catch(erro => alert('Erro ao inserir a foto, tente novamente!' +erro))

        } else {
            document.getElementById('formFinal').reset()
            alert("Insira um ficheiro válido!");
        }
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block {
  display: block;
  width: 100%;
  border: none;
  background-color: teal;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

.row3{
    float:left;
    width: 33%;
}
</style>
