import mongoose from 'mongoose';
import config from './config'

(
    async() => {
        try {
            // const mongooseOptions: mongoose.ConnectOptions = {
            //      user: config.MONGO_USER,
            //      pass: config.MONGO_PASSWORD
            // }

            const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`)
            console.log("La base de datos se conecto a: " + db.connection.name);    
        } catch (error) {
            console.error(error)
        }
    }
)()