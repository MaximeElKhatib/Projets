const mongoose = require('mongoose') ;

const reviewSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        required : true, 
        ref : 'User',
    },
    car : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'Car',
    }, 
    rating : {type : Number, required : true},
    comment : {type : String},
    date : {type : Date},
    comfort : {type : Number, required : true},
    cleanliness : {type : Number, required : true},
    pickUpReturn : {type : Number, required : true},
    valueForMoney : {type : Number, required : true},
})

module.exports = mongoose.model('Review', reviewSchema) ;