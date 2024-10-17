const joi=require('joi');

const userSchema = joi.object({
    firstName: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20).required(),
    username: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).max(20).required(),
    moderator: joi.boolean(),
    admin: joi.boolean(),
});
const administrateUsersScheme=joi.object({
    id: joi.number().integer().min(1).required(),
    admin: joi.boolean(),
    moderator: joi.boolean(),
});
const tennisPostScheme=joi.object({
    userId: joi.number().integer().min(1).required(),
    text: joi.string().min(3).max(1000).required(),
    title: joi.string().min(3).max(100).required(),
});
const booleanSchema=joi.object({
    moderator: joi.boolean(),
    admin: joi.boolean(),
});
const idSchema = joi.object({
    id: joi.number().integer().min(1).required()
});
const loginSchema = joi.object({
    username: joi.string().min(3).max(20).required(),
    password: joi.string().min(3).max(20).required()
});

const playerSchema = joi.object({
    name: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20).required(),
    years: joi.number().required(),
    tourPoints: joi.number().required(),
    clubId: joi.number().min(1).required(), 
});

const updatePlayerScheme=joi.object({
    id: joi.number().integer().min(1).required(),
    name: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20).required(),
    years: joi.number().required(),
    tourPoints: joi.number().required(),
    clubId: joi.number().min(1).required(), 

})


const staffSchema = joi.object({
    name: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    years: joi.number().required(),
    clubId: joi.number().required(),
     
});
const updateStaffScheme=joi.object({
    id: joi.number().integer().min(1).required(),
    name: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    years: joi.number().required(),
    clubId: joi.number().min(1).required(),
}) 

const clubSchema=joi.object({
    name: joi.string().min(3).max(20).required(),
    numberOfCourts: joi.number().required(),
    destinationId: joi.number().min(1).required(),
    creationDate: joi.date().required(),
});

const updateClubScheme=joi.object({
    id: joi.number().integer().min(1).required(),
    name: joi.string().min(3).max(20).required(),
    numberOfCourts: joi.number().required(),
    destinationId: joi.number().min(1).required(),
    creationDate: joi.date().required(),
});




const destinationScheme=joi.object({
    country:joi.string().min(3).max(20).required(),
    city:joi.string().min(3).max(20).required(),
    street:joi.string().min(3).max(20).required(),
    numberOfStreet:joi.number().required(),
 
});
const updateDestinationScheme=joi.object({
    id: joi.number().integer().min(1).required(),
    country:joi.string().min(3).max(20).required(),
    city:joi.string().min(3).max(20).required(),
    street:joi.string().min(3).max(20).required(),
    numberOfStreet:joi.number().required(),
})

const tournamentScheme=joi.object({
    name: joi.string().min(3).max(20).required(),
    prizeMoney: joi.number().required(),
    points: joi.number().required(),
    clubId: joi.number().min(1).required(),
});

const updateTournamentScheme=joi.object({
    id: joi.number().integer().min(1).required(),
    name: joi.string().min(3).max(20).required(),
    prizeMoney: joi.number().required(),
    points: joi.number().required(),
    clubId: joi.number().min(1).required(),
});


const matchScheme=joi.object({
    courtType: joi.string().min(3).max(20).required(),
    playerOneId: joi.number().min(1).required(),
    playerTwoId: joi.number().min(1).required(),
    tournamentId: joi.number().min(1).required(),
});

const updateMatchScheme=joi.object({
    id: joi.number().integer().min(1).required(),
    courtType: joi.string().min(3).max(20).required(),
    playerOneId: joi.number().min(1).required(),
    playerTwoId: joi.number().min(1).required(),
    tournamentId: joi.number().min(1).required(),
});


const resultScheme=joi.object({
   matchId: joi.number().min(1).required(),
   firstSetGemsWinner: joi.number().min(6).max(6).required(),
   secondSetGemsWinner: joi.number().min(6).max(6).required(),
   thirdSetGemsWinner: joi.number().min(6).max(6).required(),
   firstSetGemsLooser: joi.number().min(0).max(4).required(),
   secondSetGemsLooser: joi.number().min(0).max(4).required(),
   thirdSetGemsLooser: joi.number().min(0).max(4).required(),
});
const updateResultScheme=joi.object({
    id: joi.number().integer().min(1).required(),
    matchId: joi.number().min(1).required(),
    firstSetGemsWinner: joi.number().min(6).max(6).required(),
    secondSetGemsWinner: joi.number().min(6).max(6).required(),
    thirdSetGemsWinner: joi.number().min(6).max(6).required(),
    firstSetGemsLooser: joi.number().min(0).max(4).required(),
    secondSetGemsLooser: joi.number().min(0).max(4).required(),
    thirdSetGemsLooser: joi.number().min(0).max(4).required(),
});

const aboutUsScheme=joi.object({
    ///mozda treba joi.text()?
    text : joi.string().min(10).max(1000).required(),
});

const infoScheme=joi.object({ //kontakt
    phoneNumber: joi.string().min(3).max(20).required(),
    street: joi.string().min(3).max(20).required(),
    numberOfStreet: joi.number().required(),
    fax: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
});

module.exports = {
    userSchema,
    loginSchema,
    playerSchema,
    clubSchema,
    destinationScheme,
    idSchema,
    booleanSchema,
    staffSchema,
    tournamentScheme,
    infoScheme,aboutUsScheme,
    matchScheme,
    resultScheme,
    updatePlayerScheme,
    administrateUsersScheme,
    updateClubScheme,
    updateDestinationScheme,
    updateStaffScheme,
    updateTournamentScheme,
    updateMatchScheme,
    updateResultScheme,
    tennisPostScheme,
    


}

