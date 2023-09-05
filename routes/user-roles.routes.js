const {Router} = require("express");
const {
    getUserRoles,
    postUserRole,
    putUserRole,
    deleteUserRole} = require("../controllers/user-roles.controllers");

const router = Router();

router.get("/", getUserRoles);

router.post("/", postUserRole);

router.put("/:roleId", putUserRole);

router.delete("/:roleId", deleteUserRole);
module.exports = router;