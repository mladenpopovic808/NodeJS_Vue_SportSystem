<template>
  <div id="app">

    <!---->
    <div>
      <b-navbar toggleable="sm" type="dark" variant="info">

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Početna stranica</b-nav-item>
            <b-nav-item v-if=token to="/userInformationsView">Vasi podaci</b-nav-item>
            <b-nav-item v-if=token to="/administrateUsers">Administracija korisnika</b-nav-item>
            <b-nav-item-dropdown v-if="token" text="Sekcije">
              <b-dropdown-item to="/playersView">Igraci</b-dropdown-item>
              <b-dropdown-item to="/staffsView">Organizatori</b-dropdown-item>
              <b-dropdown-item to="/clubsView">Klubovi</b-dropdown-item>
              <b-dropdown-item to="/matchesView">Mecevi</b-dropdown-item>
              <b-dropdown-item to="/resultsView">Rezultati</b-dropdown-item>
              <b-dropdown-item to="/tennisPostsView">Objave korisnika</b-dropdown-item>
             
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="!token" to="/register">Registracija</b-nav-item>
            <b-nav-item v-if="!token" to="/login">Prijava</b-nav-item>
            <b-nav-item v-else @click="logout()">Odjava</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <router-view class="routerView" />
  </div>
</template>

<script>

  import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'App',

    data() {
      return {
        
      }
    },
    computed: {
      ...mapState([
        'token',
        'loggedUserId'
      ])
    },

    mounted() {
      if (localStorage.token) {
        this.setToken(localStorage.token);
      }
      if(localStorage.loggedUserId){
        ///ima,tacno pokazuje local storage
        this.setLoggedUserId(localStorage.loggedUserId);
      }
    },

    methods: {
      ...mapMutations([
        'setToken',
        'removeToken',
        'setLoggedUserId'
      ]),
     

      logout() {
        this.removeToken();
        this.$router.push({ name: 'homepage' });
      }
    },
    sockets: {
      connect() {
        console.log('Soket je povezan')
      },
      disconnect() {
        console.log('Soket je diskonektovan')
      },
      error(err){
        console.log(err);
      }
    }
  }

</script>

<style>

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-bottom: 10px;
  }

  .routerView {
    width: 80%;
    margin-left: 10%;
  }
  
</style>
