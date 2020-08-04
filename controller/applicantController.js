const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Applicant = mongoose.model('Applicant');

router.get('/', (req, res)=>{
    res.render("applicant/addOrEdit.hbs", {
        viewTitle : "Apply for Hiring"
    })
});

router.post('/', (req, res) => {
   insertRecord(req, res);
});

function insertRecord(req,res){
    var applicant = new Applicant();
    applicant.Name = req.body.Name;
    applicant.email = req.body.email;
    applicant.resLink = req.body.resLink;
    applicant.posApplied = req.body.posApplied;
    applicant.highQual = req.body.highQual;
    applicant.save((err,doc)=>{
        if(!err){
            res.redirect('applicant/list');
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("applicant/addOrEdit.hbs", {
                    viewTitle: "Apply for Hiring",
                    applicant: req.body
                });
            }
            console.log("Error in inserting: " + err);
        }
    });
}

router.get("/list", (req,res)=>{
    Applicant.find((err,docs)=>{
    
        if(!err){
            
            res.render("applicant/list.hbs", {
                list:docs,
                
                allowedProtoMethods: {
                    trim: true,
                  }
            });
        }
        else{
            console.log("Error in retreiving applicant list: " + err);
        }
    });
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'Name':
                body['NameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'resLink':
                body['resLinkError'] = err.errors[field].message;
                break;
            case 'posApplied':
                body['posAppliedError'] = err.errors[field].message;
                break;
            case 'highQual':
                body['highQualError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
module.exports = router;