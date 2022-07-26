import "reflect-metadata"
import app from "./app" //Express configuration
import {AppDataSource} from "./db" //Database connection

async function main ()
{
    try {
        AppDataSource.initialize()
        console.log('Database connected')
        app.listen(3000)
        console.log('Server is listening on port', 3000)
    }
    catch (error) {
        console.log(error)
        
    }
    
}

main()