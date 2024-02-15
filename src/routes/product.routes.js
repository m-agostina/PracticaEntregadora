import {Router} from 'express'
//FS
//import ProductManager from '../dao/fileSystem/managers/productManager.js'
//Mongo
import ProductManagerMongo from '../dao/db/managers/productManager.js'

const products = new ProductManagerMongo()
const routerPr = new Router()

routerPr.post('/', async (req, res) => {
    try {
        await products.addProduct(req.body)

        res.status(201).json({
            message: 'Producto agregado correctamente.' ,
            data: req.body
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ 
            message: 'Error al agregar el producto.' 
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
    const productId = req.params.pid
   
    try {
        const product = await products.getProductById(req.params.pid)
        res.type('json').send(JSON.stringify(product, null, 2))
    } catch (error) {
        console.error(error)
        res.status(500).json({ 
            message: 'Error al obtener el producto' 
        })
    }
})

routerPr.put('/:pid', async (req, res) => {
    const productId = req.params.pid

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
    try {
        const {pid} = req.params
        const resp = await products.deleteProduct(pid)
        
        res.status(200).json({ 
            send: resp,
            message: `Producto con ID ${pid} eliminado correctamente` 
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error al eliminar el producto' 
        })
    }
})

export default routerPr