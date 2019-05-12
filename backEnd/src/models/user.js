const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

if(process.env.NODE_ENV === 'production'){
        var SECRET = process.env.SECRET;
    }
    else{
        const config = require('../config.js')
        var SECRET = config.secret;
    }


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
        if(!validator.isEmail(value)) {
            throw new Error('Email invalido')
        }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    tokens: [{
        token: {
        type: String,
        required: true
        }
    }]
    },{
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true 
    }
})