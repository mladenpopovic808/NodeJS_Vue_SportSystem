<template>

    <div id="app">
      <Header subtitle="Lista klubova"/>
      <ClubList/>
    </div>
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import ClubList from '@/components/ClubList.vue';
    import { mapActions } from 'vuex';
  
    export default {
      name: 'ClubsView',
      
      components: {
        Header,
        ClubList
      },
  
      data() {
        return {
         
        }
          
      },
  
      mounted() {
          this.fetchClubs();
      },
  
      methods: {
        ...mapActions([
          'fetchClubs'
        ])
      }
    }
  
  </script>
  
  <style scoped>
  
  </style>
  