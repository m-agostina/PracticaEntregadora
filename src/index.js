import express from 'express'
import Database from './dao/db/db.js'
import productsRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import chatRoutes from './routes/chat.routes.js'
import Message from './dao/db/models/messages.model.js'
//fs
import routerProd from './dao/fileSystem/routes/products.routes.js'
import routerCart from './dao/fileSystem/routes/cart.routes.js'

import { engine } from 'express-handlebars'
import http from 'http'
import {Server} from 'socket.io'

//Path
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path' 

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
 
const PORT = 8080 || process.env.PORT
const app = express()
app.use(express.json())

//Routes
app.use('/prod', productsRoutes)
app.use('/cart', cartRoutes)
app.use('/chat', chatRoutes)

//Server http
const server = http.createServer(app)

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname +'/views')

//Socket server
const io = new Server(server) //servidor creado con http

io.on('connection',(socket)=>{
    console.log('nueva conexión')

    socket.on('new-message', (data) => {
        const newMessage = new Message({
            user: data.user,
            message: data.message
        })
    
        newMessage.save()
            .then(() => {
                io.emit('message-all', newMessage) 
            })
            .catch((err) => {
                console.error('Error al guardar el mensaje:', err)
            })
    })
    
})


server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
    Database.connect()
})