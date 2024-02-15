import Cart from '../models/cart.model.js'

export class CartManager{
    async getCartById(cartId) {
        try {
            const cartData = await Cart.findById(cartId)
            return cartData
        } catch (err) {
            console.error('Error al cargar el carrito', err)
            throw err
        }
    }
    
    async createCart(cart) {
        try {
            const newCart = await Cart.create(cart)
            
            return newCart
        } catch (err) {
            console.error('Error al crear el carrito')
            throw err
        }
    }

    async addToCart(cartId, productId, quantity) {
        try {
            const cart = await Cart.findById(cartId)
            if(!cart) {
                throw new Error('Carrito no encontrado')
            }
            //ver si el producto ya existe
            const productIndex = cart.products.findIndex(p => p.product === productId)
            
            if (productIndex === -1) {
                cart.products.push({ product: productId, quantity })
            } else {
                // si el producto ya existe, sumar a la cantidad
                cart.products[productIndex].quantity += quantity
            }

            await cart.save()

        } catch (err) {
            console.error('Error al agregar el producto al carrito', err)
            throw err
        }
    }

}    
export default CartManager
