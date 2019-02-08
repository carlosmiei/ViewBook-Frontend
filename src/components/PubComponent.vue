<template>
  <div class="w3-container w3-card w3-white w3-margin-bottom">
    <h2 class="w3-text-grey w3-padding-16">
      <i class="fa fa-camera-retro fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Feed de publicações
    </h2>
    <hr>
    <div v-if="$route.path=='/feed' || $route.path=='/'" class="w3-bar w3-light-grey">
      <div class="w3-dropdown-hover">
        <button class="w3-button w3-teal">Filtrar Tipo</button>
        <div class="w3-dropdown-content w3-bar-block w3-card-4">
          <a v-on:click="filtraTipo('culinaria')" class="w3-bar-item w3-button">Culinária</a>
          <a v-on:click="filtraTipo('casamento')" class="w3-bar-item w3-button">Casamento</a>
          <a v-on:click="filtraTipo('desportivo')" class="w3-bar-item w3-button">Desportivo</a>
          <a v-on:click="filtraTipo('normal')" class="w3-bar-item w3-button">Outros</a>
        </div>
      </div>
    </div>
    <div class="post" v-for="(f,indexPub) in feed" v-bind:item="f" v-bind:key="indexPub">
      <!-- Comentarios-->
      <div class="w3-container" id="pub">
        <br>
        <h4 class="w3-opacity">
          <b>{{f.tipo.titulo}}</b>
        </h4>

        <!-- <h6 class="w3-text-teal left"><i class="fa far fa-thumbs-up w3-margin-right"></i>:  <a  onclick="AddValue()">0</a></h6> -->
        <h5 class="w3-text-teal leftInfo">
          <i class="fas fa-address-card fa-fw w3-margin-right"></i>
          <a :href="'/profile/'+ f.autor.id">{{f.autor.nome}}</a>
        </h5>
        <h6 class="w3-text-teal leftInfo">
          <i class="fa fa-calendar fa-fw w3-margin-right"></i>
          {{f.tipo.data}}
        </h6>
        <h5 class="w3-text-gray leftInfo">
          <i class="fa fa-globe fa-fw w3-margin-right"></i>
          {{f.status}}
        </h5>
        <h5 class="w3-text-gray leftInfo">
          <i class="fa fa-lightbulb-o fa-fw w3-margin-right"></i>
          {{f.tipo.tipo}}
        </h5>

        <div v-if="f.autor.id ==user">
          <select
            @change="changeHandler($event)"
            :id="f._id"
            name="mySelect"
            class="w3-input w3-border w3-white"
          >
            <option value="publico" selected>Pública</option>
            <option value="privado">Privada</option>
            <option value="amigos">Só Amigos</option>
          </select>
        </div>
        <h6 class="w3-text-gray">{{f.data}}</h6>
        <h5 class="w3-text-gray" align="center">
          <b>Descrição da publicação</b>
        </h5>

        <!-- Imprimir hashtags-->
        <p id="par" align="justify">{{f.tipo.descricao}}</p>

        <!-- Imprimir Consoante as pubs-->
        <hr>
        <div v-if="f.tipo.tipo=='casamento'">
          <h5 class="left">
            <i class="fa fa-heart coracao"></i>
            {{f.tipo.casamento.nubenteA}}
          </h5>
          <h5 class="left">
            <i class="fa fa-heart coracao"></i>
            {{f.tipo.casamento.nubenteB}}
          </h5>
          <h5 class="left">
            <i class="fas fa-church clock"></i>
            {{f.tipo.casamento.local}}
          </h5>
        </div>

        <div v-if="f.tipo.tipo=='desportivo'">
          <h5 class="left4">
            <i class="fas fa-running run"></i>
            {{f.tipo.desportivo.atividade}}
          </h5>
          <h5 class="left4">
            <i class="fa fa-clock-o clock"></i>
            {{f.tipo.desportivo.duracao}}
          </h5>
          <h5 class="left4">
            <i class="fas fa-fire-alt fogo"></i>
            {{f.tipo.desportivo.calorias}} cal
          </h5>
          <h5 class="left4">
            <i class="fa fa-heartbeat coracao"></i>
            {{f.tipo.desportivo.ritmoCardiaco}} bpm
          </h5>
        </div>
        <div v-if="f.tipo.tipo=='culinaria'">
          <div id="pub2">
            <h5 class="w3-text-gray" align="center">
              <b>Instruções de confecionamento do prato</b>
            </h5>
            <p id="instrucoesP" align="justify">{{f.tipo.culinaria.instrucoes}}</p>

            <hr>
            <h5 class="w3-text-gray" align="center">
              <b>Ingredientes Utilizados</b>
            </h5>
            <div v-if="f.tipo.culinaria.ingredientes.length>0">
              <table class="w3-table-all w3-hoverable w3-centered">
                <tr class="w3-teal">
                  <th align="center">Ingrediente</th>
                  <th align="center">Quantidade</th>
                </tr>
                <tr
                  v-for="ingrediente in f.tipo.culinaria.ingredientes"
                  v-bind:item="ingrediente"
                  v-bind:key="ingrediente._id"
                >
                  <td align="center">{{ingrediente.ingrediente}}</td>
                  <td align="center">
                    <b>{{ingrediente.quantidade}}</b>
                  </td>
                </tr>
              </table>
              <hr>
            </div>
          </div>
        </div>

        <!-- Imprimir Imagens-->
        <div v-if="f.fotos.length>0">
          <carousel-3d>
            <slide v-for="(imagem,i) in f.fotos" :index="i" :key="i">
              <img
                :src="'http://localhost:3000/upload/'+ f.autor.id + '/' + f._id + '/' + imagem._id"
                height="270"
                width="360"
              >
            </slide>
          </carousel-3d>
        </div>

        <!-- Imprimir Aqui ficheiros-->
        <div v-if="f.ficheiros.length>0">
          <table class="w3-table-all w3-hoverable w3-centered">
            <tr class="w3-teal">
              <th align="center">Nome do ficheiro</th>
              <th align="center">Formato</th>
            </tr>
            <tr v-for="file in f.ficheiros" v-bind:item="file" v-bind:key="file._id">
              <td align="center">
                <a
                  :href="'http://localhost:3000/upload/'+ f.autor.id + '/' + f._id + '/' + file._id"
                >{{file._id}}</a>
              </td>
              <td align="center">
                <b>{{file.formato}}</b>
              </td>
            </tr>
          </table>
        </div>
        <!-- Imprimir Aqui HASHTAGS -->
        <div class="hash" v-for="h in f.hashtags" v-bind:item="h" v-bind:key="h._id">
          <div style="float:left;">
            <a class="w3-text-teal left">
              <b>#{{h}}&emsp;</b>
            </a>
          </div>
        </div>
        <hr>
        <hr>
        <div>
          <img
            src="https://i.ibb.co/rdxRjq4/like.png"
            height="25"
            width="25"
            v-on:click="gostoPub(indexPub,f.autor.id,f._id,f.likes)"
          >
          <a
            v-if="temLike(f.likes)==false"
            v-on:click="gostoPub(indexPub,f.autor.id,f._id,f.likes)"
          >Gostar</a>
          <a
            v-if="temLike(f.likes)==true"
            v-on:click="gostoPub(indexPub,f.autor.id,f._id,f.likes)"
          >Gostei</a>
          <a>:</a>
          <a>{{f.likes.length}}</a>
          <input type="hidden" :id="f._id+'firstlike'" name="custId" value="True">
        </div>

        <hr>
        <h5 class="w3-text-gray" align="center">
          <b>Comentários</b>
        </h5>
        <!-- Comentario-->
        <div :id="f._id + 'com'" class="w3-container w3-light-grey">
          <div
            class="w3-container w3-light-grey"
            v-for="(c,indexCom) in f.comentarios"
            v-bind:key="indexCom"
          >
            <h6 class="w3-text-teal">
              <i class="fa fa-calendar fa-fw w3-margin-right"></i>
              {{c.data}}
            </h6>
            <div>
              <a
                v-if="temLike(c.likes)==false"
                v-on:click="gostoCom(indexPub,indexCom,f.autor.id,f._id,c._id,c.likes,c.autor.id)"
              >Gostar:</a>
              <a
                v-if="temLike(c.likes)==true"
                v-on:click="gostoCom(indexPub,indexCom,f.autor.id,f._id,c._id,c.likes,c.autor.id)"
              >Gostei:</a>
              
              <a>{{c.likes.length}}</a>
              <a>gostos</a>
              <input type="hidden" :id="c._id+'firstlike'" value="True">
            </div>

            <p>
              <a :href="'/profile/'+ c.autor.id">
                <b>{{c.autor.nome}}</b>
              </a> comentou:
              <br>
              {{c.corpo}}
            </p>

            <div :id="c._id" class="w3-container w3-white">
              <!-- Comentario Aninhado-->
              <div
                class="w3-container w3-white"
                v-for="(nested,indexNested) in c.comentarioAninhado"
                v-bind:key="indexNested"
              >
                <h6 class="w3-text-teal">
                  <i class="fa fa-calendar fa-fw w3-margin-right"></i>
                  {{nested.data}}
                </h6>
                <div>
                  <a
                    v-if="temLike(nested.likes)==false"
                    v-on:click="gostoNested(indexPub,indexCom,indexNested,f._id,c._id,nested._id,nested.likes,f.autor.id,c.autor.id,nested.autor.id)"
                  >Gostar:</a>
                  <a
                    v-if="temLike(nested.likes)==true"
                    v-on:click="gostoNested(indexPub,indexCom,indexNested,f._id,c._id,nested._id,nested.likes,f.autor.id,c.autor.id,nested.autor.id)"
                  >Gostei:</a>
                  
                  <a>{{nested.likes.length}}</a>
                  <a>gostos</a>
                  <input type="hidden" :id="nested._id+'firstlike'" value="True">
                </div>
                <p>
                  <a :href="'/profile/'+ nested.autor.id">
                    <b>{{nested.autor.nome}}</b>
                  </a> respondeu:
                  <br>
                  {{nested.corpo}}
                </p>
                <hr style="border-top: 1px solid #ccc;">
              </div>
            </div>
            <div>
              <input
                type="text"
                :id="c._id+ 'inputA'"
                class="form-control"
                name="coment"
                placeholder="Responda a este comentário!"
                v-on:keydown.enter.prevent="comentarA($event,f._id,c._id,c.autor.id,f.autor.id,c.comentarioAninhado)"
              >
            </div>
            <hr style="border-top: 1px solid #ccc;">
          </div>
        </div>
        <form class="form">
          <input
            type="text"
            :id="f._id+ 'input'"
            class="form-control"
            style="border:2px solid #008080"
            placeholder="Faça um comentario!"
            v-on:keydown.enter.prevent="comentar($event,f._id,f.comentarios,f.autor.id)"
          >
        </form>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import FeedService from "../FeedService";
