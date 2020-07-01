const { request, response } = require("express");
const Transaction = require('../models/Transaction')

exports.getTransactions = async (request, response, next) => {
    try {
      const transactions = await Transaction.find();
  
      return response.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions
      });
    } catch (err) {
      return response.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }

  exports.addTransaction = async (request, response, next) => {
    try {
      const { text, amount } = request.body;
  
      const transaction = await Transaction.create(request.body);
    
      return response.status(201).json({
        success: true,
        data: transaction
      }); 
    } catch (err) {
      if(err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
  
        return response.status(400).json({
          success: false,
          error: messages
        });
      } else {
        return response.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
    }
  }

exports.deleteTransaction = async (request, response, next) => {
    try {
        const transaction = await Transaction.findById(request.params.id);

        if (!transaction){
            return response.status(404).json({
                success: false,
                error: 'No transaction found.'
            })
        }
        await transaction.remove();

        return response.status(200).json({
            success: true,
            data: {}
        })
    } catch (error){
        return response.status(500).json({
            success: false,
            error: 'Server Error'
          });
        
    }
} 