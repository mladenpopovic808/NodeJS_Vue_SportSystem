<template>
    <div>
       <b-pagination
         v-model="currentPage"
         :total-rows="destinations.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
   
       <b-table
         id="image-table"
         hover
         fixed
         :items="destinations"
         :fields="fields"
         small
         :per-page="perPage"
         :current-page="currentPage"
         @row-clicked="rowClicked"
       >
       </b-table>
       <b-pagination
         v-model="currentPage"
         :total-rows="destinations.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
     </div>
   
   </template>
   
   <script>
   
     import { mapState } from 'vuex';
   
     export default {
       name: "DestinationList",
   
       data() {
         return {
           fields: ['id','country', 'city', 'street', 'numberOfStreet'],
           items: [],
           currentPage: 1,
           perPage: 10
         }
       },
   
       mounted() {
   
       },
   
       computed: {
         ...mapState([
           'destinations'
         ])
       },
   
       methods: {
         rowClicked(record, index) {
           this.$router.push({ name: 'SingleDestination', params: { id: record.id} });
         }
       }
     }
   
   </script>
   
   <style scoped>
   
     .pagination {
       justify-content: center;
     }
     
   </style>