
const cardModel = require("../models/cardModel")
const customerModel = require("../models/customerModel")



const createCard = async (req, res) => {
    try {

        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "enter data in body to create card" })
        }

        let { cardType, customerName, customerID } = data

        if (!cardType) {
            return res.status(400).send({ status: false, msg: "enter cardType" })
        }

        if (!["REGULAR", "SPECIAL"].includes(cardType)) {
            return res.status(400).send({ status: false, msg: "cardType only REGULAR/SPECIAL" })
        }
        if (!customerName) {
            return res.status(400).send({ status: false, msg: "enter customername" })
        }
        if (!/^[a-zA-Z]*$/.test(customerName.trim())) {
            return res.status(400).send({ status: false, msg: "customerName only should be in string format" })

        }


        let customer = await customerModel.findOne({ customerID: customerID })

        if (!customer) {
            return res.status(404).send({ status: false, msg: "customerID not found in customer cullection" })
        }
        let uniqCustomer = await cardModel.findOne({ customerID: customerID })

        if (uniqCustomer) {
            return res.status(400).send({ status: false, message: "Card already created with this customerID" })
        }

        let cards = await cardModel.find()
        data.cardNumber = "C" + (cards.length + 1).toString().padStart((4 - cards.length.toString().length), '0');

        let savedData = await cardModel.create(data)
        return res.status(201).send({ status: true, data: savedData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// ===================  GET ALL CARDLIST===================================//

const getCardList = async (req, res) => {
    try {
        let cards = await cardModel.find()
        if (cards.length == 0) {
            return res.status(404).send({ status: false, msg: "Card not found" })
        }

        return res.status(200).send({ status: true, data: cards })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



module.exports = { createCard, getCardList }



