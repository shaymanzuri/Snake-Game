import usersSchema from "../models/users.model.js";

const schema = usersSchema;

export const getAllUsers = async () => {
    return await schema.find();
  };
   
  export const createUser = async (user) => {
    return await schema.create(user);
  };
  export const getUserById = async (id) => {
    return await schema.findById(id);
  };

  export const getOneUser = async (value)=>{
    return await schema.findOne(value)
  }
   
  export const updateUser = async (id, user) => {
    return await schema.findByIdAndUpdate(id, user);
  };
   
  export const deleteUser = async (id) => {
    return await schema.findByIdAndDelete(id);
  };
