const express = require('express');
const { sequelize, TennisPost,User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema,tennisPostScheme} = require('../joiValidations');
const route = express.Router();
route.use(express.json());
const bcrypt = require('bcrypt');
route.use(express.urlencoded({ extended: true }));


route.post('/createTennisPost', (req, res) => {
    const result = tennisPostScheme.validate(req.body);
    console.log(Object.keys(req.body)+" usaoo "+req.body.userId);
    if(result.error){
        res.status(422).json({ msg: 'Greška u validaciji pri kreiranju objave: ' + result.error.message });
    } else {
        const obj = {
            userId: req.body.userId,
            title: req.body.title,
            text: req.body.text,
        };
        console.log(req.body+" usaoo");
        TennisPost.create(obj).then( rows => {
        }).catch( err => res.status(500).json( {msg: err.message} ) );
    }
});

///obican korisnik moze da vidi sve klubove
route.get('/tennisPosts', (req, res) => {

    TennisPost.findAll().then( rows => {
        res.json(rows);
        }).catch( err => res.status(500).json( {msg: err.message} ) );
});

route.put('/updateTennisPost/:id/:title/:text/',(req,res)=>{  

    ///izvlaci iz tokena
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {

             if (usr.admin || usr.moderator) {

                 const idResult = updateTournamentScheme.validate(req.params);
                    if(idResult.error){
                        res.status(422).json({ msg: 'Validacija pri update-ovanju kluba ' + idResult.error.message });
                    }

                    TennisPost.findOne({ where: { id: req.params.id } })
                    .then( post => {
                        post.title = req.params.title;
                        post.text = req.params.text;

                        post.save()
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
