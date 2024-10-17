<template>

    <div id="app">
      <Header subtitle="Registracija"/>
  
      <b-form @submit="onSubmit">
  
        <b-form-group label="Ime:" label-for="firstName">
          <b-form-input id="firstName" v-model="form.firstName" type="text" placeholder="Unesite ime" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Prezime:" label-for="lastName">
          <b-form-input id="lastName" v-model="form.lastName" type="text" placeholder="Unesite prezime" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Username:" label-for="username">
          <b-form-input id="username" v-model="form.username" type = "text" placeholder="Unesite username" required></b-form-input>
        </b-form-group>
        
        <b-form-group label="Email:" label-for="email">
          <b-form-input id="email" v-model="form.email" type="text" placeholder="Unesite Email" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Password" label-for="password">
          <b-form-input id="password" v-model="form.password" type="password" placeholder="Unesite sifru" min="100" max="3000" required></b-form-input>
        </b-form-group>

        <br>
        <!--Izmeni TODO-->
        <!--Ubaciti u registraciju da umesto booleana prima stringove tipa "true" i "false",zato sto ne mogu iz vue.js da prosledim boolean
        jer je retardirano -->

         <!-- <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio v-bind:form.admin="true" name="some-radios1" value="true">Admin</b-form-radio>
            <b-form-radio v-bind:form.moderator="true" name="some-radios2" value="true">Moderator</b-form-radio>
        </b-form-group> -->
      
        <br>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import { mapActions } from 'vuex';
    import Joi from 'joi-browser'
  
    export default {
      name: 'Register',
      
      components: {
        Header
      },
  
      data() {
        return {
          form: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            username: '',
            password: '',
            admin: true,
            moderator: true
            
          }
        }
      },
  
      methods: {
        ...mapActions([
          'register'
        ]),
  
        onSubmit(e) {
          e.preventDefault();
          const registerSchema = Joi.object({
            firstName: Joi.string().min(4).max(10).required(),
            lastName: Joi.string().min(4).max(10).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).max(10).required(),
            username: Joi.string().max(10).required(),
          });
          const validateObject = {
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            email: this.form.email,
            password: this.form.password,
            username: this.form.username,
          };

          const {error}=registerSchema.validate(validateObject);
          if(error){
            alert(error.details[0].message);
            return;
          }



          this.register(this.form);///salje se na authRegister
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