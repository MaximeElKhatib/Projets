const mongoose = require('mongoose') ;

const candidateSchema = new mongoose.Schema({
    firstName : {type : String, required: true},
    lastName : {type: String , required : true},
    email : {type: String, required : true},
    password : {type: String, required : true},
    phoneNumber : {type: String, required : true},
    location : {type : String, required : true},
    profilePicture : {type: String , required : true},
    jobApplications :[{
        type:mongoose.Types.ObjectId,
        required : true,
        ref : 'jobApplication',
    }],
}) ;

module.exports = mongoose.model('Candidate', candidateSchema) ;
