const express = require('express');
const { sequelize, Club,User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema,userSchema ,clubSchema,updateClubScheme} = require('../joiValidations');
const route = express.Router();
route.use(express.json());

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
route.post('/createClub', (req, res) => {
    
    User.findOne({where:{id:req.user.userId}})
    .then(user=>{
        if(user.admin || user.moderator){
            const result = clubSchema.validate(req.body);
        
    if(result.error){
        res.status(422).json({ msg: 'Greška u validaciji pri kreiranju kluba: ' + result.error.message });
    } else {
        const obj = {
            name: req.body.name,
            numberOfCourts: req.body.numberOfCourts,
            destinationId: req.body.destinationId,
            creationDate: req.body.creationDate,
           
        };

        Club.create(obj).then( rows => {
            
        }).catch( err => res.status(500).json( {msg: err.message} ) );
    }   
}else{
    res.status(422).json({ msg: 'Nemate pravo na ovu akciju:'});
}
});
});


///obican korisnik moze da vidi sve klubove
route.get('/showClubs', (req, res) => {

    Club.findAll().then( rows => {
        res.json(rows);
        }).catch( err => res.status(500).json( {msg: err.message} ) );
});
    
route.get('/showClubs/:id', (req, res) => {
    const result = idSchema.validate(req.params);
    if(result.error){
        res.status(422).json({ msg: 'Greška u validaciji pri prikazu kluba: ' + result.error.message });
    }
    else{
    Club.findOne({where:{id:req.params.id}}).then( rows => {
        res.json(rows);
        }).catch( err => res.status(500).json( {msg: err.message} ) );
    }
})

route.delete("/deleteClub/:id", (req, res) => {
    User.findOne({where:{id:req.user.userId}})
    .then(user=>{
        if(user.admin || user.moderator){
            Club.destroy({where: {id: req.params.id}}).then( rows => {
                res.json(rows);
                }).catch( err => res.status(500).json( {msg: err.message} ) );
        }else{
            res.status(422).json({ msg: 'Nemate pravo na ovu akciju:'});
        }
    });
});

route.put('/updateClub/:id/:name/:numberOfCourts/:destinationId/:creationDate',(req,res)=>{  

    obj = {
        id: req.params.id,
    }

    ///izvlaci iz tokena
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {

             if (usr.admin || usr.moderator) {

                 const idResult = updateClubScheme.validate(req.params);
                    if(idResult.error){
                        res.status(422).json({ msg: 'Validacija pri update-ovanju kluba ' + idResult.error.message });
                    }

                    Club.findOne({ where: { id: req.params.id } })
                    .then( club => {
                        club.name = req.params.name;
                        club.destinationId = req.params.destinationId;
                        club.numberOfCourts = req.params.numberOfCourts;
                        club.creationDate = req.params.date;
                        

                        club.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err.message) );
                    })
                    .catch( err => res.status(500).json(err.message) );
             }else{
                res.status(403).json({ msg: 'Nemate pravo pristupa' });
             }
        })
});


module.exports = route;
