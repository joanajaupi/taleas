const customerModel = require('../models/customerModel');

module.exports.getAllCustomers = async(req, res) =>{
    try{
        const customers = await customerModel.find().populate('orders').exec();
        res.status(200).json(customers);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.getCustomerById = async(req, res) =>{
    try{
        const customer = await customerModel.findById(req.params.id).populate('orders').exec();
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
        const customer = new customerModel({
            customerName: req.body.customerName,
            customerEmail: req.body.customerEmail,
            customerPhone: req.body.customerPhone,
            //hash the password before saving it to the database
            customerPassword: await bcrypt.hash(req.body.customerPassword, 10)
        });
        await customer.save();
        res.status(201).json(customer);
    }catch(err){
        res.status(500).json({error: err});
    }
}

module.exports.updateCustomer = async(req, res) =>{
    try{
        const updatedCustomer = await customerModel.updateOne(
            {
                _id: req.params.id
            },
            {
                $set:{
                    customerName: req.body.customerName,
                    customerEmail: req.body.customerEmail,
                    customerPhone: req.body.customerPhone,
                    //hash the password before saving it to the database
                    customerPassword: await bcrypt.hash(req.body.customerPassword, 10)
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
        const deletedCustomer = await customerModel.findByIdAndDelete(req.params.id);
        if(deletedCustomer){
            res.status(200).json(deletedCustomer);
        }else{
            res.status(404).json({message: "Customer not found"});
        }
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}


