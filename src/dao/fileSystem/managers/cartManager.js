import { promises as fs } from 'fs'

export class CartManager{
    constructor(){
        this.path = './carts.json'
        this.id = '1001'
    }

    async getCartById(cartId) {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            const carts = JSON.parse(data)
    
            const cart = carts.find(c => c.id === cartId)
            if (!cart) {
                console.error(`Carrito con ID ${cartId} no encontrado en el archivo`)
                throw new Error('Carrito no encontrado')
            }
            return cart
        } catch (err) {
            console.error('Error al cargar los carritos', err)
            throw err
        }
    }
    
    
    async createCart() {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            const carts = JSON.parse(data)

            const newCart = {
                id: ++this.id,
                products: [],
            }

            carts.push(newCart)
            await this.saveCarts(carts)

            return newCart
        } catch (err) {
            console.error('Error al crear el carrito')
            throw err
        }
    }

    async addToCart(cartId, productId, quantity) {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            const carts = JSON.parse(data)
    
            const cartIndex = carts.findIndex(c => c.id === parseInt(cartId))
            if (cartIndex === -1) {
                throw new Error('Carrito no encontrado')
            }
    
            const productIndex = carts[cartIndex].products.findIndex(p => p.product === productId)
    
            if (productIndex === -1) {
                carts[cartIndex].products.push({ product: productId, quantity })
            } else {
                // si el producto ya existe, sumar a la cantidad
                carts[cartIndex].products[productIndex].quantity += quantity
            }
    
            await this.saveCarts(carts)
        } catch (err) {
            console.error('Error al agregar el producto al carrito', err)
            throw err
        }
    }
    
    async saveCarts(carts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
            console.log('Carritos guardados en el archivo')
        } catch (err) {
            console.error('Error al guardar los carritos')
            throw err
        }
    }

}

export default CartManager
