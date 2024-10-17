const express = require('express');
const { sequelize, Info,User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema,userSchema ,infoScheme} = require('../joiValidations');
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
///ne postoji createAboutUs,to se radi samo jednom u seedovima




route.get('/showInfo', (req, res) => {

    Info.findAll().then( rows => {
        res.json(rows);
        }).catch( err => res.status(500).json( {msg: err.message} ) );
        });
    

route.put('/updateInfo', (req, res) => {

    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
             if (usr.admin || usr.moderator) {
                ///uvek ce biti id=1
                Info.findOne({ where: { id: 1 } })
                .then( info => {
                    if(info){
                          const result = infoScheme.validate(req.body);
                          if(result.error){
                                console.log(result.error.message);
                                res.status(422).json({ msg: 'Uneli ste nevalidne podatke! ' + result.error.message });
                            } else {
                                Info.update(req.body, { where: { id: 1 } })
                                    .then( () => res.json({ msg: 'Uspesno ste izmenili info(kontakt) sekciju!' }) )
                                    .catch( err => res.status(500).json( {msg: err.message} ) );
                            }
                        }
                        })
                    }

})
})
module.exports = route;
