import bcrypt from "bcrypt";
import * as gameSessionService from "../services/gameSession.service.js";
import * as usersService from '../services/users.service.js';


const service = gameSessionService;

export const getAllGameSessions = async (req, res) => {
  try {
    const gameSession = await service.getAllGameSessionsByPseudo(req.query.pseudo);
    res.json({ data: gameSession, status: "success", message: 'Fetch all game sessions successfully !!!' }).status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createGameSessions = async (req, res) => {
  try {
    const user = await service.createGameSessions(req.body)

    return res.json({ data: user, status: "success", message: "saved game session sucessfully !!!" }).status(201);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getGameSessionsById = async (req, res) => {
  try {
    const gameSession = await service.getGameSessionsById(req.params.id);
    if (gameSession !== null) return res.json({ data: gameSession, status: "success", message: 'game sessions list !!!' }).status(200);

    return res.json({ data: gameSession, status: "success", message: `No game session with id: ${id} found` }).status(401);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateGameSessions = async (req, res,next) => {
  try {
    let gameSession = await service.updateGameSessions(req.params.id, { ...req.body });
    if (gameSession !== null) {
      gameSession = await service.getGameSessionsById(req.params.id)
    }
    res.json({ data: gameSession, status: "game session updated with sucess" }).status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteGameSessions = async (req, res) => {
  try {
    const gameSession = await service.deleteGameSessions(req.params.id);
    res.json({ data: gameSession, status: "success" }).status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

