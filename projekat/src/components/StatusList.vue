<template>
    <div>
       <b-pagination
         v-model="currentPage"
         :total-rows="statuses.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
   
       <!-- 
        Ovde mi ne treba tabela,vec neki kao zid sa vestima
        
        <b-table
         id="image-table"
         hover
         fixed
         :items="news"
         :fields="fields"
         small
         :per-page="perPage"
         :current-page="currentPage"
         @row-clicked="rowClicked"
       > 
       </b-table>
    -->
       <b-pagination
         v-model="currentPage"
         :total-rows="statuses.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
     </div>
   
   </template>
   
   <!--ne treba ti tabela statusa,samo neka idu jedan ispod drugog,ne treba ti akcija da kada kliknes na status da ti se otvori-->
   <script>
   
     import { mapState } from 'vuex';
   
     export default {
       name: "StatusList",
   
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
           'statuses'
         ])
       },
   
       methods: {
         rowClicked(record, index) {
           this.$router.push({ name: 'SingleStatus', params: { id: record.id} });
         }
       }
     }
   
   </script>
   
   <style scoped>
   
     .pagination {
       justify-content: center;
     }
     
   </style>