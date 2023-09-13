import {Router} from "express";
import {getUsers, addUser, deleteUser, updateUser } from "../controllers/users.controller.js";
const router = Router();
router.get("/", getUsers);

router.post("/", addUser);

router.delete("/:userId", deleteUser);

router.put("/", updateUser);
export default router;