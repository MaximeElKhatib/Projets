const mongoose = require('mongoose') ;

const reservationSchema = new mongoose.Schema({
    car : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'Car',
    },
    user : {
        type : mongoose.Types.ObjectId,
        required : true, 
        ref : 'User',
    },
    status : {type : String, required : true},
    startDate : {type : Date, required : true},
    endDate : {type : Date, required : true},
    price : {type : Number, required : true},
    pickUpAdress : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'Succursale'
    },
    deliveryAdress : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'Succursale'
    },
}) ;

module.exports = mongoose.model('Reservation', reservationSchema) ;