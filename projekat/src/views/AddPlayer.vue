<template>

    <div id="app">
      <Header subtitle="Kreirajte igraca"/>
  
      <b-form @submit="onSubmit">
  
        <b-form-group label="Ime:" label-for="firstName">
          <b-form-input id="firstName" v-model="form.name" type="text" placeholder="Unesite ime" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Prezime:" label-for="lastName">
          <b-form-input id="lastName" v-model="form.lastName" type="text" placeholder="Unesite prezime" required></b-form-input>
        </b-form-group>
        <br>
  
        <select v-model="form.clubId"> <!-- ovde je stojalo jos i {{ selected }} proveri to ako budes imao problema posle-->
            <option disabled value="">Club id</option>
            <option v-if=clubs v-for="club in clubs" :value="club.id">{{ club.id }}</option>
        </select>
        <br><br>
        <b-form-group label="tourPoints:" label-for="tourPoints">
          <b-form-input id="tourPoints" v-model="form.tourPoints" type="text" placeholder="Broj bodova igraca" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="years" label-for="years">
          <b-form-input id="years" v-model="form.years" type="text" placeholder="Godine igraca" required></b-form-input>
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
      name: 'AddPlayer',
      
      components: {
        Header
      },
  
      data() {
        return {
          form: {
           name: '',
           lastName: '',
           clubId: '',
           tourPoints: '',
           years: '',
 
          }
        }
      },
      computed: {
        ...mapState([
          'clubs'
        ])
      },
      mounted() {
        this.fetchClubs();
      },
      
  
      methods: {
        ...mapActions([
          'addPlayer',
            'fetchClubs',
        ]),
  
        onSubmit(e) {
          e.preventDefault();
          const playerSchema = {
            name: Joi.string().min(4).max(20).required(),
            lastName: Joi.string().min(4).max(20).required(),
            clubId: Joi.number().required(),
            tourPoints: Joi.number().required(),
            years: Joi.number().required(),
          };
          const {error} = Joi.validate(this.form, playerSchema);
          if (error) {
            alert(error.details[0].message);
            return;
          }

          this.addPlayer(this.form);///salje se na authRegister
          ///mozda ovde mozes da vratis promise,pa ako je uspesno onda da se prebaci na homepage,a ako nije da ostane na register
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