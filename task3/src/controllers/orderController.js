const orderModel = require('../models/ordersModel');
const customerModel = require('../models/customerModel');
const productModel = require('../models/productModel');
module.exports.getAllOrders = async(req, res) =>{
    try{
        const orders = await orderModel.find().populate('orderCustomer').populate('orderProducts').exec();
        res.json(orders);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.getOrderById = async(req, res) =>{
    try{
        const order = await orderModel.findById(req.params.id).populate('orderCustomer').populate('orderProducts').exec();
        if(order){
            res.json(order);
        }else{
            res.status(404).json({message: "Order not found"});
        }
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.createOrder = async(req, res) =>{
    try{
        const productIds = req.body.products; // Assuming req.body.products is an array of product IDs
    
        // Fetch the product objects from the database based on the IDs
        const products = await productModel.find({ _id: { $in: productIds } });
        const order = new orderModel({
            //order date when the order was placed, moment of making request
            orderDate: Date.now(),
            //status is a string, can be one of the following: "pending", "processing", "completed", "cancelled"
            orderStatus: req.body.status,
            orderCustomer: req.body.customer,
            orderProducts: products
        });
        await order.save();
        const customer = await customerModel.findByIdAndUpdate(req.body.customer, {$push: {orders: order._id}});
        res.status(201).json(order);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.updateOrder = async(req, res) =>{
    try{
        const updatedOrder = orderModel.updateOne(
            {
                _id: req.params.id
            },
            {
                $set:{
                    customer: req.body.customer,
                    products: req.body.products
            }
        }
        );
        res.status(200).json(updatedOrder);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.deleteOrder = async(req, res) =>{
    try{
        const deletedOrder = await orderModel.deleteOne({_id: req.params.id});
        res.status(200).json(deletedOrder);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.addProductToOrder = async(req, res) =>{
    try{
        const order = await orderModel.findById(req.params.id);
        if(order){
            order.orderProducts.push(req.body.products);
            await order.save();
            res.status(201).json(order);
        }else{
            res.status(404).json({message: "Order not found"});
        }
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.removeProductFromOrder = async(req, res) =>{
    try{
        const order = await orderModel.findById(req.params.id);
        if(order){
            order.orderProducts.pull(req.body.products);
            await order.save();
            res.status(201).json(order);
        }else{
            res.status(404).json({message: "Order not found"});
        }
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}


