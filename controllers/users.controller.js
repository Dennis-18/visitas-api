import e, {response, request} from "express";
import {pool} from "../db/db-config.js";

export const getUsers = (req = request, res = response) => {
    const {userId} = req.query;

    let query = `select u.user_id, u.name, u.last_name, u.birth_date, u.dpi, u.phone_number, ur.description as "role" from users as u
join user_roles as ur
on u.role_id = ur.role_id
where u.state = 1;`;

    if (userId)
        query = `select * from users where user_id = ${userId}`;

    pool.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({Error: error});
        }

        if (results.rows && results.rowCount > 0) {
            return res.status(200).json(results.rows);
        } else {
            return res.json({message: "No records"});
        }

    })
}

export const addUser = (req = request, res = response) => {
    const {name, lastName, birthDate, dpi, phoneNumber, roleId} = req.body;

    const query = `insert into users (name, last_name, birth_date, dpi, phone_number, role_id, state) 
values('${name}', '${lastName}', '${birthDate}', '${dpi}', '${phoneNumber}', ${roleId}, 1);`

    pool.query(query, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({message: error});
        }

        return res.status(200).json({message: "created"});
    })

}

export const deleteUser = (req = request, res = response) => {
    const {userId} = req.params;

    const query = `update users set state = 0 where user_id = ${userId}`;

    pool.query(query, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({message: error});
        }

        return res.status(200).json({message: "user deleted"});
    })

}

export const updateUser = (req = request, res = response) => {
    const {userId} = req.query;
    const {name, lastName, birthDate, dpi, phoneNumber} = req.body;

    const query = `update users set name = '${name}', last_name = '${lastName}', birth_date = '${birthDate}', dpi = '${dpi}', phone_number = '${phoneNumber}' where user_id = ${userId}`

    pool.query(query, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({message: error});
        }

        return res.status(200).json({message: "updated"});
    })

}
