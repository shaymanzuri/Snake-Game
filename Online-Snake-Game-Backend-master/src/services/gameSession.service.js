import gameSessionsSchema from "../models/gameSessions.model.js";

const schema = gameSessionsSchema;

export const getAllGameSessions = async () => {
    return await schema.find();
  };

  export const getAllGameSessionsByPseudo = async (pseudo) => {
    return await schema.find({pseudo});
  };
   
  export const createGameSessions = async (gameSession) => {
    return await schema.create(gameSession);
  };
  export const getGameSessionsById = async (id) => {
    return await schema.findById(id);
  };

  export const getOneGameSessions = async (value)=>{
    return await schema.findOne(value)
  }
   
  export const updateGameSessions = async (id, gameSession) => {
    return await schema.findByIdAndUpdate(id, gameSession);
  };
   
  export const deleteGameSessions = async (id) => {
    return await schema.findByIdAndDelete(id);
  };
