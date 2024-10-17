<template>

    <div id="app">
      <Header subtitle="Teniske objave "/>

      <h4>Unesite novu objavu</h4>
      <b-form @submit="submitTennisPost">
        <b-form-group label="Naslov:" label-for="title">
          <b-form-input id="title" v-model="tennisPost.title" placeholder="Naslov" min="3" max="30" required></b-form-input>
        </b-form-group>
  
        <b-form-textarea id="text" v-model="tennisPost.text"  placeholder="O cemu razmisljate?" rows="3" required>>
          
        </b-form-textarea>
        <br>
        <button @click="submitTennisPost()">Submit post</button>
        
      </b-form>

      <TennisPosts/>
    </div>
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import TennisPosts from '@/components/TennisPosts.vue';
    import { mapState,mapActions } from 'vuex';
  
    export default {
      name: 'TenisPostsView',
      
      components: {
        Header,
        TennisPosts,
      },
  
      data() {
        return {
          tennisPost: {
            title: '',
            text: '',
            userId: localStorage.userId,
          }
        }  
      },
      mounted() {
          this.fetchTennisPosts();
      },
      computed: {
         ...mapState([
           'loggedUserId'
         ])
       },
      methods: {
        ...mapActions([
          'fetchTennisPosts',
          'addTennisPost',
        ]),

        submitTennisPost() {
          this.tennisPost.userId=this.loggedUserId;
          
          //this.addTennisPost(this.tennisPost);
          this.$socket.emit('tennisPost', { title: this.tennisPost.title, text: this.tennisPost.text, userId:localStorage.loggedUserId,token: localStorage.token });
          this.tennisPost = {
            title: '',
            text: '',
            userId: localStorage.userId,
          };
        }
      }
    }
  
  </script>
  
  <style scoped>
  
  </style>
  