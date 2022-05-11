import {RequestHandler} from 'express'
import Video from './Video'
const mongoose = require('mongoose')



export const createVideo:RequestHandler = async (req, res) => { 
    const videoEncontrado = await Video.findOne({url: req.body.url})
    if (videoEncontrado) {
        return res.status(301).json("La URL ya existe")
    }
    const video = new Video(req.body)
    const videoGuardado = await video.save();    
    res.json(videoGuardado) 
}

export const getVideos:RequestHandler = async (req, res) => { 
    try{
        const videos = await Video.find();
        return res.json(videos)
    }catch(err){
        res.json(err)
    }
}

export const getVideo:RequestHandler = async (req, res) => {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json("El id es invalido")
    }
    const videoEncontrado = await Video.findById(req.params.id)
    if(videoEncontrado == null){
        return res.status(204).json()
    }
    return res.json(videoEncontrado)
}

export const deleteVideo:RequestHandler = async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json("El id es invalido")
    }

    const videoEncontrado = await Video.findByIdAndDelete(req.params.id)

    if(videoEncontrado == null){
        return res.status(204).json()
    }

    return res.json(videoEncontrado)
}

export const updateVideo:RequestHandler = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json("El id es invalido")
    }

    const videoActualizado = await Video.findByIdAndUpdate(req.params.id, req.body, {new:true})

    if(videoActualizado == null){
        return res.status(204).json()
    }

    return res.json(videoActualizado)
}

