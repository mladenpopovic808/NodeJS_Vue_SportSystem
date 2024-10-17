<template>
    <div>
       <b-pagination
         v-model="currentPage"
         :total-rows="users.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
   
       <b-table
         id="image-table"
         hover
         fixed
         :items="users"
         :fields="fields"
         small
         :per-page="perPage"
         :current-page="currentPage"
         
       >
       </b-table>
       <b-pagination
         v-model="currentPage"
         :total-rows="users.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
     </div>
   
   </template>
   
   <script>
   
     import { mapState } from 'vuex';
   
     export default {
       name: "UserList",
   
       data() {
         return {
           fields: ['id','firstName', 'lastName','username','email','admin','moderator'],
           items: [],
           currentPage: 1,
           perPage: 10
         }
       },
   
       mounted() {
   
       },
   
       computed: {
         ...mapState([
           'users'
         ])
       },
   
       methods: {
         ///ne treba ti singleUser na klik u tabeli
       }
     }
   
   </script>
   
   <style scoped>
   
     .pagination {
       justify-content: center;
     }
     
   </style>