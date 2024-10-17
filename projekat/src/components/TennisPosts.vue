<template>
  <div>
    

    <b-card v-if="this.tennisPosts" >
    <b-media  v-for="post in tennisPosts">
      
      <template #aside>
        <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
      </template>
      <p>Korisnik: {{getUsernameById(post)}}</p>

      <h5 class="mt-0">{{post.title}}</h5>
      <p>
        {{post.text}}
      </p>
      <b-button v-if="isThatCurrentUsersPost(post)" @click="changeYourPost(post)"  variant="primary">Izmenite svoju objavu</b-button>
      <br>
      <hr>
    </b-media>
  </b-card>
    
  </div>
</template>

<script>
  import { mapActions, mapState,mapMutations } from 'vuex';

  export default {
    name: 'TennisPostEdit',

    props: {
      image: Object
    },

    data() {
      return {
        
      }
    },
    mounted() {
      this.fetchUsers();
    },
    computed: {
      ...mapState([
        'token',
        'tennisPosts',
        'loggedUserId',
        'users'
      ])
    },
    methods: {
      ...mapActions([
        'fetchUsers',
      ]),
      isThatCurrentUsersPost(post){
        if(post.userId==this.loggedUserId){
          return true;
        }
        return false
      }, 
      changeYourPost(post){
        
        this.$router.push( {name: 'tennisPostEdit',params:{post:post}});

      }, 
      getUsernameById(post){
        for(let i=0;i<this.users.length;i++){
          if(this.users[i].id==post.userId){
            return this.users[i].username;
          }
        }
      },
    }
  }

</script>

<style scoped>
  .card {
    margin-top: 10px;
    text-align: left;
  }

  .card-title {
    margin-bottom: 0px;
  }

  .card-body {
    padding-bottom: 5px;
  }
</style>