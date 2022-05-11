import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { IVideo } from './IVideo';
import * as videoService from "./VideoService";



type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;


const VideoForm = () => {

    const navigate = useNavigate();
    const params = useParams();

    const [video, setvideo] = useState<IVideo>({title:"", url:"", description:""})

    const handleInputChange = (e:InputChange) => {
        setvideo({...video, [e.target.name]:e.target.value})
    }

    const handleSubmit =  async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!params.id){
            await videoService.createVideo(video)
            toast.success("Nuevo video creado")
        }else{
            await videoService.updateVideo(params.id, video)
        }


        navigate('/')
        
    }

    const getVideo = async(id:string) =>{
       const res = await videoService.getVideo(id)
       const {title, url, description} = res.data
       setvideo({title,url,description})
       console.log(video);
       
    }

    useEffect(() => {
        if(params.id){
            getVideo(params.id)
        }    
        
    },[])

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Nuevo video</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" name="title" placeholder="Ingresa un titulo para el video" className="form-control" autoFocus onChange={handleInputChange} value={`${video.title}`}/>
                            </div>

                            <div className="form-group">
                                <input type="text" name="url" placeholder="https://algunaPagina.com" className="form-control" onChange={handleInputChange} value={`${video.url}`} />
                                
                            </div>

                            <div className="form-group">
                                <textarea name="description" rows={3} className="form-control" placeholder="Escribe una descripcion" onChange={handleInputChange} value={`${video.description}`}>
                                </textarea>
                            </div>

                            {params.id ?
                                <button type="submit" className="btn btn-info">Actualizar Video</button>
                                :
                                <button type="submit" className="btn btn-primary">Crear Video</button>
                        }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoForm;
