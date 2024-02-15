import {Router} from 'express'
import ProductManager from '../managers/productManager.js'

const products = new ProductManager('./products.json');

const routerPr = Router()

//endpoints
routerPr.post('/', async (req, res) => {
    try {
        const newProduct = req.body
        products.addProduct(newProduct)
        res.status(201).json({
            message: 'Producto agregado correctamente' 
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ 
            message: 'Error al agregar el producto' 
        })
    }
})

routerPr.get('/', async (req, res) => {
    try{
        const limit = req.query.limit
        const response = await products.getProducts()
        //validar que sea un limite valido
        if(limit && !isNaN(limit)){
            const limitedRes= response.slice(0, parseInt(limit))
            res.type('json').send(JSON.stringify(limitedRes, null, 2))
        } else {
            res.type('json').send(JSON.stringify(response, null, 2))
        }
    }catch(error) {
        console.error(error)
        res.status(500).json({ 
            message: 'Error al obtener los productos' 
        })
    }
})

routerPr.get('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid)

    try {
        const product = await products.getProductById(productId)
        res.type('json').send(JSON.stringify(product, null, 2))
    } catch (error) {
        console.error(error)
        res.status(500).json({ 
            message: 'Error al obtener el producto' 
        })
    }
})


routerPr.put('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);

    try {
        const updatedProduct = req.body
        await products.updateProduct(productId, updatedProduct)
        res.json({ 
            message: `Producto con ID ${productId} actualizado correctamente` 
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ 
            message: 'Error al actualizar el producto' 
        })
    }
})

routerPr.delete('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid)

    try {
        await products.deleteProduct(productId)
        res.json({ 
            message: `Producto con ID ${productId} eliminado correctamente` 
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error al eliminar el producto' 
        })
    }
})

export default routerPr