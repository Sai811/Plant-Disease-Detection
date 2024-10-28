const express = require("express");
const path = require("path");
const mongoDB = require("./db"); // Import MongoDB connection

const app = express();
const port = 80;

// Connect to MongoDB


const session = require('express-session');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));



// Route to serve the main HTML file (if you want to serve a static file)
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use((req,res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");  
    res.header(   
    "Access-Control-Allow-Headers",  
    "Origin, X-Requested-With, Content-Type, Accept"  
    );  
    next();
})   
    
    
// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle API requests
app.use('/api', require("./Routes/createuser")); 
app.use('/api', require("./Routes/loginuser")); 
app.use('/api', require("./Routes/profile")); 



app.listen(port, () => {
    console.log(`The application started on port ${port}`);
});
