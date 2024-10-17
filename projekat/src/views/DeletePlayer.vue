<template>

    <div id="app">
      <Header subtitle="Obrisite korisnika"/>
      <select v-model="playerId"> <!-- ovde je stojalo jos i {{ selected }} proveri to ako budes imao problema posle-->
            <option disabled value="">UserId</option>
            <option v-if=players v-for="player in players" :value="player.id">{{ player.id }}</option>
        </select>
        <br><br>
      <button @click="deletePlayerFront()">Obrisi</button>
      
    <br><br><br>
    </div>
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import { mapState,mapActions } from 'vuex';
  
    export default {
      name: 'DeletePlayer',
      
      components: {
        Header,
        
      },
  
      data() {
        return {
          playerId:'',
        }
      },
      computed: {
        ...mapState([
          'players'
        ])
      },
      mounted() {
        this.fetchPlayers();
      },
  
      methods: {
        ...mapActions([
          'fetchPlayers',
          'deletePlayer'
        ]),
  
        deletePlayerFront() {
          

          ///odradjeno u store-u
          this.deletePlayer(this.playerId);
          this.$router.push({ name: 'homepage' });
         
        }
      }
    }
  </script>
  
  <style scoped>
  
    input:invalid {
      border: 2px solid red;
    }
  
    
    input:valid {
      border: 2px solid green;
    }
  
  </style>