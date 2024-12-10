const mongoose = require('mongoose') ;

const SuccursaleSchema = new mongoose.Schema({
    nom : {type : String, required: true},
    adresse : {type : String, required : true},
    availableCars : [{
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'Car'
    }],
}) ;

module.exports = mongoose.model('Succursale', SuccursaleSchema) ;