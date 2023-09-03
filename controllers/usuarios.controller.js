const {response} = require("express");

const getUsers = (req, res = response) => {
    res.status(200).json({message: "get api - controller"});
}

const postUser = (req, res = response) => {
    res.status(201).json({message: "POST APP"});
};

const putUser = (req, res = response) => {
    res.status(200).json({message: "PUT APP"});
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