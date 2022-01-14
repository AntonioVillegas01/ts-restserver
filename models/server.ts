import express, {Application} from 'express';
import userRoutes from "../routes/usuario.routes";
import cors from 'cors'
import db from "../db/connection";


 class Server {

    private app: Application;
    private readonly port: string
     private apiPaths = {
        usuarios: '/api/usuarios'
     }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlwares()
        // Definir mis rutas abajo
        this.routes()
    }

    // Configuracion de Base de Datos
     async dbConnection(){
        try{
            await db.authenticate();
            console.log('Database online')

        }catch (e:any) {
            throw new Error(e)
        }
     }


    middlwares(){
        //CORS
        this.app.use(cors())

        //PARSEO del body
        this.app.use(express.json())

        // carpeta publica
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto ' + this.port)
        })
    }
}

export default Server
