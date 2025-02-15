import express from 'express'
import { getAllUsers,createUsers,getUserById,updateUser,deleteUser,loginUser } from '../controllers/users.controller.js';

const router = express.Router()

router.route("/").get(getAllUsers).post(createUsers);
router.route("/login").post(loginUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export default router;