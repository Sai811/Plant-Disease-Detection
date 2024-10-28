const mongoose = require('mongoose');

// MongoDB URI

mongoose.set('debug', true);
// Function to connect to MongoDB
const mongoDB = async () => {
    const mongoURI = 'mongodb://localhost:27017';
    
        await  mongoose.connect(mongoURI);
        var db=mongoose.connection;
        db.on('error',console.error.bind(console,'connection error:'));

        db.once('open',function(){
            console.log("connected to database")
        })

   
};

// Export the function for use in other files
module.exports = mongoDB();
