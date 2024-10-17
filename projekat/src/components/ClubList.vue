<template>
    <div>
       <b-pagination
         v-model="currentPage"
         :total-rows="clubs.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
   
       <b-table
         id="image-table"
         hover
         fixed
         :items="clubs"
         :fields="fields"
         small
         :per-page="perPage"
         :current-page="currentPage"
         @row-clicked="rowClicked"
       >
       </b-table>
       <b-pagination
         v-model="currentPage"
         :total-rows="clubs.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
     </div>
   
   </template>
   
   <script>
   
     import { mapState } from 'vuex';
   
     export default {
       name: "ClubList",
   
       data() {
         return {
           fields: ['id','destinationId', 'name', 'numberOfCourts', 'creationDate'],
           items: [],
           currentPage: 1,
           perPage: 10
         }
       },
   
       mounted() {
   
       },
   
       computed: {
         ...mapState([
           'clubs'
         ])
       },
   
       methods: {
         rowClicked(record, index) {
           this.$router.push({ name: 'SingleClub', params: { id: record.id} });
         }
       }
     }
   
   </script>
   
   <style scoped>
   
     .pagination {
       justify-content: center;
     }
     
   </style>