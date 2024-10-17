const express = require('express');
const { sequelize, User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema, userSchema ,booleanSchema,administrateUsersScheme} = require('../joiValidations');
const route = express.Router();
route.use(express.json());
const bcrypt = require('bcrypt');
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    
      //iz headera izvlacimo autorization,tu se nalazi token
    const authHeader = req.headers['authorization'];
    ///da li authHeader postoji,u authHeaderu se nalazi token ali ne obican nego Bearer token,pa ga moramo da razdvojimo
    ///znaci pise "Bearer VrednostTokena"
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: "token nije prosledjen" });
   
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        ///ne radimo redirect,vec saljemo json poruku zato sto je ovo api endpoint a ne html stranica 
        ///403 znaci da je korisnik zabranjen 
        if (err) return res.status(403).json({ msg: "Niste ulogovani" });
        req.user = user;
        next();
    });
}
///middleware koji ce u pre svakog zahteva da proveri da li je korisnik ulogovan 
route.use(authToken);

route.get("/getCurrentUser", (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => res.json(usr) )
        .catch( err => res.status(500).json(err) );
});




///vraca sve usere
route.get('/users', (req, res) => {

    User.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) ); 
    
});
///vraca odredjenog usera
route.get('/users/:id', (req, res) => {
    
    ///da li postoji ulogovan korisnik sa tim id-em
    
   
     const result = idSchema.validate(req.params);
     if(result.error){
         res.status(422).json({ msg: 'Uneli ste nevalidan ID! ' + result.error.message });
    } else {
           User.findOne({ where: { id: req.params.id } })
               .then( rows => res.json(rows) )
             .catch( err => res.status(500).json(err.message) ); 
            }
        
        

});


///administracija korisnika od strane admina
route.put('/users/:id/:admin/:moderator',(req,res)=>{  

    obj = {
        id: req.params.id,
    }
    const result = idSchema.validate(obj);

    if(result.error){
        res.status(422).json({ msg: 'Uneli ste nevalidan ID! ' + result.error.message });
    }
    ///izvlaci iz tokena
    console.log(JSON.stringify(req.user))
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
             if (usr.admin) {
                 const idResult = administrateUsersScheme.validate(req.params);
                    if(idResult.error){
                        res.status(422).json({ msg: 'Uneli ste nevalidan ID! ' + idResult.error.message });
                    }

                    User.findOne({ where: { id: req.params.id } })
                    .then( user => {
                        
                        user.admin = req.params.admin;
                        user.moderator = req.params.moderator;
                         
                        user.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err.message) );
                    })
                    .catch( err => res.status(500).json(err.message) );
             }else{
                res.status(403).json({ msg: 'Nemate pravo pristupa' });
             }
        })
});


///informacije o korisniku ce menjati i sam korisnik i admin,zato ovde necu da vrsim proveru da li je korisnik admin jer nema smisla.
///Samo necu da dozvolim da obican korisnik udje u sekciju za administraciju
///kada korisnik sam sebi promeni informacije
//Ovo radi
route.put('/selfchangeUserInfo/', (req, res) => {

    const userResult = userSchema.validate(req.body);

    if(userResult.error){
        console.log(userResult.error.message)
        res.status(422).json({ msg: 'Greška u validaciji: ' + userResult.error.message});
    } 
    else {
        User.findOne({ where: { id: req.user.userId } })
        .then( user => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.username = req.body.username;
            user.email=req.body.email;
            user.password = bcrypt.hashSync(req.body.password,10);
            user.admin = req.body.admin;
            user.moderator = req.body.moderator;
           user.save()
               .then( rows => res.json(rows) )
               .catch(err=> console.log(err.message))
              //.catch( err => res.status(500).json(err.message) );
       })
       .catch( err => console.log(err.message) );

} 

});

route.delete('/users/:id', (req, res) => {
   
    
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                const result = idSchema.validate(req.params);
                if(result.error){
                    res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
                } else {
                    User.findOne({ where: { id: req.params.id } })
                    .then( usr => {
                        usr.destroy()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err.message) );
                    })
                    .catch( err => res.status(500).json(err.message) );
                }
            } else {
                res.status(403).json({ msg: "Nemate pravo na ovu akciju."});
            }
        })
        .catch( err => res.status(500).json(err.message) );
    
    
});

module.exports = route;