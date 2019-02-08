<template>
<div>
      <header  style="max-width: 85%; margin:auto;">
      <ul>
  <li class="header"><a href="/login">Login</a></li>  
</ul>
</header>
<div class="register w3-container w3-white w3-center w3-margin-top" style="max-width:1190px;margin:auto;">
      <div class="w3-center w3-margin-top">
</div>
   <div class="container bootstrap snippet">
      <div class="row">
         <!--/col-3-->
         <div >

            <div class="tab-content">
               <div class="tab-pane active" id="home">
                  <form class="form" enctype="multipart/form-data" id="registrationForm" @submit.prevent="submete()">
                     <div class="form-group">
                           <label for="email">
                              <h5 class="w3-text-grey w3-padding-14">Email</h5>
                           </label>
                           <input type="email" class="form-control" name="email" id="email" v-model="registo.email" required=true>
                     </div>
                     <div class="form-group">
                           <label for="nome">
                              <h5 class="w3-text-grey w3-padding-14" >Nome</h5>
                           </label>
                           <input type="text" class="form-control" name="nome" id="nome" v-model="registo.nome" required=true>
                     </div>
                     <div class="form-group">
                        <div class="col-xs-6">
                           <label for="rua">
                              <h5 class="w3-text-grey w3-padding-14">Rua</h5>
                           </label>
                           <input type="rua" class="form-control" id="rua" v-model="registo.morada.rua">
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="col-xs-4">
                           <label for="localizacao">
                              <h5 class="w3-text-grey w3-padding-14">Localização</h5>
                           </label>
                           <input type="localizacao" class="form-control" id="localizacao" v-model="registo.morada.localizacao">
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="col-xs-2">
                           <label for="codigoPostal">
                              <h5 class="w3-text-grey w3-padding-14">Código Postal</h5>
                           </label>
                           <input type="codigoPostal" pattern="[0-9]{4}-[0-9]{3}" title="Insira um código de postal válido" class="form-control" id="codigoPostal" v-model="registo.morada.codigoPostal">
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="col-xs-6">
                           <label for="telefone">
                              <h5 class="w3-text-grey w3-padding-14">Telefone</h5>
                           </label>
                           <input type="text" class="form-control" pattern="9[1236][0-9]{7}|2[0-9]{8}" title="Insira um número de telemóvel válido" name="telefone" id="telefone" v-model="registo.telefone">
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="col-xs-6">
                           <label for="nascimento">
                              <h5 class="w3-text-grey w3-padding-14">Data de Nascimento</h5>
                           </label>
                           <input type="date" class="form-control" name="nascimento" id="nascimento" v-model="registo.nascimento">
                        </div>
                     </div>
                     
                     <div class="form-group">
                           
                           <label for="sexo">
                              <hr>
                              <h5 class="w3-text-grey w3-padding-14">Sexo</h5>
                           </label>
                           <br>
                           <label class="radio-inline">
                              <input type="radio"  name="sexo" value="M" v-model="registo.sexo" > Masculino
                           </label>
                           <label class="radio-inline">
                              <input type="radio" name="sexo" value="F" v-model="registo.sexo" > Feminino
                           </label>                           
                           <label class="radio-inline">
                              <input type="radio" name="sexo" value="O" v-model="registo.sexo" > Outro
                           </label>
                     </div>
                     <div class="form-group">
                        <div class="col-xs-6">
                           <label for="password">
                              <h5 class="w3-text-grey w3-padding-14">Password</h5>
                           </label>
                           <input type="password" class="form-control" name="password" id="password" v-model="registo.password" required=true>
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="col-xs-6">
                           <label for="password2">
                              <h5 class="w3-text-grey w3-padding-14">Confirme a Password</h5>
                           </label>
                           <input type="password" class="form-control"  required=true name="password2" id="password2" v-model="registo.passwordConfirma">
                        </div>
                     </div>
                     <div id="foto">
                        <label> <h5 class="w3-text-grey w3-padding-14">Foto de Perfil</h5> </label>
                        <input type="file" required name="foto" class="w3-input" title="FotoPerfil"/>
                     </div>
                     <div class="form-group">
                        <div class="col-xs-12">
                           <br>
                           <input type="submit" class="w3-btn w3-teal" style="float: left;width:100%;margin:auto;" value="Save"/>
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
</div>
</template>

<script>
import axios from 'axios';
export default {
   components: {

   },
   name: 'RegisterComponent',
   data(){
      return {
         //id: this.$route.params.id,
         registo:{
            email: '',
            password: '',
            passwordConfirma: '',
            nome: '',
            sexo: '',
            nascimento: '',
            morada:{
               rua: '',
               codigoPostal: '',
               localizacao: ''
            },
            fotos: [],
            publicacoes: [],
            amigos: []
         }
      }
   },
   methods:{
      submete(){
         //e.preventDefault()
         // Depois se quisermos podemos por isto a redirecionar para uma pagina de sucesso
         
         if(this.registo.password == this.registo.passwordConfirma){
            var form = $('#registrationForm')[0];
            var data = new FormData(form);
            let file = data.get('foto')
            let expRegImage = /image/
            data.append('morada', JSON.stringify(this.registo.morada))
            //let nomeFicheiro = file.name.replace(/ /g, "%20")
            let result = expRegImage.test(file.type)
            //data.append('nomeFicheiro', nomeFicheiro)
            if(result == true){
            axios.post('http://localhost:3000/api/users/registo', data)
               .then(dados => this.$router.push('/'))
               .catch(erro => console.log('Erro ao registar utilizador ' + erro))
            }else
               alert('Deve inserir um tipo de ficheiro válido ...')
         }else{
            alert('As passwords não coincidem ...')
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
