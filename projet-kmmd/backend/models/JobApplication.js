const mongoose = require('mongoose') ;

const jobApplicationSchema = new mongoose.Schema({
    candidate :[{
        type:mongoose.Types.ObjectId,
        required : true,
        ref : 'Candidate',
    }],
    jobOffer :[{
        type:mongoose.Types.ObjectId,
        required : true,
        ref : 'JobOffer',
    }],
    coverLetter : {type: String, required : true},
    resume : {type: String, required: true},
    applicationStatus : {type: String, required: true},
    applicationDate : {type: Date, required : true},
    employerComment : {type: String, required: true},
}) ;

module.exports = mongoose.model('JobApplication', jobApplicationSchema) ;