const mongoose = require('mongoose') ;

const CarSchema = new mongoose.Schema({
    fabricator : {type : String, required : true},
    model : {type : String, required : true},
    categorie : {type : String, required : true} ,
    reviews : [{
        type : mongoose.Types.ObjectId,
        required : true, 
        ref : 'Review'
    }],
    year : {type : Number, required : true},
    isAutomatic : {type : Boolean, required : true},
    isElectric : {type : Boolean, required : true},
    dailyRentalPrice : {type : Number, required : true},
    doors : {type : Number, required : true},
    seats : {type : Number, required: true},
    image : {type : String, required : true},
    baggage : {type : Number , required : true},
    rating : {type : Number, required : true},
    hundredKmComsommation : {type : Number},
    kmRange : {type : Number},
    fuelType : {type : String, required : true},
}) ;

module.exports = mongoose.model('Car', CarSchema) ;