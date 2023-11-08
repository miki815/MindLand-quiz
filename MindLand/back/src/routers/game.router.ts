import express from 'express';
import { GameController } from '../controllers/game.controller';

const gameRouter = express.Router();

gameRouter.route('/getQuestion').get(
    (req, res)=>new GameController().getQuestion(req, res)
)

gameRouter.route('/getQuestionById').post(
    (req, res)=>new GameController().getQuestionById(req, res)
)

gameRouter.route('/getAssociation').get(
    (req, res)=>new GameController().getAssociation(req, res)
)

gameRouter.route('/getAssociationById').post(
    (req, res)=>new GameController().getAssociationById(req, res)
)

gameRouter.route('/getSlovotekaStats').post(
    (req, res)=>new GameController().getSlovotekaStats(req, res)
)

gameRouter.route('/updateKorpaStats').post(
    (req, res)=>new GameController().updateKorpaStats(req, res)
)

gameRouter.route('/updateSkockoStats').post(
    (req, res)=>new GameController().updateSkockoStats(req, res)
)

gameRouter.route('/updateAsocijacijeStats').post(
    (req, res)=>new GameController().updateAsocijacijeStats(req, res)
)

gameRouter.route('/updateMojBrojStats').post(
    (req, res)=>new GameController().updateMojBrojStats(req, res)
)

gameRouter.route('/updatePitanjaStats').post(
    (req, res)=>new GameController().updatePitanjaStats(req, res)
)

gameRouter.route('/updateSlovotekaStats').post(
    (req, res)=>new GameController().updateSlovotekaStats(req, res)
)

gameRouter.route('/addAssociation').post(
    (req, res)=>new GameController().addAssociation(req, res)
)

gameRouter.route('/addQuestion').post(
    (req, res)=>new GameController().addQuestion(req, res)
)    

gameRouter.route('/checkWord').post(
    (req, res)=>new GameController().checkWord(req, res)
)

gameRouter.route('/updateGameStats').post(
    (req, res)=>new GameController().updateStats(req, res)
)

export default gameRouter;