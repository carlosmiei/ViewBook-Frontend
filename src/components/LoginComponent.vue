<template>
<div class="root">
<div class="w3-center w3-margin-top" style="max-width: 85%; margin:auto;">
<header>
      <ul>
  <li class="header"><a href="/register">Registo</a></li>  
</ul>
</header>
</div>
<div class="register w3-container w3-white w3-center w3-margin-top" style="max-width:1190px;margin:auto;">

   <hr>


   <div class="container bootstrap snippet">
      <div class="row">
         <!--/col-3-->
         <div >

            <div class="tab-content">
               <div class="tab-pane active" id="home">
                  <hr>
                  <div v-if="erro && erro!=''">
                    <h4 class="w3-text-red">{{this.erro.response.data}}</h4>
                  </div>
                  <form class="form" action="##" method="post" id="registrationForm"   @submit.prevent="loginE">
                     <div class="form-group ">
                           <div >
                           <label for="email">
                              <h5>Email</h5>
                           </label>
                           <input type="email" class="form-control" name="email" id="email" required=true v-model="login.email" >
                           </div>
                     </div>
                  
                     <div class="form-group">
                        <div >
                           <label for="password">
                              <h5>Password</h5>
                           </label>
                           <input type="password" class="form-control" name="password" id="password" required=true v-model="login.password">
                        </div>
                     </div>
                     <div class="form-group">
                        <div >
                           <br>
                           <button class="w3-btn w3-teal" type="submit" style="width:50%;margin:auto;" ><i class="glyphicon glyphicon-ok-sign"> </i>Autenticar</button>
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
   name: 'LoginComponent',
   data(){
      return {
         login:{
            email: '',
            password: ''
           
         },
          erro:''
      }
   },
   methods:{
      submete(){

      },
      loginE: function () {
        let email = this.login.email 
        let password = this.login.password
        this.$store.dispatch('login', { email, password })
       .then(() => {this.$router.push('/')}      /*window.location.href = "/feed"*/)
       .catch(err => {this.erro=err;console.dir(err);document.getElementById('registrationForm').reset()})
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
.form-control{
      width: 50%;
      margin:auto;
}
.botao{

 width: 50%;
 margin:auto;

}

.tab-content{
      border-style: solid;
      color:teal;     
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
