import * as express from 'express';
import Question from '../models/question';
import Association from '../models/association';
import Statistics from '../models/statistics';
import Word from '../models/word';
import User from '../models/user';




export class GameController{
    getQuestion = (req: express.Request, res: express.Response)=>{
        let id = Math.floor(Math.random() * 6) + 1;
        Question.findOne({'id': id}, (err, question) =>{
            if(err) console.log(err);
            else res.json(question);
        })
    }

    getQuestionById = (req: express.Request, res: express.Response)=>{
        console.log("ID quest")
        let id = req.body.id;
        Question.findOne({'id': id}, (err, question) =>{
            if(err) console.log(err);
            else res.json(question);
        })
    }

    getAssociation = (req: express.Request, res: express.Response)=>{
        let id = Math.floor(Math.random() * 1) + 1;
        Association.findOne({'id': id}, (err, newAss) =>{
            if(err) console.log(err);
            else res.json(newAss);
        })
    }

    getAssociationById = (req: express.Request, res: express.Response)=>{
        console.log("ID assoc");
        let id = req.body.id;
        Association.findOne({'id': id}, (err, newAss) =>{
            if(err) console.log(err);
            else res.json(newAss);
        })
    }

    getSlovotekaStats = (req: express.Request, res: express.Response)=>{
        console.log("getting slovoteka stats");
        let username = req.body.username;
        Statistics.findOne({'username': username}, (err, stat) =>{
            if(err) console.log(err);
            else res.json(stat);
        })
    }

    updateKorpaStats = (req: express.Request, res: express.Response)=>{
        console.log("updating korpa stats");
        let winUser = req.body.winUser;
        let lossUser = req.body.lossUser;
        Statistics.updateOne({'username': winUser}, {$inc: {'korpaWin': 1}}, (err, resp) =>{
            if(err) console.log(err);
            Statistics.updateOne({'username': lossUser}, {$inc: {'korpaLoss': 1}}, (err, resp) =>{
                if(err) console.log(err);
                else res.json({'msg': 'korpaStatsUpdated'});
            })
        })
    }

    updateSkockoStats = (req: express.Request, res: express.Response)=>{
        console.log("updating skocko stats");
        let username = req.body.username;
        let found = req.body.found;
        let combos = req.body.combos;
        if(found == true){
            Statistics.updateOne({'username': username}, {$inc: {'skockoWin': 1, 'skockoCombos': combos}}, (err, resp) =>{
                if(err) console.log(err);
                else res.json({'msg': 'skockoStatsUpdated'});
            })
        }
        else{
            Statistics.updateOne({'username': username}, {$inc: {'skockoLoss': 1, 'skockoCombos': combos}}, (err, resp) =>{
                if(err) console.log(err);
                else res.json({'msg': 'skockoStatsUpdated'});
            })
        }
    }

    updateMojBrojStats = (req: express.Request, res: express.Response)=>{
        console.log("updating moj broj stats");
        let blueUser = req.body.blueUser;
        let redUser = req.body.redUser;
        let gameData = req.body.gameData;
        let winner = req.body.winner;
        let redWin, blueWin;
        if(winner = 0) blueWin = 1, redWin = 0;
        else blueWin = 0, redWin = 1;

        Statistics.updateOne({'username': blueUser}, {$inc: {'winMojBroj': blueWin, 'lossMojBroj': 1 - blueWin,
            "distance": gameData.blueDistance, "digitCnt": gameData.blueDigits}}, (err, resp) =>{
            if(err) console.log(err);
            else {
                Statistics.updateOne({'username': redUser}, {$inc: {'winMojBroj': redWin, 'lossMojBroj': 1 - redWin,
                "distance": gameData.redDistance, "digitCnt": gameData.redDigits}}, (err, resp) =>{
                    if(err) console.log(err);
                    else res.json({'msg': 'mojBrojStatsUpdated'});
                })
            }
        })
    }

    updatePitanjaStats = (req: express.Request, res: express.Response)=>{
        console.log("updating pitanja stats");
        let pitanjaStats = req.body.pitanjaStats;
        Statistics.updateOne({'username': pitanjaStats.players[0]}, {$inc: {'pitanjaTrue': pitanjaStats.pitanjaTrue[0],
         'pitanjaFalse': pitanjaStats.pitanjaFalse[0], "pitanjaDalje": pitanjaStats.pitanjaDalje[0],
         'pitanjaUkradiWin': pitanjaStats.pitanjaUkradi[0], 'pitanjaUkradiLoss': 1 - pitanjaStats.pitanjaUkradi[0]}},
          (err, resp) =>{
            if(err) console.log(err);
            else {
                Statistics.updateOne({'username': pitanjaStats.players[1]}, {$inc: {'pitanjaTrue': pitanjaStats.pitanjaTrue[1],
                'pitanjaFalse': pitanjaStats.pitanjaFalse[1], "pitanjaDalje": pitanjaStats.pitanjaDalje[1],
                'pitanjaUkradiWin': pitanjaStats.pitanjaUkradi[1], 'pitanjaUkradiLoss': 1 - pitanjaStats.pitanjaUkradi[1]}},
                 (err, resp) =>{
                   if(err) console.log(err);
                   else res.json({'msg': 'pitanjaStatsUpdated'});
               })
            }
        })
    }

