const mongoose = require("mongoose")


const cardSchema= new mongoose.Schema({
   
    cardNumber: {
        type:String,
        require:true
    },
    cardType:{
        type:String,
        enum:["REGULAR","SPECIAL"],
        require:true

    },
    customerName:{
        type: String,
        require:true
    },
    status:{
        type:String,
        enum:["ACTIVE", "INACTIVE"],
        default:"ACTIVE"
    },
    vision:{
        type:String
    },
    customerID:{
        type:String,
        ref:"customer",
        unique:true
    }


},{timestamps:true})

const card= mongoose.model("card",cardSchema)

module.exports = card