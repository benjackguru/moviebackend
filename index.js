//create connection code
let express = require('express'),
path = require('path'),
mongoose = require ('mongoose'),
cors = require('cors'),
bodyparser = require ('body-parser'),
mongoDb= require('./database/db');
const { bodyParser } = require('json-server');




mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database connected successfully!")
},error=>{
    console.log("Data base error:" +error)
});


// here goindg to create port and server book
const movieRoute =require("./node-backend/routes/movie.route");

const app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:false
}));
app.use(cors());

//create static path
app.use(express.static(path.join(__dirname,'dist/moviesite')));

//api root
app.use('/api',movieRoute);

//port create
const port = process.env.post||8000;
app.listen(port,()=>{
    console.log('listening port on' +port)
});

//404 error handler
app.use((req,res,next)=>{
    next(createError(404));
});

//base route
app.get('/', (req,res)=>{
    res.send('invalid endpoint');
});
app.get('*', (req,res)=>{
    res.snedFile(path.join(__dirname,'dist/moviesite/index.html'));
});
app.use(function(err,req,res,next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode=500;
    res.status(err.statusCode).send(err.message);
});