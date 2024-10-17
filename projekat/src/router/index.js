import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../views/Homepage.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import AdminisrateUsers from '../views/AdministrateUsers.vue'
import ResultsView from '../views/ResultsView.vue'
import TournamentsView from '../views/TournamentsView.vue'
import ClubsView from '../views/ClubsView.vue'
import PlayersView from '../views/PlayersView.vue'
import MatchesView from '../views/MatchesView.vue'
import StaffsView from '../views/StaffsView.vue'
import UserInformationsView from '../views/UserInformationsView.vue'
import AddPlayer from '../views/AddPlayer.vue'
import DeletePlayer from '../views/DeletePlayer.vue'
import UpdatePlayer from '../views/UpdatePlayer.vue'
import TennisPostsView from '../views/TennisPostsView.vue'
import TennisPostEdit from '../views/TennisPostEdit.vue'




///Ovde treba da importujes sve tvoje komponente koje ce biti vezane za rute
///njih stavljas u views folder

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: Homepage
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/deletePlayer',
    name: 'deletePlayer',
    component: DeletePlayer
  },
  {
    path: '/addPlayer',
    name: 'addPlayer',
    component: AddPlayer
  },
  {
    path:'/updatePlayer',
    name:'updatePlayer',
    component: UpdatePlayer

  },
  {
    path:'/userInformationsView',
    name:'userInformationsView',
    component: UserInformationsView
  },
  {
    path: '/administrateUsers',
    name: 'administrateUsers',
    component: AdminisrateUsers
  },
  {
    path: '/resultsView',
    name: 'resultsView',
    component: ResultsView
  },
  {
    path: '/tennisPostsView',
    name: 'tennisPostsView',
    component: TennisPostsView

  },
 
  {
    path: '/tournamentsView',
    name: 'tournamentsView',
    component: TournamentsView
  },
  {
    path: '/clubsView',
    name: 'clubsView',
    component: ClubsView
  },
  {
    path: '/playersView',
    name: 'playersView',
    component: PlayersView
  },
  {
    path: '/matchesView',
    name: 'matchesView',
    component: MatchesView
  },
  {
    path: '/tennisPostEdit/:post',
    name: 'tennisPostEdit',
    component: TennisPostEdit
  },
  {
    path: '/staffsView',
    name: 'staffsView',
    component: StaffsView
  },



  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
