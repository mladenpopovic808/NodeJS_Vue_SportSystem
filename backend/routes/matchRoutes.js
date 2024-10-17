const express = require('express');
const { sequelize, Match,User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema,userSchema ,matchScheme} = require('../joiValidations');
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
  
    if (token == null) return res.status(401).json({ msg: err });
   
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

///admin radnja
route.post('/createMatch', (req, res) => {
    
    User.findOne({where:{id:req.user.userId}})
    .then(user=>{
        if(user.admin || user.moderator){
            const result = matchScheme.validate(req.body);
            
            if(result.error){
                res.status(422).json({ msg: 'Greška u validaciji pri kreiranju Destinacije: ' + result.error.message });
            } else {
                const obj = {
                    playerOneId: req.body.playerOneId,
                    playerTwoId: req.body.playerTwoId,
                    tournamentId: req.body.tournamentId,
                    courtType: req.body.courtType,
                };
                Match.create(obj).then( rows => {
                }).catch( err => res.status(500).json( {msg: err.message} ) );
            }   
}else{
    res.status(422).json({ msg: 'Nemate pravo na ovu akciju:'});
}
});
});


///obican korisnik moze da vidi sve staff-ove
route.get('/showMatches', (req, res) => {
    
    Match.findAll().then( rows => {
        res.json(rows);
        }).catch( err => res.status(500).json( {msg: err.message} ) );
        });
    
route.get('/showMatches/:id', (req, res) => {

    const result = idSchema.validate(req.params.id);
    if(result.error){
        res.status(422).json({ msg: 'Greška u validaciji pri kreiranju Destinacije: ' + result.error.message });
    }
    else{
        Match.findOne({where:{id:req.params.id}}).then( rows => {
            res.json(rows);
        }).catch( err => res.status(500).json( {msg: err.message} ) );
    }
});
    

route.delete("/deleteMatch/:id", (req, res) => {
    User.findOne({where:{id:req.user.userId}})
    .then(user=>{
        if(user.admin || user.moderator){
            Match.destroy({where: {id: req.params.id}}).then( rows => {
                res.json(rows);
                }).catch( err => res.status(500).json( {msg: err.message} ) );
        }else{
            res.status(422).json({ msg: 'Nemate pravo na ovu akciju!'});
        }
    });
});
module.exports = route;
