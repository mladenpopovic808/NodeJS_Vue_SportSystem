<template>

    <div id="app">
      <Header subtitle="Administracija korisnika"/>
      <UserList/> <!-- nasa komponenta za prikaz user-a-->
    <br><br><br>
    

      <b-form @submit="onSubmit">
        <div>User id (kojeg menjate) </div>

        <select v-model="form.userId"> <!-- ovde je stojalo jos i {{ selected }} proveri to ako budes imao problema posle-->
            <option disabled value="">UserId</option>
            <option v-if=users v-for="user in users" :value="user.id">{{ user.id }}</option>
        </select>

        <br><br>
        
         <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio v-model="form.admin" :aria-describedby="ariaDescribedby" name="some-radios1" value="Admin">Admin</b-form-radio>
            <br>
            <b-form-radio v-model="form.moderator" :aria-describedby="ariaDescribedby" name="some-radios2" value="Moderator">Moderator</b-form-radio>
        </b-form-group>
        <br>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  
  </template>
  
  <script>
  
    import Header from '@/components/Header.vue';
    import UserList from '@/components/UserList.vue';
    import { mapState,mapActions } from 'vuex';
  
    export default {
      name: 'AdministrateUsers',
      
      components: {
        Header,
        UserList
      },
  
      data() {
        return {
          form: {
            userId: '',
            admin: '',
            moderator: ''
          }
        }
      },
      computed: {
        ...mapState([
          'users'
        ])
      },
      mounted() {
        this.fetchUsers();
      },
  
      methods: {
        ...mapActions([
          'administrateUser',
          'fetchUsers'
        ]),
  
        onSubmit(e) {
          e.preventDefault();

          ///odradjeno u store-u
          alert(this.form)
          this.administrateUser(this.form);
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