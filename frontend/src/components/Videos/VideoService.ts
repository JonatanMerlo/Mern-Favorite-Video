import axios from 'axios'
import { IVideo } from './IVideo'

const API = "http://localhost:5000"

export const getVideos = async () => {
    return await axios.get<IVideo[]>(`${API}/videos`)
}

export const createVideo = async (video: IVideo) => {
    return await axios.post(`${API}/videos`, video)
}

export const getVideo =async (id:string) => {
    return await axios.get<IVideo>(`${API}/videos/${id}`)
}

export const updateVideo = async (id:string, video:IVideo) => {
    return await axios.put<IVideo>(`${API}/videos/${id}`, video)
}

export const deleteVideo = async (id:string) => {
    return await axios.delete<IVideo>(`${API}/videos/${id}`)
}