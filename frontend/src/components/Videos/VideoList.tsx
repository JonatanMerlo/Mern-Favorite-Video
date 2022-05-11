import React, { useEffect, useState } from 'react'
import {IVideo} from './IVideo';
import { VideoItem } from './VideoItem';
import * as videoService from './VideoService';

const VideoList = () => {
    const [videos, setVideos] = useState<IVideo[]>([]);

    const cargarVideos = async() => {
        const res = await videoService.getVideos();

        const videosFormateados = res.data.map(video => {
            return{
                ...video,
                createdAt: video.createdAt ? new Date(video.createdAt): new Date(),
                updatedAt: video.updatedAt ? new Date(video.updatedAt): new Date(),
            }
        })
        .sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())

        setVideos(videosFormateados)
    }

    useEffect(() => {
        cargarVideos();
    },[])

  return (
    <div className='row'>
        {videos.map(video => {
            return(
                <VideoItem video={video} key={`${video._id}`} loadVideos={cargarVideos}/>
            )
        })}
    </div>
  )
}

export default VideoList