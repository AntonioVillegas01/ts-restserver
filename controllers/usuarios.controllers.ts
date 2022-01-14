import {Request, Response}from 'express'
import Usuario from "../models/usuario.model";

export const getUsuarios = async (req:Request, res:Response) => {

    const usuarios = await Usuario.findAll();


    res.json({usuarios})

}

export const getUsuario = async (req:Request, res:Response) => {

    const {id} = req.params


    const usuario = await Usuario.findByPk(id);

    if(!usuario){
       return res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }

    res.json(usuario)

}

export const postUsuario = async (req:Request, res:Response) => {

    const {body} = req

    try{

        const existeEmail= await Usuario.findOne({
            where:{
                email: body.email
            }
        })

        if(existeEmail){
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            })
        }


        const usuario = await Usuario.create(body)
        res.json( {usuario} );


    }catch (e) {
        console.log(e)
        res.status(500).json({
            msg:'Hable con el administrador'
        })

    }

}

export const putUsuario = async (req:Request, res:Response) => {

    const {id} = req.params
    const {body} = req


    try{


        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }

        const existeEmail= await Usuario.findOne({
            where:{
                email: body.email
            }
        })

        if(existeEmail){
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            })
        }

        await usuario.update(body)

        res.status(201).json(usuario)


    }catch (e) {
        console.log(e)
        res.status(500).json({
            msg:'Hable con el administrador'
        })

    }

}

export const deleteUsuario = async (req:Request, res:Response) => {

    const {id} = req.params

    try{
        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
        }

        // usuario.destoy borra fisicamente de la base de datos
        // await usuario.destroy();

        await usuario.update({estado: false})

        res.json(usuario)

    }catch (e) {
        res.status(500).json({
            msg:'deleteUsuario'
        })
    }



}

