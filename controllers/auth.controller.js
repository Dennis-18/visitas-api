import {response, request} from "express";
import {pool } from "../db/db-config.js";

export const auth  = (req = request, res = response) => {
    const {password, correo_electronico} = req.body;

    if (!correo_electronico || !password) {
        return res.status(400).json({message: "Ingrese todos los valores"});
    }

    const query = `select e.nombre, e.apellido, e.telefono, e.direccion, e.dpi, e.correo_electronico, e.nombre_usuario, r.descripcion as rol, e.id_rol from empleados as e
    join roles as r 
    on e.id_rol = r.id_rol
    where e.estado = 1 and correo_electronico = '${correo_electronico}' and password = '${password}';`
    pool.query(query, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({message: error});
        }

        return res.status(200).json({user: results.rows});
    })
}