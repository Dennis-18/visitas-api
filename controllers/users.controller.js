import {response, request} from "express";
import {pool} from "../db/db-config.js";
import bcrypt from "bcrypt";

const saltroudns = 10;
export const getUsers = (req = request, res = response) => {
    const {userId} = req.query;
    let query = `select e.nombre, e.apellido, e.telefono, e.direccion, e.dpi, e.correo_electronico, e.nombre_usuario, r.descripcion as rol from empleados as e
    join roles as r 
    on e.id_rol = r.id_rol
    where e.estado = 1;
    `;

    if (userId)
        query = `select e.nombre, e.apellido, e.telefono, e.direccion, e.dpi, e.correo_electronico, e.nombre_usuario, r.descripcion from empleados as e
        join roles as r 
        on e.id_rol = r.id_rol
        where e.estado = 1 AND id_empleado = ${userId}`;

    pool.query(query, (error, results) => {
        if (error) {
            console.log(query);
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
    const {nombre, apellido, direccion, telefono, dpi, password, correo_electronico, nombre_usuario, id_rol} = req.body;

    // let hashPassword;
    // bcrypt.genSalt(saltroudns, (error, salt) => {
    //     bcrypt.hash(password, salt, (error, hash) => {
    //         hashPassword = hash;
    //     })
    // })
    const query = `insert into empleados (nombre, apellido, direccion, telefono, dpi, password, correo_electronico, nombre_usuario, estado, id_rol) 
values('${nombre}', '${apellido}', '${direccion}', '${telefono}', '${dpi}', '${password}', '${correo_electronico}', '${nombre_usuario}', 1, ${id_rol});`

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

    const query = `update empleados set estado = 1 where id_empleado = ${userId}`;

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
    const {nombre, apellido, direccion, telefono, dpi, password, correo_electronico, nombre_usuario} = req.body;

    // let hashPassword;
    // bcrypt.genSalt(saltroudns, (error, salt) => {
    //     bcrypt.hash(password, salt, (error, hash) => {
    //         hashPassword = hash;
    //     })
    // })
    const query = `update empleados set nombre = '${nombre}', apellido = '${apellido}', direccion = '${direccion}', telefono ='${telefono}', dpi ='${dpi}', password = '${password}', correo_electronico = '${correo_electronico}', nombre_usuario = '${nombre_usuario}'
    where id_empleado = ${userId};`

    pool.query(query, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({message: error});
        }

        return res.status(200).json({message: "updated"});
    })

}

//TODO: ACTUALIZAR EL ROL DE UN USUARIO
