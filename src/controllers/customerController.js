
const customerModel = require("../models/customerModel")

const uuidValidate = require("uuid-validate")


const registerCustomer = async (req, res) => {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "enter data in body to register" })
        }

        let { firstName, lastName, mobileNumber, DOB, emailID, address } = data
        if (!firstName) {
            return res.status(400).send({ status: false, msg: "enter firstName" })
        }

        if (!/^[a-zA-Z]*$/.test(firstName.trim())) {
            return res.status(400).send({ status: false, msg: "enter firstname only in alphabet no space allow" })

        }
        if (!lastName) {
            return res.status(400).send({ status: false, msg: "enter lastName" })
        }
        if (!/^[a-zA-Z]*$/.test(lastName.trim())) {
            return res.status(400).send({ status: false, msg: "enter lastName only in alphabet letter" })
        }
        if (!mobileNumber) {
            return res.status(400).send({ status: false, msg: "enter mobileNumber" })
        }

        if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
            return res.status(400).send({ status: false, msg: "ivalid mobile number or space is not allowed" })
        }
        if (!DOB) {
            return res.status(400).send({ status: false, msg: "enter DOB" })
        }
       
        if (!emailID) {
            return res.status(400).send({ status: false, msg: "enter emailID" })
        }
        if (!/^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(emailID)) {
            return res.status(400).send({ status: false, message: "Entered email is invalid" });
        }
        if (!address) {
            return res.status(400).send({ status: false, msg: "enter address" })
        }

        const savedData = await customerModel.create(data)
        // console.log(data)
        res.status(201).send({ status: true, data: savedData })

    } catch (err) {
        return res.send({ message: err.message })
    }

}


// ===========================  GET ALL CUSTOMERS ===================================//

const getCustomers = async (req, res) => {
    try {

        let data = await customerModel.find({ status: "ACTIVE" })

        if (data.length==0) {
            return res.status(404).send({ status: false, message: "customer not found" })
        }

        return res.status(200).send({ status: true, data: data })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}


//===================== DELETE CUSTOMER BY ID ==================================//

const customerDelete = async (req, res) => {
    try {

        let id = req.query.customerID           // getting customerID by query
        if (!id) {
            return res.status(400).send({ status: false, msg: "enter customerID in query params" })
        }                  
        if (!uuidValidate(id)) {                            // validatind uuid
            return res.status(400).send({ status: false, msg: "invalid uuid" })
        }
        let customer = await customerModel.findOne({ customerID: id, isDeleted: false })

        if (!customer) {
            return res.status(404).send({ status: false, message: "customer not found may be  deleted" })
        }

        customer.isDeleted = true
        await customer.save()

        return res.status(200).send({ status: true, msg: "Customer  deleted successfull" })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { registerCustomer, getCustomers, customerDelete }