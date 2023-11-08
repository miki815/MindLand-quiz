import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Association = new Schema({
    id: {
        type: Number
    },
    A: {
        type: Array<String>
    },
    B: {
        type: Array<String>
    },
    C: {
        type: Array<String>
    },
    D:{
        type: Array<String>
    },
    Konacno: {
        type: Array<String>
    }
})

export default mongoose.model('Association', Association, 'associations');