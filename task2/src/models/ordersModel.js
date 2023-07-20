const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        required: true
    },
    orderStatus: {
        type: String,
        required: true
    },
    orderCustomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    orderProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

module.exports = mongoose.model('Order', orderSchema);
