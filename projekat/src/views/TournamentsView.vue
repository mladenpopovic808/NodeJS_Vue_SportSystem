<template>

    <div id="app">
      <Header subtitle="Lista Turnira"/>
      <TournamentList/>
    </div>
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import TournamentList from '@/components/TournamentList.vue';
    import { mapActions } from 'vuex';
  
    export default {
      name: 'TournamentsView',
      
      components: {
        Header,
        TournamentList
      },
  
      data() {
        return {
         
        }
          
      },
  
      mounted() {
          this.fetchTournaments();
      },
  
      methods: {
        ...mapActions([
          'fetchTournaments'
        ])
      }
    }
  
  </script>
  
  <style scoped>
  
  </style>
  