const moongoose =require('moongoose');

const userSchema= new mongoose.Schema({
    name:{
        type:String ,
        required: [true , "A name is required"],
        unique: true, 
    },
    description :{
        type:String,
        trim:true
    },
    proImage:{
        type:String,
        reqired:[true , "Image is required"]
    },
    creationTime:{
        type:Date,
        default : Date.now()
    },
   
});

const USER = mongoose.model("USER",userSchema); 
module.exports = USER;