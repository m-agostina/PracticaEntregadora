import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    products: []
})

const Cart = mongoose.model('Cart', CartSchema)
export default Cart