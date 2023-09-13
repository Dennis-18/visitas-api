import {response, request} from "express";
import {pool } from "../db/db-config.js";
export const getUserRoles = (req = request, res = response) => {
    const {roleId} = req.query;

    let query = "select * from user_roles where state = 1";

    if (roleId)
        query = `select * from user_roles where id_role = ${roleId} and state = 1`;

    pool.query(query, (error, results) => {
        if (error) {
            res.status(500).json({Error: error});
        }

        res.status(200).json(results.rows);
    })
}

export const postUserRole = (req, res = response) => {
    const { description } = req.body;

    if (!description) {
       return res.status(405).json({message: "bad request"});
    }
    const query = `insert into user_roles(description, state) values('${description}', 1);`
    pool.query(query, (error, results) => {
        if (error) {
            console.log(query);
           return res.status(405).json({message: error});
        }

       return res.status(200).json({message: "created"});
    })
};

export const putUserRole = (req, res = response) => {
    const {roleId} = req.params;
    const {description} = req.body;
    const query =  `update user_roles set description = '${description}' where id_role = ${roleId}`
    pool.query(query, (error, results) => {
        if (error) {
            return res.status(400).json({message: error});
        }

        return res.status(200).json({message: "updated"});
    })
};

export const deleteUserRole = (req, res = response) => {
    const {roleId} = req.params;
    const query =  `update user_roles set state = 0 where id_role = ${roleId}`
    pool.query(query, (error, results) => {
        if (error) {
            return res.status(400).json({message: error});
        }

        return res.status(200).json({message: "deleted"});
    })
};
