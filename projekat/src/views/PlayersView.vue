<template>

    <div id="app">
      <Header subtitle="Lista igraca "/>
      <PlayerList />
      <button @click="addPlayer()">Dodaj igraca</button>
      <p>---</p>
      <button @click="deletePlayer()">Obrisi igraca</button>
      <button @click="updatePlayer()">Izmeni igraca</button>
    </div>
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import PlayerList from '@/components/PlayerList.vue';
    import { mapActions } from 'vuex';
  
    export default {
      name: 'StaffsView',
      
      components: {
        Header,
        PlayerList
      },
  
      data() {
        return {
         
        }
      },
  
      mounted() {
          this.fetchPlayers();
      },
  
      methods: {
        ...mapActions([
          'fetchPlayers'
        ]),
        addPlayer() {
          
          this.$router.push({ name: 'addPlayer' });
        },
        deletePlayer() {
          this.$router.push({ name: 'deletePlayer' });
        },
        updatePlayer() {
          this.$router.push({ name: 'updatePlayer' });
        },


      },

    }
  
  </script>
  
  <style scoped>
  
  </style>
  