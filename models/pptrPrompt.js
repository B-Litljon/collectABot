const mongoose = require('mongoose')

const pptrInputsSchema = new mongoose.Schema({
    page_url: {
      type: String,
      required: true,
    },
    item_name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    in_stock: {
      type: Boolean,
      default: false, 
    },
  })

  module.exports = mongoose.model('PptrInputs', pptrInputsSchema)
  