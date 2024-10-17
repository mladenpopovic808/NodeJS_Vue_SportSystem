<template>

    <div id="app">
      <Header subtitle="Lista Meceva "/>
      <MatchList/>
    </div>
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import MatchList from '@/components/MatchList.vue';
    import { mapActions } from 'vuex';
  
    export default {
      name: 'MatchesView',
      
      components: {
        Header,
        MatchList
      },
  
      data() {
        return {
         
        }
          
      },
  
      mounted() {
          this.fetchMatches();
      },
  
      methods: {
        ...mapActions([
          'fetchMatches'
        ])
      }
    }
  
  </script>
  
  <style scoped>
  
  </style>
  