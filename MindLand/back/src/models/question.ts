import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Question = new Schema({
    id: {
        type: Number
    },
    text: {
        type: String
    },
    answer1: {
        type: String
    },
    answer2: {
        type: String
    },
    answer3:{
        type: String
    },
    answer4: {
        type: String
    },
    correctAnswer: {
        type: Number
    }
})

export default mongoose.model('Question', Question, 'questions');