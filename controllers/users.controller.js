
import {response, request } from "express";
import { pool } from "../db/db-config.js";

export const getUsers = (req = request, res = response) => {
    const {userId} = req.query;

    let query = "select * from users";

    if (userId)
        query = `select * from users where user_id = ${userId}`;

    pool.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({Error: error});
        }

        if (results.rows && results.rowCount > 0){
            return res.status(200).json(results.rows);
        } else {
            return res.json({message: "No records"});
        }

    })
}

