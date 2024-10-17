<template>

    <div id="app">
      <Header subtitle="Vasi podaci"/>
      <p>Vas id:  {{this.loggedUser.id }}</p>
      <p>Ime :  {{this.loggedUser.firstName }}</p>
      <p>Prezime :  {{this.loggedUser.lastName }}</p>
      <p>Username:  {{this.loggedUser.username }}</p>
      <p>Email :  {{this.loggedUser.email}}</p>
      
    </div>
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import {mapState, mapActions } from 'vuex';
  
    export default {
      name: 'UserInformationsView',
      
      components: {
        Header,
        
      },
  
      data() {
        return {
         
        }
          
      },

      computed: {
    ...mapState([
      'loggedUser'
    ])
  },
  
     mounted() {
          ///fetchuje na osnovu localStorage.userId
          this.fetchLoggedUser();
        
      },
  
      methods: {
        ...mapActions([
          'fetchLoggedUser'
        ])
      }
    }
  
  </script>
  
  <style scoped>
  
  </style>
  