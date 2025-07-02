const mongoose = require('mongoose')
const validator = require('validator')
const { validate } = require('./users')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    stock_quantity: {
        type: Number,
        required: true,
        min: 0
    },
    images: [{
        type: String,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL")
            }
        }
    }],
    tags: [String],
    is_active: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("Product", productSchema);