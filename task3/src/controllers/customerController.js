const customerModel = require('../models/customerModel');
const { body, validationResult} = require('express-validator');
module.exports.getAllCustomers = async(req, res) =>{
    //get all customers where isDeleted flag is false
    try{
        const customers = await customerModel.find({isDeleted: false}).populate('orders', ['_id', 'orderDate']).exec();
        res.json(customers);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.getCustomerById = async(req, res) =>{
    try{
        const customer = await customerModel.findById(req.params.id).populate('orders', ['_id', 'orderDate']).exec();
        if(customer){
            res.json(customer);
        }else{
            res.status(404).json({message: "Customer not found"});
        }
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.createCustomer = async(req, res) =>{

    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }

        const customer = new customerModel({
            customerName: req.body.customerName,
            customerEmail: req.body.customerEmail,
            customerPhone: req.body.customerPhone,
            customerPassword: req.body.customerPassword,        });
        await customer.save();
        res.status(201).json(customer);
    }catch(err){
        res.status(500).json({error: err});
    }

}

module.exports.updateCustomer = async(req, res) =>{
    try{
        const updatedCustomer = await customerModel.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set:{
                    customerName: req.body.customerName,
                    customerEmail: req.body.customerEmail,
                    customerPhone: req.body.customerPhone,
                    customerPassword: req.body.customerPassword
            }
        }
        );
        res.status(200).json(updatedCustomer);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.deleteCustomer = async(req, res) =>{
    try{
        const deletedCustomer = await customerModel.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set:{
                    isDeleted: true
                }
            });
        if(deletedCustomer){
            res.status(200).json(deletedCustomer);
        }else{
            res.status(404).json({message: "Customer not found"});
        }
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.softDeleteCustomer = async(req, res) =>{
    try{
        const deletedCustomer = await customerModel.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set:{
                    isDeleted: true
                }
            });
        if(deletedCustomer){
            res.status(200).json(deletedCustomer);
        }else{
            res.status(404).json({message: "Customer not found"});
        }
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}


module.exports.validate = (method) => {
    switch(method){
        case 'createCustomer':{
            return [
                body('customerName', 'Customer name is required').exists().matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.'),
                body('customerEmail', 'Customer email is required').exists(),
                body('customerEmail', 'Customer email is not valid').isEmail(),
                body('customerPhone', 'Customer phone is required').exists().isInt(),
                body('customerPassword', 'Customer password is required').exists()
            ]
        }
        case 'updateCustomer':{
            return [
                body('customerName', 'Customer name is required').exists(),
                body('customerEmail', 'Customer email is required').exists().isEmail(),
                body('customerPhone', 'Customer phone is required').exists().isInt(),
                body('customerPassword', 'Customer password is required').exists()

            ]
        }
    }
}

