const mongoose = require('mongoose') ;

const UserSchema = new mongoose.Schema({
    nom : {type : String, required : true},
    prenom : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    reviews : [{
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'Review',
    }],
    locationsEnCours : [{
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'Reservation',
    }],
    isAdmin : {type : Boolean, required : true}
}) ;

module.exports = mongoose.model('User', UserSchema) ;