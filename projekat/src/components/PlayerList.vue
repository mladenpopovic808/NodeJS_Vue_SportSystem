<template>
    <div>
       <b-pagination
         v-model="currentPage"
         :total-rows="players.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
   
       <b-table
         id="image-table"
         hover
         fixed
         :items="players"
         :fields="fields"
         small
         :per-page="perPage"
         :current-page="currentPage"
       >

       </b-table>
       <b-pagination
         v-model="currentPage"
         :total-rows="players.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
     </div>
   
   </template>
   
   <script>
   
     import { mapState,mapActions } from 'vuex';
   
     export default {
       name: "PlayerList",
   
       data() {
         return {
           fields: ['id','name', 'lastName', 'years', 'tourPoints', 'clubId', ],
           items: [],
           currentPage: 1,
           perPage: 10
         }
       },
   
       mounted() {
   
       },
       computed: {
         ...mapState([
           'players',

         ])
       },
       
       methods: {
    

       }
       
     }
   
   </script>
   
   <style scoped>
   
     .pagination {
       justify-content: center;
     }
     
   </style>