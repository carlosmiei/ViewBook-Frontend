import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : localStorage.getItem('user') || '',
    nome: localStorage.getItem('nome') || '',
    id: localStorage.getItem('id') || ''
  },
  mutations: {

    auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, args){
        console.log('args;')
        console.dir(args)
        state.status = 'success'
        state.token = args.token
        state.user = args.user
        state.id = args.id
        console.log('IDState: ' + state.user)
        state.nome = args.nome
      },
      auth_error(state){
        state.status = 'error'
      },
      logout(state){
        state.status = ''
        state.token = ''
        state.user = ''
        state.id = ''
        state.nome = ''
      },

  },
  actions: {
    login({commit}, user){
        return new Promise((resolve, reject) => {
          console.log('userr' + user);
          console.dir(user);
          commit('auth_request')
          axios({url: 'http://localhost:3000/api/users/login', data: user, method: 'POST' })
          .then(resp => {
            console.log('TOKEN');
            console.dir(resp)        
            let user = JSON.parse(resp.config.data).email;
            let token = resp.data.token
            let id = resp.data.id
            let nome = resp.data.nome
           
            console.log('USER LOGADO: ' + user);
            console.log('ID LOGADO: ' + id);
            localStorage.setItem('token', token)
            localStorage.setItem('user', user)
            localStorage.setItem('nome', nome)
            localStorage.setItem('id', id)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', {token, user,id,nome})
            console.log('Token depois!')
            console.dir(this.getters.token)
            console.dir(this.getters.id)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
    },
    logout({commit}){
        return new Promise((resolve, reject) => {
          commit('logout')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
      }

  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    token: state => state.token,
    id: state => state.id,
    user: state => state.user,
    nome: state => state.nome

  }
})