const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        required: true
    },
    orderCustomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    orderProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

module.exports = mongoose.model('Order', orderSchema);
