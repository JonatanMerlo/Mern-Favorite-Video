import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';

import VideoRoutes from './routes/videos.routes'

const app = express();

app.set('port', config.PORT || 3000);

app.use(morgan('dev')) //Muestra las peticiones realizadas en la consola
app.use(cors()); //Pertime la coneccion de cualquier servidor
app.use(express.json()); //Permite que el servidor entienda las peticiones con json
app.use(express.urlencoded({extended: false})); //Permite que cuando se envie un formulario  pueda entender los campos que vienen ahi




app.use(VideoRoutes); //Utiliza las rutas creadas en videoroutes


export default app;