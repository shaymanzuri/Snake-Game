import express from 'express'
import { getAllGameSessions,createGameSessions,getGameSessionsById,updateGameSessions,deleteGameSessions } from '../controllers/gameSession.controller.js';

const router = express.Router()

router.route("/").get(getAllGameSessions).post(createGameSessions);
router.route("/:id").get(getGameSessionsById).patch(updateGameSessions).delete(deleteGameSessions);

export default router;