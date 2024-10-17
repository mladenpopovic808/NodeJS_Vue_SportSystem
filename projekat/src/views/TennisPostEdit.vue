<template>

    <div id="app">
        <Header subtitle="Izmenite vasu objavu "/>

      <h4>Izmena</h4>
      <b-form >
        <b-form-group label="Naslov:" label-for="title">
          <b-form-input id="title" v-model="tennisPost.title" placeholder="Naslov" min="3" max="30" required></b-form-input>
        </b-form-group>
  
        <b-form-textarea id="text" v-model="tennisPost.text"  placeholder="O cemu razmisljate?" rows="3" required>>
          
        </b-form-textarea>
        <br>
        <button @click="submitTennisPost()">Submit post</button>
        
      </b-form>
   
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
                title: this.$route.params.post.title,
                text: this.$route.params.post.text,
                userId: localStorage.userId,
                id: this.$route.params.post.id,
            }
        }  
      },
      mounted() {

      },
      computed: {
         
       },
      methods: {
       

     submitTennisPost() {

        this.$socket.emit('editTennisPost', { title: this.tennisPost.title, text: this.tennisPost.text,id:this.tennisPost.id, userId:localStorage.loggedUserId,token: localStorage.token });
        this.$router.push({ name: 'tennisPostsView' });
        }
      }
    }
  
  </script>
  
  <style scoped>
  
  </style>
  