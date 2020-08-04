const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ApplicantDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('Connected to MongoDb...') }
    else { console.log('Error with database connection: ' + err) }
});

require('./applicant-model');