import {Router} from 'express'

//FS
//import CartManager from '../models/cartManager.js'
//Mongo
import CartManagerMongo from '../dao/db/managers/cartManager.js'


const cart = new CartManagerMongo()
const routerCart = Router()

routerCart.post('/', async (req, res) => {
    try {
        const { code } = req.body
        const newCart = await cart.createCart({ code })
        res.status(201).json({
            message: 'Carrito creado correctamente.' ,
            data: newCart
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error al crear el carrito'
        })
    }
})


routerCart.get('/:cid', async (req, res) => {
    const cartId = req.params.cid

    try {
        const cartData = await cart.getCartById(cartId)
        if (cartData) {
            res.json(cartData)
        } else {
            res.status(404).json({
                message: 'Carrito no encontrado'
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error al obtener el carrito'
        })
    }
})

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid

    try{
        const quantity = req.body.quantity || 1
        await cart.addToCart(cartId, productId, quantity)
        res.status(200).json({
            message: 'Producto agregado al carrito'
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            message: 'Error al agregar el producto al carrito'
        })
    }
})

export default routerCart