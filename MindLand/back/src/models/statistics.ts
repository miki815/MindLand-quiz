import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Stats = new Schema({
    username: {
        type: String
    },
    longestWord: {
        type: Number
    },
    totalWords: {
        type: Number
    },
    totalLetters: {
        type: Number
    },
    winSlovoteka: {
        type: Number
    },
    lossSlovoteka: {
        type: Number
    },
    winMojBroj: {
        type: Number
    },
    lossMojBroj: {
        type: Number
    },
    distance: {
        type: Number
    },
    digitCnt: {
        type: Number
    },
    skockoWin: {
        type: Number
    },
    skockoLoss: {
        type: Number
    },
    skockoCombos: {
        type: Number
    },
    korpaWin: {
        type: Number
    },
    korpaLoss: {
        type: Number
    },
    pitanjaTrue: {
        type: Number
    },
    pitanjaFalse: {
        type: Number
    },
    pitanjaDalje: {
        type: Number
    },
    pitanjaUkradiWin: {
        type: Number
    },
    pitanjaUkradiLoss: {
        type: Number
    },
    asocijacijeStats: {
        type: Array<Number>
    }
})

export default mongoose.model('Stats', Stats, 'statistics');