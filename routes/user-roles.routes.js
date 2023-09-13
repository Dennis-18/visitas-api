import {Router} from "express";
import {
    getUserRoles,
    postUserRole,
    putUserRole,
    deleteUserRole} from "../controllers/user-roles.controllers.js";
const router = Router();

router.get("/", getUserRoles);

router.post("/", postUserRole);

router.put("/:roleId", putUserRole);

router.delete("/:roleId", deleteUserRole);

export default router;