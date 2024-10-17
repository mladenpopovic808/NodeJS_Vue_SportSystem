<template>

    <div id="app">
      <Header subtitle="Kreirajte igraca"/>
  
      <b-form @submit="onSubmit">

        <select v-model="obj.playerId"> <!-- ovde je stojalo jos i {{ selected }} proveri to ako budes imao problema posle-->
            <option disabled value="">Player id</option>
            <option v-if=players v-for="player in players" :value="player.id">{{ player.id }}</option>
        </select>

        <b-form-group label="Ime:" label-for="firstName">
          <b-form-input id="firstName" v-model="obj.form.name" type="text" placeholder="Unesite ime" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Prezime:" label-for="lastName">
          <b-form-input id="lastName" v-model="obj.form.lastName" type="text" placeholder="Unesite prezime" required></b-form-input>
        </b-form-group>
        <br>
  
        <select v-model="obj.form.clubId"> <!-- ovde je stojalo jos i {{ selected }} proveri to ako budes imao problema posle-->
            <option disabled value="">Club id</option>
            <option v-if=clubs v-for="club in clubs" :value="club.id">{{ club.id }}</option>
        </select>
        <br><br>
        <b-form-group label="tourPoints:" label-for="tourPoints">
          <b-form-input id="tourPoints" v-model="obj.form.tourPoints" type="text" placeholder="Broj bodova igraca" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="years" label-for="years">
          <b-form-input id="years" v-model="obj.form.years" type="password" placeholder="Godine igraca" required></b-form-input>
        </b-form-group>

        <br>
      
        <br>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import {mapState,mapActions } from 'vuex';
    import Joi from 'joi-browser';
  
    export default {
      name: 'UpdatePlayer',
      
      components: {
        Header
      },
  
      data() {
        return {
        obj:{
         playerId: '',
         form: {
           name: '',
           lastName: '',
           clubId: '',
           tourPoints: '',
           years: '',
          }
        }
        }
      },
      computed: {
        ...mapState([
          'clubs',
          'players'
        ])
      },
      mounted() {
        this.fetchClubs();
        this.fetchPlayers();
      },
      
  
      methods: {
        ...mapActions([
          'updatePlayer',
          'fetchClubs',
          'fetchPlayers',
        ]),
  
        onSubmit(e) {
          e.preventDefault();
          const updatePlayerSchema = Joi.object({
            playerId: Joi.number().required(),
            name: Joi.string().min(4).max(20).required(),
            lastName: Joi.string().min(4).max(20).required(),
            clubId: Joi.number().required(),
            tourPoints: Joi.number().required(),
            years: Joi.number().required(),
          });

          const validateObj={
            playerId: this.obj.playerId,
            name: this.obj.form.name,
            lastName: this.obj.form.lastName,
            clubId: this.obj.form.clubId,
            tourPoints: this.obj.form.tourPoints,
            years: this.obj.form.years,
          }

          const {error}=updatePlayerSchema.validate(validateObj);
          if(error){
           alert(error.details[0].message);
           return; 
          }

          this.updatePlayer(this.obj);
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