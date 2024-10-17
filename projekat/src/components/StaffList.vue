<template>
    <div>
       <b-pagination
         v-model="currentPage"
         :total-rows="staffs.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
   
       <b-table
         id="image-table"
         hover
         fixed
         :items="staffs"
         :fields="fields"
         small
         :per-page="perPage"
         :current-page="currentPage"
         @row-clicked="rowClicked"
       >
       </b-table>
       <b-pagination
         v-model="currentPage"
         :total-rows="staffs.length"
         :per-page="perPage"
         aria-controls="image-table"
       ></b-pagination>
     </div>
   
   </template>
   
   <script>
   
     import { mapState } from 'vuex';
   
     export default {
       name: "StaffList",
   
       data() {
         return {
           fields: ['id','name', 'lastName', 'years','clubId', 'email'],
           items: [],
           currentPage: 1,
           perPage: 10
         }
       },
   
       mounted() {
   
       },
   
       computed: {
         ...mapState([
           'staffs'
         ])
       },
   
       methods: {
         rowClicked(record, index) {
           this.$router.push({ name: 'SingleStaff', params: { id: record.id} });
         }
       }
     }
   
   </script>
   
   <style scoped>
   
     .pagination {
       justify-content: center;
     }
     
   </style>