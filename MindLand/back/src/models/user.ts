import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email:{
        type: String
    },
    rating: {
        type: Number
    },
    tokens: {
        type: Number
    },
    type: {
        type: String
    },
    win: {
        type: Number
    },
    loss: {
        type: Number
    },
    streak: {
        type: Number
    }
})

export default mongoose.model('User', User, 'users');