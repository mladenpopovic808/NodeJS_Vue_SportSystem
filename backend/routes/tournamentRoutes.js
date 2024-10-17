const express = require('express');
const { sequelize, Tournament,User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema,userSchema ,tournamentScheme,updateTournamentScheme} = require('../joiValidations');
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
route.post('/createTournament', (req, res) => {
    
    User.findOne({where:{id:req.user.userId}})
    .then(user=>{
        if(user.admin || user.moderator){
            const result = tournamentScheme.validate(req.body);

    if(result.error){
        res.status(422).json({ msg: 'Greška u validaciji pri kreiranju kluba: ' + result.error.message });
    } else {
        const obj = {
            name: req.body.name,
            prizeMoney: req.body.prizeMoney,
            points: req.body.points,
            clubId: req.body.clubId,
        };
        
        Tournament.create(obj).then( rows => {
            
            
        }).catch( err => res.status(500).json( {msg: err.message} ) );
    }   
}else{
    res.status(422).json({ msg: 'Nemate pravo na ovu akciju:'});
}
});
});

///obican korisnik moze da vidi sve klubove
route.get('/showTournaments', (req, res) => {

    Tournament.findAll().then( rows => {
        res.json(rows);
        }).catch( err => res.status(500).json( {msg: err.message} ) );
});
route.get('/showTournaments/:id', (req, res) => {
    const idResult = idSchema.validate(req.params);

    if(idResult.error){
        res.status(422).json({ msg: 'Validacija pri prikazu kluba ' + idResult.error.message });
    } else {
        Tournament.findOne({ where: { id: req.params.id } }).then( rows => {
            res.json(rows);
            }).catch( err => res.status(500).json( {msg: err.message} ) );
    }
});

route.put('/updateTournament/:id/:name/:prizeMoney/:points/:clubId',(req,res)=>{  

    ///izvlaci iz tokena
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {

             if (usr.admin || usr.moderator) {

                 const idResult = updateTournamentScheme.validate(req.params);
                    if(idResult.error){
                        res.status(422).json({ msg: 'Validacija pri update-ovanju kluba ' + idResult.error.message });
                    }

                    Tournament.findOne({ where: { id: req.params.id } })
                    .then( tour => {
                        tour.name = req.params.name;
                        tour.prizeMoney = req.params.prizeMoney;
                        tour.points = req.params.points;
                        tour.clubId = req.params.clubId;

                        tour.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err.message) );
                    })
                    .catch( err => res.status(500).json(err.message) );
             }else{
                res.status(403).json({ msg: 'Nemate pravo pristupa' });
             }
        })
});
    
        


route.delete("/deleteTournament/:id", (req, res) => {
    User.findOne({where:{id:req.user.userId}})
    .then(user=>{
        if(user.admin || user.moderator){
            Tournament.destroy({where: {id: req.params.id}}).then( rows => {
                res.json(rows);
                }).catch( err => res.status(500).json( {msg: err.message} ) );
        }else{
            res.status(422).json({ msg: 'Nemate pravo na ovu akciju:'});
        }
    });
});


module.exports = route;
