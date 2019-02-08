<template>
<footer class="w3-container w3-teal w3-center w3-margin-top" style="border-radius:8px;max-width: 85%; margin:auto;">
      <i class="fas fa-check w3-hover-opacity"></i>
      <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">Desenvolvimento de aplicações WEB</a></p>
</footer>

</template>

<script>

export default {
  name: 'FeedComponent',
  data(){
    return {
      error:'',
    }
  },  
  async created(){
    try{
        
    }catch(e) {
        this.error=e.message;
        alert("Erro" + this.error);
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
</style>