import axios from "axios";
import Vue from "vue";
export default {
  components: {},
  props: {
    linkFeed: String,
    feedProp: Array
  },
  name: "PubComponent",
  data() {
    return {
      feed: [],
      user: "",
      nome: ""
    };
  },

  async created() {
    try {
      if (this.linkFeed) {
        this.feed = await FeedService.getFeed(
          this.$store.getters.token,
          this.linkFeed
        );
        this.user = this.$store.getters.id;
        this.nome = this.$store.getters.nome;
      } else {
        if (this.feedProp) {
          console.dir(this.feedProp);
        }
      }
    } catch (e) {
      this.error = e;
      console.log("Erro" + this.error);
    }
  },
  methods: {
    async filtraTipo(tipo) {
      try {
        var res = await axios.get(
          "http://localhost:3000/api/pubs?tipo=" + tipo
        );
        console.dir(res);
        this.feed = res.data;
      } catch (e) {
        alert("Erro ao pesquisar por tipo, tente novamente!");
      }
    },
    adicionaPub(pub) {
      this.feed.unshift(pub);
    },
    temLike(likes) {
      for (let like in likes) {
        if (likes[like].id == this.user) {
          return true;
        }
      }
      return false;
    },
    alteraStatus(id, status, autor) {
      //só podiamos deixar fazer isto se o autor fosse o mesmo do utilizador logado
      axios
        .put("http://localhost:3000/api/pubs/status/" + id + "/" + status)
        .then(dados => console.log(dados))
        .catch(erro => console.log(erro));
      this.status = "";
    },
    alteraFeed(feed) {
      this.feed = feed;
    },
    changeHandler(event) {
      this.status = event.target.value;
      // document.getElementById("demo").innerHTML = "You selected: " + x;
    },
    async comentar(event, id, comentarios, autorPub) {
      var notificacoes = [];
      if (this.user != autorPub) notificacoes.push(autorPub);

      for (let comentario in comentarios) {
        let user = comentarios[comentario].autor.id;
        if (notificacoes.indexOf(user) == -1 && this.user != user) {
          notificacoes.push(user);
        }
      }

      try {
        var now = new Date();
        var dateF =
          now.getUTCDate() +
          "-" +
          (now.getUTCMonth() + 1).toString() +
          "-" +
          now.getUTCFullYear().toString() +
          " " +
          now.getUTCHours() +
          ":" +
          now.getUTCMinutes() +
          ":" +
          now.getUTCSeconds();

        let body = {
          publicacao: id,
          corpo: event.target.value,
          data: dateF,
          usersNotificados: notificacoes
        };
        var res = await axios.post(
          "http://localhost:3000/api/pubs/comment",
          body
        );

        for (var pub in this.feed) {
          if (this.feed[pub]._id == res.data._id) {
            Vue.set(this.feed[pub], "comentarios", res.data.comentarios);
            break;
          }
        }
        document.getElementById(id + "input").value = "";
        // por aqui limpar input
      } catch (e) {
        //lidar com o erro
        console.log(e);
      }
    },
    alteraFeed(f) {
      this.feed = f;
    },
    async comentarA(event, idPub, id, comentarioPai, autorPub, comentarios) {
      var notificacoes = [];

      if (this.user != autorPub) notificacoes.push(autorPub);

      if (this.user != comentarioPai) notificacoes.push(comentarioPai);

      for (let comentario in comentarios) {
        let user = comentarios[comentario].autor.id;
        if (notificacoes.indexOf(user) == -1 && this.user != user) {
          notificacoes.push(user);
        }
      }

      var now = new Date();
      var dateF =
        now.getUTCDate() +
        "-" +
        (now.getUTCMonth() + 1).toString() +
        "-" +
        now.getUTCFullYear().toString() +
        " " +
        now.getUTCHours() +
        ":" +
        now.getUTCMinutes() +
        ":" +
        now.getUTCSeconds();

      let body = {
        comentario: id,
        publicacao: idPub,
        corpo: event.target.value,
        data: dateF,
        usersNotificados: notificacoes
      };

      try {
        var res = await axios.post(
          "http://localhost:3000/api/pubs/nestedComment",
          body
        );

        for (var pub in this.feed) {
          if (this.feed[pub]._id == res.data._id) {
            Vue.set(this.feed[pub], "comentarios", res.data.comentarios);
            break;
          }
        }

        document.getElementById(id + "inputA").value = "";
      } catch (e) {}
    },
    gostoPub(indexRecebidoPub, idAutorPub, id, likes) {
      var presente = false;
      var index = -1;
      var indexPub = indexRecebidoPub;
      var notificacoes = [];
      notificacoes.push(idAutorPub);

      var obj = {
        publicacao: id,
        usersNotificados: notificacoes
      };

      for (let like in likes) {
        if (likes[like].id == this.user) {
          presente = true;
          index = like;
          break;
        }
      }
      if (presente == false) {
        var gosto = {
          id: this.user,
          nome: this.nome
        };

        likes.push(gosto);
        Vue.set(this.feed[indexPub], "likes", likes);
        axios.post("http://localhost:3000/api/pubs/gosto", obj);
      } else if (index != -1) {
        likes.splice(index, 1);
        Vue.set(this.feed[indexPub], "likes", likes);
        axios.post("http://localhost:3000/api/pubs/desgosto", obj);
      }
      //fazer aqui o post (relembrando que pode ser uma retirada ou um incremento)
      //axios.post('http://localhost:3000/api/pubs/gosto', obj)
    },
    gostoCom(indexPub, indexCom, idAutorPub, idPub, id, likes, autorCom) {
      var presente = false;
      var index = -1;
      var notificacoes = [];
      notificacoes.push(autorCom);

      var obj = {
        publicacao: idPub,
        comentario: id,
        usersNotificados: notificacoes
      };

      for (let like in likes) {
        if (likes[like].id == this.user) {
          presente = true;
          index = like;
          break;
        }
      }

      if (presente == false) {
        var gosto = {
          id: this.user,
          nome: this.nome
        };
        likes.push(gosto);
        Vue.set(this.feed[indexPub].comentarios[indexCom], "likes", likes);
        axios.post("http://localhost:3000/api/pubs/gosto", obj);
      } else if (index != -1) {
        likes.splice(index, 1);
        Vue.set(this.feed[indexPub].comentarios[indexCom], "likes", likes);
        axios.post("http://localhost:3000/api/pubs/desgosto", obj);
      }
    },
    gostoNested(
      indexPub,
      indexCom,
      indexNested,
      idPub,
      idCom,
      id,
      likes,
      autorPub,
      autorCom,
      autorNested
    ) {
      var presente = false;
      var index = -1;
      var notificacoes = [];
      notificacoes.push(autorNested);

      var obj = {
        publicacao: idPub,
        comentario: idCom,
        comentarioAninhado: id,
        usersNotificados: notificacoes
      };

      for (let like in likes) {
        if (likes[like].id == this.user) {
          index = like;
          presente = true;
          break;
        }
      }

      if (presente == false) {
        var gosto = {
          id: this.user,
          nome: this.nome
        };
        likes.push(gosto);
        Vue.set(
          this.feed[indexPub].comentarios[indexCom].comentarioAninhado[
            indexNested
          ],
          "likes",
          likes
        );
        axios.post("http://localhost:3000/api/pubs/gosto", obj);
      } else if (index != -1) {
        likes.splice(index, 1);
        Vue.set(
          this.feed[indexPub].comentarios[indexCom].comentarioAninhado[
            indexNested
          ],
          "likes",
          likes
        );
        axios.post("http://localhost:3000/api/pubs/desgosto", obj);
      }
    }
  }
};
</script>

<style>
#pub2 {
  border: 1px dotted gray;
  border-radius: 5px;
}

#pub {
  border: 1px solid gray;
  border-radius: 5px;
}

.left {
  float: left;
  padding: 2%;
  width: 33%;
}

.leftInfo {
  float: left;
  padding: 2%;
  width: 25%;
}
.leftH {
  float: left;
}

.left4 {
  float: left;
  padding: 2%;
  width: 25%;
}

.fogo {
  color: orange;
}

.clock {
  color: blue;
}

.run {
  color: teal;
}

.leftHash {
  float: left;
  padding: 2%;
  width: 33%;
}
.formControl {
  outline: none;
  border: 2px solid #008080;
}

.coracao {
  color: red;
}

.instrucoesP {
  border: 10px solid red;
}
</style>
