const express = require('express');
const { sequelize, Player,User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { userSchema ,playerSchema,idSchema, updatePlayerScheme} = require('../joiValidations');
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
route.post('/createPlayer', (req, res) => {
    
    console.log("createPlayer")

    User.findOne({where:{id:req.user.userId}})
    .then(user=>{
        if(user.admin || user.moderator){
            const result = playerSchema.validate(req.body);

    if(result.error){
        res.status(422).json({ msg: 'Greška u validaciji pri kreiranju Igraca: ' + result.error.message });
    } else {
        const obj = {
            name: req.body.name,
            lastName: req.body.lastName,
            years: req.body.years,
            tourPoints: req.body.tourPoints,
            clubId: req.body.clubId,
        };

        
        Player.create(obj).then( rows => {
            res.json({msg:"Novi igrac je uspesno kreiran!"})
        }).catch( err => res.status(500).json( {msg: err.message} ) );
    }   
}else{
    res.status(422).json({ msg: 'Nemate pravo na ovu akciju:'});
}
});
});

///obican korisnik moze da vidi sve staff-ove
route.get('/showPlayers', (req, res) => {
    
    Player.findAll().then( rows => {
        res.json(rows);
        
        
        }).catch( err => res.status(500).json( {msg: err.message} ) );
        });
route.get('/showPlayers/:id', (req, res) => {

    const result = idSchema.validate(req.params);
    if(result.error){
        res.status(422).json({ msg: 'Uneli ste nevalidan ID! ' + result.error.message });
    } else {
        Player.findOne({ where: { id: req.params.id } }).then( rows => {
            res.json(rows);
            }).catch( err => res.status(500).json( {msg: err.message} ) );
        }
    });

route.delete("/deletePlayer/:id", (req, res) => {
    User.findOne({where:{id:req.user.userId}})
    .then(user=>{
        if(user.admin || user.moderator){
            Player.destroy({where: {id: req.params.id}}).then( rows => {
                res.json({msg: 'Igrac je obrisan!'});
                }).catch( err => res.status(500).json( {msg: err.message} ) );
        }else{
            res.status(422).json({ msg: 'Nemate pravo na ovu akciju:'});
        }
    });
});

route.put('/players/:id/:name/:lastName/:clubId/:tourPoints/:years',(req,res)=>{  

    obj = {
        id: req.params.id,
    }

    ///izvlaci iz tokena
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {

             if (usr.admin || usr.moderator) {

                 const idResult = updatePlayerScheme.validate(req.params);
                    if(idResult.error){
                        res.status(422).json({ msg: 'Uneli ste nevalidan ID! ' + idResult.error.message });
                    }

                    Player.findOne({ where: { id: req.params.id } })
                    .then( player => {
                        player.name = req.params.name;
                        player.lastName = req.params.lastName;
                        player.clubId = req.params.clubId;
                        player.tourPoints = req.params.tourPoints;
                        player.years = req.params.years;

                        player.save()
                            .then( rows => res.json({msg:'Uspesno izmenjen igrac'}) )
                            .catch( err => res.status(500).json(err.message) );
                    })
                    .catch( err => res.status(500).json(err.message) );
             }else{
                res.status(403).json({ msg: 'Nemate pravo pristupa' });
             }
        })
});



module.exports = route;
