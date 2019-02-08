<template>
    <div class="pri">
      <!--UPLOAD-->
      <form id="formFinal" @submit.prevent="submitForm" enctype="multipart/form-data"  v-if="isInitial || isSaving"> <hr>
        <hr><h4 class="w3-text-gray"> <b>Inserir Publicação</b></h4>
        <!-- <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ ficheiros.length }} files...
            </p>
        </div> -->        
        <div>
          <div class="selecionaveis">
          <div class="left">
        
          <select required id="statusPub" class="w3-input w3-border w3-white" v-model="status">
              <option value="publico">Pública</option>
              <option value="privado">Privada</option>
              <option value="amigos">Só Amigos</option>
              <option value="" selected disabled hidden>Escolha uma privacidade!</option>
          </select>
          </div>
          <div class="left">
            
            <input required class="w3-input w3-border w3-white" type="date" name="data" v-model="tipo.data"/>
          </div>
          <div class="left">
              
              <select  required id="checkTipo" class="w3-input w3-border w3-white" v-model="tipo.tipo">
                <option value="" selected disabled hidden>Escolha um tipo!</option>
                <option value="casamento">Casamento</option>
                <option value="culinaria">Culinária</option>
                <option value="desportivo">Desportivo</option>
             </select>
          </div>
          </div>
          
          
          <input class="w3-input w3-border w3-white" placeholder="Titulo da publicação" type="text" name="titulo" v-model="tipo.titulo"/>
            <br>
            <textarea class="w3-input w3-border w3-white" cols="50" rows="3" name="descricao" placeholder="[Descrição] Coloca aqui o teu pensamento mais profundo ..." v-model="tipo.descricao"/><br>
        
          <div id="casamento" v-if="tipo.tipo == 'casamento'">

            <div class="left">

            <label><b> Noivo(a)  </b></label>
            <input class="w3-input w3-border w3-white" type="text" name="nubenteA" v-model="tipo.casamento.nubenteA"></input><br>
            </div>
            <div class="left">
            <label><b> Noivo(b) </b></label>
            <input class="w3-input w3-border w3-white" type="text" name="nubenteB" v-model="tipo.casamento.nubenteB"></input><br>
            </div>
            <div class="left">
            <label><b> Local </b></label>
            <input class="w3-input w3-border w3-white" type="text" name="local" v-model="tipo.casamento.local"/><br>
            </div>
          </div>

          <div id="culinaria"  v-if="tipo.tipo == 'culinaria'">
            <div class="instrucoes">
            <label ><b> Instruções </b></label>
            <textarea class="w3-input w3-border w3-white" cols="50" rows="2" name="instrucoes" placeholder="Coloca aqui as instruções do prato." v-model="tipo.culinaria.instrucoes"/>
            <br>
            </div>
            <div class="ingredientes">
              <div class="lista" id="list">
                <div class="lefti">
                  <input class="w3-input w3-border w3-white" type="text" placeholder="Ingrediente 1" id="ing1"/>
                </div>
                <div class="lefti">
                  <input class="w3-input w3-border w3-white" type="text" placeholder="Quantidade 1" id="qnt1"/>
                </div>
                
              </div>
              <div style="width:100%">
              <button class="w3-input w3-border w3-white" v-on:click.prevent="myFunction">Adicionar Ingrediente</button>
              <br>
              </div>

            </div>
          </div>

          <div id="desportivo"  v-if="tipo.tipo == 'desportivo'">
             <div class="lefti">
                  <input class="w3-input w3-border w3-white" type="text" placeholder="Atividade" id="atividade" v-model="tipo.desportivo.atividade"/>
              </div>
              <div class="lefti">
                  <input class="w3-input w3-border w3-white" type="text" placeholder="Duracao" id="duracao" v-model="tipo.desportivo.duracao" />
              </div>
              <br>
              <br>
              <div class="lefti">
                  <input class="w3-input w3-border w3-white" type="text" placeholder="Calorias" id="calorias" v-model="tipo.desportivo.calorias"/>
              </div>
              <div class="lefti">
                  <input class="w3-input w3-border w3-white" type="text" placeholder="Ritmo Cardíaco" id="ritmo" v-model="tipo.desportivo.ritmoCardiaco"/>
              </div>
            <hr>
            <hr>
          </div> 
          <button class="w3-btn w3-light-grey w3-border-teal"  style="float: left;width:100%;margin:auto;" id="novoFicheiro">Carregue para adicionar mais ficheiros!</button>
          <div id="ficheiros">
              <div class="left">
              <input type="file" name="ficheiro1" class="w3-input" title=" ola"/>
              
          </div>
          </div>
          
          <br>

          <!-- <div id= "formTipo">

          <br>
          </div> -->
         
        </div>
        <input type="submit" class="w3-btn w3-teal"  style="float: left;width:100%;margin:auto;" value="Publicar"/>
      </form>
      <!--SUCCESS-->
      <div v-if="isSuccess">
        <h2>Uploaded {{ ficheiros.length }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <ul class="list-unstyled">
          <li v-for="item in ficheiros"
              v-bind:item="item" 
              v-bind:key="item.name" >
            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.name">
          </li>
        </ul>
      </div>
      <!--FAILED-->
      <div v-if="isFailed">
        <h2 class="w3-red">ERRO!</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
    </div>
  
</template>

<script>
  // swap as you need
  //import { upload } from './file-upload.fake.service'; // fake service
  import { upload, analisaHashtags } from '../InserirPub';   // real service
  //import { wait } from './utils';

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    name: 'InsertPubComponent',
    data() {
      return {
        contador:1,
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos',
        descricao: '',
        tipo: {
          titulo: '',
          data: '',
          descricao: '',
          tipo: 'normal',
          casamento:{
            nubenteA: '',
            nubenteB: '',
            local: ''
          },
          culinaria:{
            ingredientes:[
              {
                ingrediente: '',
                quantidade: ''
              }
            ],
            instrucoes:''
          },
          desportivo:{
            atividade: '',
            duracao: '',
            calorias: '',
            ritmoCardiaco: ''
          }
        },
        status: 'publico',
        ficheiros: [],
      }
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    mounted(){
      document.getElementById('formFinal').reset()
    },
    methods: {
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.ficheiros = []
        //this.uploadedFiles = [];
        this.uploadError = null;
      },
      save() {
        // upload data to the server
        const formData = new FormData();
        this.currentStatus = STATUS_SAVING;

        let i = 1;
        let nomeFicheiro = "ficheiro"
        Array
          .from(Array(this.ficheiros.length).keys())
          .map(x => {
            formData.append(nomeFicheiro + i, this.ficheiros[x], this.ficheiros[x].name);
            i++;
          });
        
        formData.append('descricao', this.descricao)
        formData.append('tipo', this.tipo)
        formData.append('status', this.status)

        this.hashtags = analisaHashtags(this.descricao)
        formData.append('hashtags', JSON.stringify(this.hashtags))

        upload(formData)
          //.then(wait(1500)) // DEV ONLY: wait for 1.5s 
          .then(x => {
            //this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;

          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      },
      filesChange(fileList) {
        // handle file changes
        

        if (!fileList.length) return;

        this.currentStatus = STATUS_SAVING

        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            this.ficheiros.push(fileList[x])
          });
        
      },

      submitForm(){

      var now = new Date();
      var dateF =  now.getUTCDate() + "-" +
          (now.getUTCMonth() + 1).toString() +
          "-" + now.getUTCFullYear().toString() + " " + now.getUTCHours() +
          ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds();
          
        var form = $('#formFinal')[0];
        var data = new FormData(form);
        
        let tipoEnviar = {}
        
        tipoEnviar.titulo = this.tipo.titulo
        tipoEnviar.data = this.tipo.data
        tipoEnviar.descricao = this.tipo.descricao
        tipoEnviar.tipo = this.tipo.tipo

        if(this.tipo.tipo == 'casamento'){
          tipoEnviar.casamento = this.tipo.casamento
        }else{
          if(this.tipo.tipo == 'culinaria'){
            tipoEnviar.culinaria = this.tipo.culinaria
            this.preencheIngredientes()
          }else{
            if(this.tipo.tipo == 'desportivo'){
              tipoEnviar.desportivo = this.tipo.desportivo
            }
          }
        }

        let hashs = analisaHashtags(this.tipo.descricao)  
        data.append('hashtags', JSON.stringify(hashs))
        data.append('tipo', JSON.stringify(tipoEnviar))
        data.append('data',dateF)

        data.append('status', this.status)
        
        upload(data)
          //.then(wait(1500)) // DEV ONLY: wait for 1.5s 
          .then(x => {
              this.$parent.adicionaPub(x)
            //this.uploadedFiles = [].concat(x);
            //this.currentStatus = STATUS_SUCCESS;
            document.getElementById('formFinal').reset()
            document.getElementById('ficheiros').innerHTML ='<div class="left"> <input class="w3-input" type="file" name="ficheiro1"/></div>';
            
          })
          .catch(err => {
            this.uploadError = 'Erro na inserção da publicação!';
            this.currentStatus = STATUS_FAILED;
          });

          
          
      },
      preencheIngredientes(){
        var i =0;
        this.tipo.culinaria.ingredientes = []
        for (i=1;i<this.contador+1;i++){
            var ing = document.getElementById("ing" + i).value
            var qnt = document.getElementById("qnt" + i).value
          if (ing && qnt) {
            var obj= {

              ingrediente:ing,
              quantidade:qnt
              
            }
            this.tipo.culinaria.ingredientes.push(obj)
          }
           
        }
      }
      ,
      
      myFunction(){

      this.contador++
      var div = document.createElement('div');
      var div2 = document.createElement('div');
      div.className = 'lefti';
      div2.className = 'lefti';
      
      div.innerHTML ='<input class="w3-input w3-border w3-white" type="text" placeholder="Ingrediente' +this.contador + '" name="name" value="" id="ing'+this.contador+'"/>';
      div2.innerHTML ='<input class="w3-input w3-border w3-white" type="text" placeholder="Quantidade' +this.contador + '" name="name" value="" id="qnt'+this.contador+'"/>';

      document.getElementById('list').appendChild(div);
      document.getElementById('list').appendChild(div2);

      
    }

    },

    mounted() {
      this.reset();
    },

  }

  // depois vemos
  $(()=>{




    let numeroFiles = 2;

    $("#novoFicheiro").click(function(e) {
        e.preventDefault()
        $("#ficheiros").append('<div class="left"> <input class="w3-input" type="file" name="ficheiro' + numeroFiles + '"/></div>');
        numeroFiles++;
        
      
    })


  })

</script>

<style>
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
  
  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  
  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }
  
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

  .left{
  float:left;
  padding:2%;
   width:33%;

}

  .lefti{
  float:left;
   width:50%;
 

}

.clear{
  clear:both;
}



.selecionaveis{

}

::-webkit-input-placeholder {

   text-align: center;

}

:-moz-placeholder { /* Firefox 18- */

   text-align: center;

}

::-moz-placeholder {  /* Firefox 19+ */

   text-align: center;

}

:-ms-input-placeholder {  

   text-align: center;

}


</style>