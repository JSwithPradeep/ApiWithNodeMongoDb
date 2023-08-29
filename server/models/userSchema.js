const mongoose = require("mongoose");
const validator = require("validator");


//creater userschema

const userschema = new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
       validator(value){
        if(!validator.isEmail(value)){
            throw Error("not valid Email")
        }
       }
    },
    mobile:{
        type:String,
        require:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    gender:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Active", "In-Active"],
        default:"Active"
    },
    datecreated:Date,
    dateUpdated:Date
})

//module define
const users = new mongoose.model("users",userschema);
module.exports = users;

