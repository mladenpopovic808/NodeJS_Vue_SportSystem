<template>

    <div id="app">
      <Header subtitle="Dobrodosli na Teniski Savez Srbije"/>
      <img
        src="../../tss.jpg"

        width="1000"
        alt="Slika se nije ucitala" 
      />
    </div>
    
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue'
    import {mapState} from "vuex";
  
    export default {
      name: 'Homepage',
      
      components: {
        Header
      },
  
      ...mapState([
        'token',
        'loggedUserId'
      ])
    }
  
  </script>
  