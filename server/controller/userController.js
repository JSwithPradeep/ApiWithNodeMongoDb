const users = require("../models/userSchema");
const moment = require("moment")

//create user
exports.userpost = async(req,res)=> {
    const {firstname, email, mobile, gender, status} = req.body;

    if(!firstname || !email || !mobile || !gender || !status){
        res.status(400).json({error: "All Input Is required"})
    }

    try{
        const preuser = await users.findOne({ email: email});
        if(preuser){
             res.status(400).json({error: "This user already exit in our database"});
        } else{
            const datecreate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
            
             const userData = new users({
                firstname, email, mobile, gender, status, datecreated:datecreate
             });
             await userData.save();
             res.status(200).json(userData)
        }

    } catch(err) {
        res.status(400).json(err);
        console.log("Catch block Error");

    }
}

//get user
exports.getuser = async (req,res)=>{
    const search = req.query.search || "";
    const status = req.query.status || "";
    const gender = req.query.gender || "";
    const sort = req.query.sort || "";
    const page = req.query.page || 1;
    const ITEM_PER_PAGE = req.query.iteams || 4
    
    const query = {
        firstname:{$regex:search,$options:"i"}
    }

    if(status !== "All"){
        query.status = status
    }

    if(gender !== "All"){
        query.gender = gender
    }

    try{
        //skip
        const skip = (page - 1) *ITEM_PER_PAGE

        //count document
        const count = await users.countDocuments(query)

        const userData = await users.find(query)
        .sort({datecreated:sort == "new" ? -1 : 1 })
        .limit(ITEM_PER_PAGE)
        .skip(skip);

        const pageCount = Math.cell(count/ITEM_PER_PAGE);

        res.status(200).json({
            pagination:{
                count:pageCount
            },
        })
    }catch(err){
        res.status(400).json(err);
        console.log("Catch block Error");

    }
}

//get single user

exports.getsingleuser = async(req,res)=>{
    const {id} = req.params;

    try{
        const singleuserData = await users.findOne({_id:id});
        res.status(200).json(singleuserData);

    }catch(err){
        res.status(400).json(err);
        console.log("Catch block Error");
    }
}

//delete user

exports.deleteuser = async(req,res)=>{
    const {id} = req.params;

    try{
        const  deleteuserData = await users.findByIdAndDelete({_id:id});
        res.status(200).json(deleteuserData)

    }catch(err){
        res.status(400).json(err);
        console.log("Catch block Error");
    }
}

//update user

exports.updateuser = async(req,res)=>{
    const {id} = req.params;

    try{
        const  dateUpdated= moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
       
        const updateuserData = await users.update({_id:id},{
        firstname, email, mobile, gender, status, dateUpdated:dateUpdated
        },{new:true})
        await updateuserData.save();
        res.status(200).json(updateuserData);
       
    }catch(err){
        res.status(400).json(err);
        console.log("Catch block Error");
    }
}