import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from './routers/user.routes';
import gameRouter from './routers/game.router';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// NOVO
let games = {};
let myNumberData = {};
let slovotekaData = {}
let pitanjaData = {};
let game = [];

const allLetters = ['а', 'б', 'в', 'г', 'д', 'ђ', 'е', 'ж', 'з', 'и', 'ј', 'к', 'л', 'љ', 'м', 'н', 'њ',
'о', 'п', 'р', 'с', 'т', 'ћ', 'у', 'ф', 'х', 'ц', 'ч', 'џ', 'ш'];
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });

io.on('connection', (socket) => {
    console.log(`NEW CONN ${socket.id}`);
    // start-game
    socket.on("playerArrive", (username, rating) =>{
        console.log(`username ${username} rating ${rating}`)
        let roomId = "room" + Object.keys(games).length.toString();
        console.log(roomId)
        if(game.length == 0) { // blue player arrive
            console.log("blue player");
            socket.emit("setPlayer", 0);
            game[0] = {username: username, rating: rating};
            socket.join(roomId);
        }
        else { // red player arrive
            console.log("red player");
            socket.emit("setPlayer", 1);
            socket.join(roomId);
            game[1] = {username: username, rating: rating};
            games[roomId] = {
                bluePlayer: game[0].username,
                blueRating: game[0].rating,
                redPlayer: game[1].username,
                redRating: game[1].rating,
                roomId: roomId,
                cnt: 0
            };
            game = [];
            console.log(`${games[roomId].bluePlayer} vs ${games[roomId].redPlayer}`);
            io.to(roomId).emit("startTimer", games[roomId]);
        }
    })

    socket.on("startGameRequest", idRoom => {
        console.log('starting game');
        io.to(idRoom).emit("startGame");
    })
    
    socket.on("playAssociation", (roomId) =>{
        console.log(`room ${roomId} cnt ${games[roomId].cnt} skocko`);
        games[roomId].cnt++;
        if(games[roomId].cnt == 2) {
            games[roomId].cnt = 0;
            let id = Math.floor(Math.random() * 2) + 1;
            io.to(roomId).emit("getAssociation", id);
        }   
    })

    socket.on("playSkocko", (roomId) =>{
        console.log(`room ${roomId} cnt ${games[roomId].cnt} skocko`);
        games[roomId].cnt++;
        if(games[roomId].cnt == 2) {
            games[roomId].cnt = 0;
            let combo = [-1, -1, -1, -1];
            for(let i = 0; i < 4; i++) combo[i] = (Math.floor(Math.random() * 6));
            io.to(roomId).emit("startSkockoTimer", combo);
        }   
    })

    socket.on("playMyNumber", (roomId) =>{
        console.log(`room ${roomId} cnt ${games[roomId].cnt} moj-broj`);
        games[roomId].cnt++;
        if(games[roomId].cnt == 2) {
            games[roomId].cnt = 0;
            io.to(roomId).emit("startMyNumberTimer");
        }   
    })

    socket.on("playSlovoteka", (roomId) =>{
        console.log(`room ${roomId} cnt ${games[roomId].cnt} slovoteka`);
        games[roomId].cnt++;
        if(games[roomId].cnt == 2) {
            games[roomId].cnt = 0;
            io.to(roomId).emit("startSlovotekaTimer");
        }   
    })

    socket.on("playKorpa", (roomId) =>{
        console.log(`room ${roomId} cnt ${games[roomId].cnt} korpa`);
        games[roomId].cnt++;
        if(games[roomId].cnt == 2) {
            let kasa = new Array(15);
            for(let i = 0;i < 15; i++) kasa[i] = (Math.floor(Math.random() * 50) + 1);
            games[roomId].cnt = 0;
            io.to(roomId).emit("startKorpaTimer", kasa);
        }   
    })

    socket.on("playPitanja", (roomId) =>{
        console.log(`room ${roomId} cnt ${games[roomId].cnt} pitanja`);
        games[roomId].cnt++;
        if(games[roomId].cnt == 2) {
            games[roomId].cnt = 0;
            let idPitanja = new Array(5); // TODO 10
            for(let i = 0;i < 5; i++) {
                let id = Math.floor(Math.random() * 20) + 1;
                while(idPitanja.includes(id)) id = Math.floor(Math.random() * 20) + 1;
                idPitanja[i] = id;
                pitanjaData[roomId] = {
                    blueAnswerId: null,
                    redAnswerId: null,
                    identFirst: null,
                    cnt: 0
                }
            }
            io.to(roomId).emit("startPitanja", idPitanja);
        }   
    })

    socket.on("answerInfo", (roomId, ident, answerId) => {
        pitanjaData[roomId].cnt++;
        if(ident == 0) pitanjaData[roomId].blueAnswerId = answerId;
        else pitanjaData[roomId].redAnswerId = answerId; 
        if(pitanjaData[roomId].cnt == 2){
            pitanjaData[roomId].cnt = 0;
            io.to(roomId).emit("answerData", pitanjaData[roomId].blueAnswerId, pitanjaData[roomId].redAnswerId, pitanjaData[roomId].identFirst);
        } 
        else pitanjaData[roomId].identFirst = ident;
    })

    socket.on("chooseNumberKorpaRequest", (idRoom, index) => {
        io.to(idRoom).emit("chooseNumberKorpa", index);
    })

    socket.on("selectNumberKorpaRequest", (idRoom, index) => {
        io.to(idRoom).emit("selectNumberKorpa", index);
    })

    socket.on("kasaFinish", (idRoom) => {
        let boundary =  (Math.floor(Math.random() * 31) + 70);
        io.to(idRoom).emit("startKorpaGame", boundary);
    })

    socket.on("requestNums", (roomId) =>{
        console.log("sending nums")
        let myNumber = (Math.floor(Math.random() * 999) + 1).toString();
        let number1 =  (Math.floor(Math.random() * 9) + 1).toString();
        myNumberData[roomId] = {
            blueDistance: null,
            redDistance: null,
            blueDigits: null,
            redDigits: null,
            number: myNumber,
            blueExpr: null,
            redExpr :null,
            cnt: 0
        }
        io.to(roomId).emit("getNums", myNumber, number1);
    })

    socket.on("requestLetters", (roomId) =>{
        console.log("sending letters")
        let letters = []
        for(let i = 0; i < 12; i++) letters[i] = allLetters[Math.floor(Math.random() * 30)];
        slovotekaData[roomId] = {
            blueWords: null,
            redWords: null,
            cnt: 0
        }
        io.to(roomId).emit("getLetters", letters);
    })

    socket.on("sendResNumber", (roomId, ident, distance, digitCnt, expr) =>{
        console.log("getting num data")
        if(ident == 0){
            myNumberData[roomId].blueDistance = distance;
            myNumberData[roomId].blueDigits = digitCnt;
            myNumberData[roomId].blueExpr = expr;
        }
        else{
            myNumberData[roomId].redDistance = distance;
            myNumberData[roomId].redDigits = digitCnt;
            myNumberData[roomId].redExpr = expr;
        }
        myNumberData[roomId].cnt++;
        if(myNumberData[roomId].cnt == 2)
            io.to(roomId).emit("finishGame", myNumberData[roomId]);
    })

    socket.on("sendResWords", (roomId, ident, words) =>{
        console.log("getting words data")
        if(ident == 0) slovotekaData[roomId].blueWords = words;
        else slovotekaData[roomId].redWords = words;
        slovotekaData[roomId].cnt++;
        if(slovotekaData[roomId].cnt == 2)
            io.to(roomId).emit("finishSlovoteka", slovotekaData[roomId]);
    })

    socket.on("changePlayer", idRoom => {
        console.log('changing player');
        io.to(idRoom).emit("changePlayer");
    })

    socket.on("fieldClick", (column, row) => {
        console.log('opening field');
        io.emit("openField", column, row);
    })

    socket.on("answerSubmit", (column, guess, playerId) => {
        console.log('checking answer');
        io.emit("answerCheck", column, guess, playerId);
    })

    socket.on("correctAnswer", idRoom => {
        console.log('correct answer');
        io.to(idRoom).emit("additionalTime");
    })

    // skocko

    socket.on("checkRequest", (idRoom, combo) => {
        console.log('checking combo');
        io.to(idRoom).emit("checkCombo", combo);
    })

    socket.on("endSkockoRequest", (idRoom) => {
        console.log('checking combo');
        io.to(idRoom).emit("endSkocko");
    })
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
});
// NOVO

mongoose.connect('mongodb://127.0.0.1:27017/Mindland');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connection ok')
})

const router = express.Router();
router.use('/users', userRouter);
router.use('/game', gameRouter);


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));