const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
        type:String,
        validate:{
            validator: function(v) {
                return /^[a-zA-Z]+$/;
            },
            message: props => `${props.value} is not a valid first name`
        },
        required: [true,"firstname required"],
        trim: true,
        minlength: 3,
    },
    lastname: {
        type:String,
        validate:{
            validator: function(v) {
                return /^[a-zA-Z]+$/;
            },
            message: props => `${props.value} is not a valid last name`
        },
        required: [true,"lastname required"],
        trim: true,
        minlength: 3,
    },
    email: {
        type:String,
        lowercase:true,
        unique:true,
        trim:true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message:props=> `${props.value} is not a valid email`
        },
        required: [true, "Email required"]
    },
    username: {
        type: String,
        unique: true,
        validate:{
            validator: function(v) {
                return /^[a-zA-Z0-9]+$/;
            },
            message: props => `${props.value} is not a valid first username`
        },
        required: [true,"username required"],
        trim: true,
        minlength: 3,
        maxlength: 8
    },
    password: {
        type: String,
        validate:{
            validator: function(v) {
                return /^[a-zA-Z0-9]+$/;
            },
            message: props => `${props.value} is not a valid password`
        },
        required: [true,"password required"],
    }
})

const User = mongoose.model("Users", userSchema)

module.exports = User