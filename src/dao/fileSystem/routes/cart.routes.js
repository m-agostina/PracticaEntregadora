import {Router} from 'express'
import CartManager from '../managers/cartManager.js'

const cartManager = new CartManager()
const routerCart = Router()

//endpoints
routerCart.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.status(201).json(newCart)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error al crear el carrito'
        })
    }
})

routerCart.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid)

    try {
        const cart = await cartManager.getCartById(cartId)
        if (cart) {
            res.json(cart.products)
        } else {
            res.status(404).json({
                message: 'Carrito no encontrado'
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error al obtener productos del carrito'
        })
    }
})

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid.toString()
    const productId = req.params.pid

    try{
        const quantity = req.body.quantity || 1
        await cartManager.addToCart(cartId, productId, quantity)
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

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid.toString()
    const productId = req.params.pid

    try{
        const quantity = req.body.quantity || 1
        await cartManager.addToCart(cartId, productId, quantity)
        res.status(200).json({
            message: 'Producto agregado al carrito'
        })
    }catch(error) {
        console.error(error)
        res.status(500).json({
            message: 'Error al agregar el producto al carrito'
        })
    }
})


export default routerCart