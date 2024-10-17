<template>

    <div id="app">
      <Header subtitle="Lista organizatora" />
      <StaffList />
    </div>
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import StaffList from '@/components/StaffList.vue';
    import { mapActions } from 'vuex';
  
    export default {
      name: 'StaffsView',
      
      components: {
        Header,
        StaffList
      },
  
      data() {
        return {
         
        }
          
      },
  
      methods: {
        ...mapActions([
          'fetchStaffs'
        ])
      },
      mounted() {
          this.fetchStaffs();
      },
    }

  
  </script>
  
  <style scoped>
  
  </style>
  