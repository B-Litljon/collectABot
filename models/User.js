const mongoose = require('mongoose')

const userSchema = new Mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pptr_prompts:[{ // prompts for puppeteer
        page_url: {
            type: String,
            required: false
        },
        item_name: {
            type: String,
            required: false
        },
        purchase_qty: {
            type: Number,
            required: true
        }
    }]
})

module.exports = mongoose.model('User', userSchema)