import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'', ///u localstorage-u se stavlja '',ovde mozes null
    loggedUser:null,
    loggedUserId:'',
    staffs: [], 
    singleStaff:null,
    tournaments: [], 
    singleTournament:null,
    clubs: [], 
    singleClub:null, 
    players: [], 
    singlePlayer:null,
    matches: [], 
    singleMatch:null, 
    users: [],
    singleUser:null, ///mozda ti treba kada korisnik gleda samog sebe
    results: [],
    singleResult:null,
    tennisPosts:[],
  },

  mutations: {
    setToken(state,token){
      state.token=token;
      localStorage.token=token;
    },
    removeToken(state){
      state.token=null;
      //localStorage.removeItem('token');
      localStorage.token='';
    },
    setStaffs(state,staffs){
      state.staffs=staffs;
    },
 
    setClubs(state,clubs){
      state.clubs=clubs;
    },
  
    setPlayers(state,players){
      state.players=players;
    },
   
    setMatches(state,matches){
      state.matches=matches;
    },
  
    setUsers(state,users){
      state.users=users;
    },
   
    setResults(state,results){
      state.results=results;
    },
    
    setLoggedUserId(state,loggedUserId){
      state.loggedUserId=loggedUserId;
      localStorage.loggedUserId=loggedUserId;
      
    },
    setTournaments(state,tournaments){
      state.tournaments=tournaments;
    },
    setSingleTournament(state,singleTournament){
      state.singleTournament=singleTournament;
    },
    setLoggedUser(state,user){
      state.loggedUser=user;
    },
    setTennisPosts(state,tennisPosts){
      state.tennisPosts=tennisPosts;
    },
    addTennisPost(state, obj) {
     state.tennisPosts.push(obj);
  },
  editTennisPost(state, obj) {
    let index = state.tennisPosts.findIndex(x => x.id == obj.id);
    state.tennisPosts.splice(index, 1, obj);
  },
},

  actions: {
    register({commit,dispatch},obj){
      fetch('http://127.0.0.1:9000/authRegister',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
      }).then(res=>res.json())
      .then(data=>{
        commit('setToken',data.token);
          ///na bekendu vracam i userId zbog jednostavnosti
        commit('setLoggedUserId',data.userId);
        dispatch('fetchLoggedUser');
      })
    },

    login({commit,dispatch},obj){
      fetch('http://127.0.0.1:9000/authLogin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
      }).then(res=>res.json())
        .then(data=>{
        ///na bekendu vracam i userId zbog jednostavnosti
        commit('setToken',data.token);
        commit('setLoggedUserId',data.userId);
        
        dispatch('fetchLoggedUser');
        }).catch(err=>alert("err.message"));
    },
    
    ///samo postavlja user=user,token se ranije postavio
    fetchLoggedUser ({commit}){
      fetch('http://127.0.0.1:8500/admin/users/' + localStorage.loggedUserId,{
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + localStorage.token
        }
      }).then(res=>res.json())
        .then(data=>{
    
        commit('setLoggedUser',data);
      }).catch(err=>alert("err.message"));
    },

    fetchTennisPosts({commit}){
      fetch('http://localhost:8500/admin/tennisPosts',{
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + localStorage.token
        }
      }).then(res=>res.json())
      .then(data=>{
        commit('setTennisPosts',data);
      })
    },
    
    // addTennisPost({commit},obj){
    //   fetch('http://localhost:8500/admin/createTennisPost',{
    //     method:'POST',
    //     headers:{
    //       'Content-Type':'application/json',
    //       'Authorization':'Bearer ' + localStorage.token
    //     },
    //     body:JSON.stringify(obj)
    //   }).then(res=>res.json())
    //   .then(data=>{
    //     commit('addTennisPost',data);
    //   })
    // },

    fetchUsers({commit}){
      fetch('http://localhost:8500/admin/users',{
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + localStorage.token
        }
      }).then(res=>res.json())
      .then(data=>{
        commit('setUsers',data);
      })
      },
    fetchTournaments({commit}){
      fetch('http://localhost:8500/admin/showTournaments',{
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + localStorage.token
        }
      }).then(res=>res.json())
      .then(data=>{
        commit('setTournaments',data);
      })
    },
    fetchMatches({commit}){
      fetch('http://localhost:8500/admin/showMatches',{
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + localStorage.token
        }
      }).then(res=>res.json())
      .then(data=>{
        commit('setMatches',data);
      })
    },
    fetchClubs({commit}){
      fetch('http://localhost:8500/admin/showClubs',{
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + localStorage.token
        }
      }).then(res=>res.json())
      .then(data=>{
        commit('setClubs',data);
      })
    },
    fetchStaffs({commit}){
      fetch('http://localhost:8500/admin/showStaff',{
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + localStorage.token
        }
      }).then(res=>res.json())
      .then(data=>{
        data.forEach(staff=>{
          console.log(staff)
        })
        commit('setStaffs',data);
      })
    },



    fetchPlayers({commit}){
      fetch('http://localhost:8500/admin/showPlayers',{
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + localStorage.token
        }
      }).then(res=>res.json())
      .then(data=>{
        commit('setPlayers',data);
      }) 
    },
    fetchResults({commit}){
      fetch('http://localhost:8500/admin/showResults',{
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + localStorage.token
        }
    }).then(res=>res.json())
      .then(data=>{
        commit('setResults',data);
    }
)
  },
  deleteUser({commit},userId){
    fetch("http://localhost:8500/admin/users/" + userId,{
     headers:{
      method: "DELETE",
      'Authorization':'Bearer ' + localStorage.token
     }
    })
    .then(res=>res.json())
    .then(data=>{
      alert(data.msg);
    })
  },
  updatePlayer({commit},obj){
    fetch("http://localhost:8500/admin/players/"+obj.playerId+"/"+obj.form.name+"/"+obj.form.lastName +"/"+obj.form.clubId+"/"+obj.form.tourPoints+"/"+obj.form.years,{
      method: "PUT",
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + localStorage.token
      },
      body:JSON.stringify(obj.form)
    })
    .then(res=>res.json())
    .then(data=>{
      alert(data.msg);
    })
  },

  addPlayer({commit},obj){
    fetch("http://localhost:8500/admin/createPlayer",{
      method: "POST",
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + localStorage.token
      },
      body:JSON.stringify(obj)
    })
    .then(res=>res.json())
    .then(data=>{
      alert(data.msg);
    })
  },


  deletePlayer({commit},playerId){
    fetch("http://localhost:8500/admin/deletePlayer/" + playerId,{
      method: "DELETE",
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + localStorage.token
      }
    })
    .then(res=>res.json())
    .then(data=>{
      alert(data.msg);
    })
  },
    administrateUser({commit},obj){
      ///ne mogu da iz radioButtona izvucem boolean
      if(obj.admin=='Admin'){
        obj.admin=true;
      }
      else{
        obj.admin=false;
      }
      if(obj.moderator=='Moderator'){
        obj.moderator=true;
      }
      else{
        obj.moderator=false;
      }

      fetch("http://localhost:8500/admin/users/" + obj.userId+"/"+obj.admin+"/"+obj.moderator,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token,
            }
        })
           .then(res => res.json())
              .then(data => {
                    if(data.msg){
                        alert(data.msg);
                    }
                    else{
                        alert("Uspešno ste promijenili korisnika!");
                    }
                }
            ).catch(err => console.log(err.message));
        }, 
      socket_tennisPost({ commit }, msg) {
         const tennisPost = JSON.parse(msg);
         commit('addTennisPost', { text: tennisPost.text, title: tennisPost.title,userId:tennisPost.userId, id:tennisPost.id });
      },
      socket_editTennisPost({ commit }, msg) {
        const tennisPost = JSON.parse(msg);
        commit('editTennisPost', { text: tennisPost.text, title: tennisPost.title,userId:tennisPost.userId });
      },
      
},

  modules: {
  }
    
})

