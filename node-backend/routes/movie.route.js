// create routes here
const express =require ("express");
const movie = require("../model/movie");
const app =express();
const movieRoute = express.Router();
let Movie = require('../model/movie');

//get all movies
movieRoute.route('/').get((req,res)=>{
    Movie.find((error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
});

//add a movie
movieRoute.route('/add-movie').post((req,res,next)=>{
    Movie.create(req.body,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    });
});

//get a movie by id
movieRoute.route('/read-movie/:id').get((req,res)=>{
    Movie.findById(req.params.id,(error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
});

//update movie
movieRoute.route('/update-movie/:id').put((req,res,next)=>{
    Movie.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },(error, data)=>{
        if(error){
            return next(error);
            console.log(error);
        }else{
            res.json(data);
            console.log('movie updated sucessfully');
        }
    });
});

//delete movie
movieRoute.route('/delete-movie/:id').delete((req,res, next)=>{
    Movie.findByIdAndRemove(req.params.id,(error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg:data
            });
        }

    });
});

//export routes
module.exports=movieRoute;