<template>
    <div>
       <b-pagination
         v-model="currentPage"
         :total-rows="matches.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
   
       <b-table
         id="image-table"
         hover
         fixed
         :items="matches"
         :fields="fields"
         small
         :per-page="perPage"
         :current-page="currentPage"
         @row-clicked="rowClicked"
       >
       </b-table>
       <b-pagination
         v-model="currentPage"
         :total-rows="matches.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
     </div>
   
   </template>
   
   <script>
   
     import { mapState } from 'vuex';
   
     export default {
       name: "MatchList",
   
       data() {
         return {
           fields: ['id','tournamentId', 'playerOneId', 'playerTwoId', 'courtType'],
           items: [],
           currentPage: 1,
           perPage: 10
         }
       },
   
       mounted() {
   
       },
   
       computed: {
         ...mapState([
           'matches'
         ])
       },
   
       methods: {
         rowClicked(record, index) {
           this.$router.push({ name: 'SingleMatch', params: { id: record.id} });
         }
       }
     }
   
   </script>
   
   <style scoped>
   
     .pagination {
       justify-content: center;
     }
     
   </style>