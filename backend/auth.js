 const express = require('express');


const { sequelize,User} = require('./models');
 const jwt = require('jsonwebtoken');
 const bcrypt = require('bcrypt');
 const cors= require('cors');
 require('dotenv').config();
 const app= express();
 const {loginSchema,userSchema} = require('./joiValidations.js');

var corsOptions = {
    origin: '*', 
    optionsSuccessStatus: 200 ,
}

app.use(cors(corsOptions));
app.use(express.json());

app.post('/authRegister',(req,res)=>{
    
    const result = userSchema.validate(req.body);
    
    if(result.error){
        res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
    } else {
        
        const obj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            moderator: req.body.moderator,
            admin: req.body.admin,
        };
        User.create(obj).then( rows => {
            
            const usr = {
                userId: rows.userId,
                user: rows.username
            };
    
            const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
            res.json({ token: token,userId: rows.id });
    
        }).catch( err => res.status(500).json( {msg: err.message} ) );
    }   
})
///da li korisnik
app.post('/authLogin',(req,res)=>{
    
    const result = loginSchema.validate(req.body);

    if(result.error){
        res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
    } else {
        User.findOne({
             logging:false,
             where: { username: req.body.username } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.username
                };
                
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token, userId: usr.id});

            } else {
                res.status(400).json({ msg: "Uneseni kredencijali nisu validni."});
            }
        })
        .catch( err => res.status(500).json( {msg: "Uneseni kredencijali nisu validni!."}) );
    }
})

sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(9000, () => {
    console.log(`Autentifikacioni servis je pokrenut: http://127.0.0.1:9000`)
});
