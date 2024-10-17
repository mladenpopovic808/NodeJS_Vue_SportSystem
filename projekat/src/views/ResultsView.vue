<template>

    <div id="app">
      <Header subtitle="Lista Rezultata "/>
      <ResultList />
    </div>
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import ResultList from '@/components/ResultList.vue';
    import { mapActions } from 'vuex';
  
    export default {
      name: 'ResultsView',
      
      components: {
        Header,
        ResultList
      },
  
      data() {
        return {
         
        }
          
      },
  
      mounted() {
          this.fetchResults();
      },
  
      methods: {
        ...mapActions([
          'fetchResults'
        ])
      }
    }
  
  </script>
  
  <style scoped>
  
  </style>
  