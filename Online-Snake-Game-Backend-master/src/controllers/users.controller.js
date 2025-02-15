import bcrypt from "bcrypt";
import * as usersService from "../services/users.service.js";


const service = usersService;

export const getAllUsers = async (req, res) => {
  try {
    const user = await service.getAllUsers();
    res.json({ data: user, status: "success", message: 'Fetch all users successfully !!!' }).status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUsers = async (req, res) => {
  try {
    // check if pseudo is unique
    const userExist = await service.getOneUser({pseudo: req.body.pseudo})

    if(userExist)
        return res.status(400).json({ error: `sorry user with pseudo ${req.body.pseudo} already exist` });

    // encrypt users password
    const saltRounds = 10; 
    
    const hash = await bcrypt.hash(req.body.password, saltRounds)
    req.body.password = hash

    const user = await service.createUser(req.body)

    return res.json({ data: user, status: "success", message: "Account created sucessfully !!!" }).status(201);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await service.getUserById(req.params.id);
    if (user !== null) return res.json({ data: user, status: "success", message: 'users list !!!' }).status(200);

    return res.json({ data: user, status: "success", message: `No user with id: ${id} found` }).status(401);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res,next) => {
  try {
    let user = await service.updateUser(req.params.id, { ...req.body });
    if (user !== null) {
      user = await service.getUserById(req.params.id)
    }
    res.json({ data: user, status: "User updated with sucess" }).status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res,next) => {
  try {
    const userExist = await service.getOneUser({pseudo: req.body.pseudo})
    console.log("User: ",userExist)

    if(!userExist){
        return res.status(400).json({ error: `sorry user with pseudo ${req.body.pseudo} desn't exist` });
      }
      const result =  await bcrypt.compare(req.body.password, userExist.password)
      if(result){
        return res.json({ data: userExist, status: "Login successfull !!!" }).status(200);
      }else{
        res.status(500).json({ error: 'Wrong pseudo or password please try again !!!' });
      }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const deleteUser = async (req, res) => {
  try {
    const user = await service.deleteUser(req.params.id);
    res.json({ data: user, status: "success" }).status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

