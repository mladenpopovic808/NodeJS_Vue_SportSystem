<template>

    <div class="d-flex justify-content-center">
      <div>
          <div class="new">

            <h3>new.title</h3>
            <p>new.content</p>
            <h4>new.userId</h4>

          </div>
          <b-button v-on:click="editNew()">Modifikacija statusa</b-button>
      </div>
    </div>
  
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    name: "SingleNew",
  
    props: {
      new: Object
    },
  
    computed: {
      ...mapState([
        'loggedUserId'
      ])
    },
  
    methods: {
        editNew(){
        if(this.loggedUserId == this.result.userId){
          this.$router.push({ name: 'UpdateResult', params: { id: this.result.id, tournamentId: this.result.tournamentId} });
        } else {
          alert("Rezultat možete modifikovati samo ako ste ulogovani, i rezultat je vaš.")
        }
      }
    }
  }
  
  </script>
  
  <style scoped>
  
    .new {
      border-bottom-style: solid;
      margin-bottom: 10px;
    }
  
  </style>