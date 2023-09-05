const {response, request} = require("express");

const getUsers = (req = request, res = response) => {
    const params = req.query;
    res.status(200).json({message: "get api - controller", params: params});
}

const postUser = (req, res = response) => {
    const body = req.body;
    res.status(201).json({"status: ": "ok", "message: ": body});
};

const putUser = (req, res = response) => {
    const id = req.params.userId;
    res.status(200).json({message: "PUT APP", updatedUser: id});
};

const deleteUser = (req, res = response) => {
    res.status(200).json({message: "DELETE APP"});
};
module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser
}