const mongoose = require("mongoose")

const { v4: uuidv4 } = require("node-uuid")



const custumerSchema = new mongoose.Schema({
    // _id:Number,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        require: true
    },
    mobileNumber: {
        type: String,
        require: true
    },
    DOB: {
        type: String,
        require: true
    },
    emailID: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    customerID: {
        type: String,
        default: uuidv4
    },

    status: {
        type: String,
        default: "INACTIVE"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })



module.exports = mongoose.model("customer", custumerSchema)