    updateAsocijacijeStats = (req: express.Request, res: express.Response)=>{
        console.log("updating asocijacije stats");
        let asocStats = req.body.asocStats;
        Statistics.findOne({'username': asocStats.players[0]}, (err, stat)=>{
            if(err) console.log(err);
            else {
                stat.asocijacijeStats[asocStats.solved[0]]++;
                stat.save().then(us=>{
                    Statistics.findOne({'username': asocStats.players[1]}, (err, stat)=>{
                        if(err) console.log(err);
                        else {
                            stat.asocijacijeStats[asocStats.solved[1]]++;
                            stat.save().then(us=>{
                                res.status(200).json({'msg': 'asocijacijeStatsUpdated'});
                            }).catch(err=>{
                                res.status(400).json({'msg': 'Greska asocijacije stats'});
                            })
                        }
                    })
                }).catch(err=>{
                    res.status(400).json({'msg': 'Greska asocijacije stats'});
                })
            }
        })
    }

    updateSlovotekaStats = (req: express.Request, res: express.Response)=>{
        console.log("updating slovoteka stats");
        let slStats = req.body.slovotekaStats;
        Statistics.findOne({'username': slStats.players[0]}, (err, stat)=>{
            if(err) console.log(err);
            else {
                stat.longestWord += slStats.longestWord[0];
                stat.totalWords += slStats.totalWords[0];
                stat.totalLetters += slStats.totalLetters[0];
                stat.winSlovoteka += slStats.wins[0];
                stat.lossSlovoteka += (1 - slStats.wins[0]);
                stat.save().then(us=>{
                    Statistics.findOne({'username': slStats.players[1]}, (err, stat)=>{
                        if(err) console.log(err);
                        else {
                            stat.longestWord += slStats.longestWord[1];
                            stat.totalWords += slStats.totalWords[1];
                            stat.totalLetters += slStats.totalLetters[1];
                            stat.winSlovoteka += slStats.wins[1];
                            stat.lossSlovoteka += (1 - slStats.wins[1]);
                            stat.save().then(us=>{
                                res.status(200).json({'msg': 'slovotekaStatsUpdated'});
                            }).catch(err=>{
                                res.status(400).json({'msg': 'Greska asocijacije stats'});
                            })
                        }
                    })
                }).catch(err=>{
                    res.status(400).json({'msg': 'Greska asocijacije stats'});
                })
            }
        })
    }

    addAssociation  = (req: express.Request, res: express.Response)=>{
        let newAssoc = req.body.assoc;
        Association.collection.count({}, (err, numOfAssoc) =>{
            if(err) console.log(err);
            else{
                let assoc = new Association({
                    id: numOfAssoc + 1,
                    A: newAssoc.A,
                    B: newAssoc.B,
                    C: newAssoc.C,
                    D: newAssoc.D,
                    Konacno: newAssoc.Konacno
                })
                assoc.save((err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": -2})
                    }
                    else res.json({"message": 0})
                })
            }
        })
    }

    addQuestion = (req: express.Request, res: express.Response)=>{
        let newQuest = req.body.quest;
        Question.collection.count({}, (err, numOfQuest) =>{
            if(err) console.log(err);
            else{
                let quest = new Question({
                    id: numOfQuest + 1,
                    answer1: newQuest.answer1,
                    answer2: newQuest.answer2,
                    answer3: newQuest.answer3,
                    answer4: newQuest.answer4,
                    text: newQuest.text,
                    correctAnswer: newQuest.correctAnswer
                })
                quest.save((err, resp)=>{
                    if(err) {
                        console.log(err);
                        res.status(400).json({"message": -2})
                    }
                    else res.json({"message": 0})
                })
            }
        })
    }

    checkWord = (req: express.Request, res: express.Response)=>{
        let myWord = req.body.word;
        console.log(myWord);
        Word.findOne({'rec': myWord}, (err, rec) =>{
            if(err) console.log(err);
            else if(rec == null) res.json({'status': 0});
            else res.json({'status': 1});
        })
    }
   

    updateStats  = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let win = req.body.win;
        let rating = req.body.rating;
        console.log('updating game stats');
        User.findOne({'username': username}, (err, user) =>{
            if(err) console.log(err);
            else {
                user.win += win;
                user.loss += (1 - win);
                user.streak = win == 1? user.streak + 1 : 0;
                user.tokens = win == 1? user.tokens + 10 : user.tokens - 20;
                user.rating = rating;
                user.save().then(us=>{
                    res.status(200).json({'poruka': 'Statistika azurirana'});
                }).catch(err=>{
                    res.status(400).json({'poruka': 'Greska pri promeni statistike'});
                })
            }
        })
    }

}