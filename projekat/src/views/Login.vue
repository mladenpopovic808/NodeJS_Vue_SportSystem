<template>

    <div id="app">
      <Header subtitle="Prijava"/>
  
      <b-form @submit="onSubmit">
        <b-form-group label="Korisničko ime:" label-for="username">
          <b-form-input id="username" v-model="loginForm.username" placeholder="Unesite korisničko ime" min="6" max="20" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Lozinka:" label-for="password">
          <b-form-input id="password" v-model="loginForm.password" type="password" placeholder="Unesite lozinku" min="6" max="20" required></b-form-input>
        </b-form-group>
  
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import { mapActions } from 'vuex';
    //const {loginSchema}=require('../joiValidations.js')
    import Joi from 'joi-browser'

  
    export default {
      name: 'Login',
    
      components: {
        Header
      },
      data() {
        return {
          loginForm: {
            username: '',
            password: ''
          }
        }
      },

      methods: {
        ...mapActions([
          'login'
        ]),

        onSubmit(e) {
          e.preventDefault();
          const loginSchema=Joi.object({
            username: Joi.string().min(4).max(20).required(),
            password: Joi.string().min(4).max(20).required()
          })
          const {error}=loginSchema.validate(this.loginForm)
          if(error){
            alert(error.details[0].message)
            return
          }

          this.login(this.loginForm); ///salje se na authLogin
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
  