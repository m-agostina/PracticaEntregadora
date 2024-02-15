import {promises as fs} from 'fs'

class ProductManager {

    constructor() {
        this.products = []
        this.id = 1
        this.path = 'src/dao/fileSystem/data/products.json'
        this.loadProducts()
    }

    //cargar json previo a utilizarlo
    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
        } catch (err) {
            console.log('Error al cargar productos:', err)
            this.products = []
        }
    }

   addProduct(product) {
        // Validar campos como obligatorios
        if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
            console.error('Todos los campos son obligatorios.')
            return
        }

        // Validar que code no se repita
        if (this.products.some(p => p.code === product.code)) {
            console.error('No se debe repetir el código del producto.')
            return
        }
        product.status = true

        // Agregar producto con Id autoincrementable
        product.id = this.id++
        this.products.push(product)
        console.log(`Se añadió el producto con código ${product.code}`)

        this.saveProducts()
    }
    
    async saveProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
            console.log('Productos guardados en el archivo')
        } catch (err) {
            console.error('Error al guardar productos', err)
        }
    }


    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
    
            return this.products
        } catch (err) {
            console.log('Error al cargar productos')
            return []
        }
    }

    async getProductById(id) {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
            
            const product = this.products.find(p => p.id === id)
            return product
        } catch (err) {
            console.error('No se encontró producto')
        }
    }

   

    async updateProduct(id, updatedProduct) {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)

            // Buscar con el Id
            const index = this.products.findIndex(p => p.id === id)

            // Validar si no se encontró
            if (index === -1) {
                console.error('No se encontró producto con ID:', id)
                return;
            }

            this.products[index] = { ...this.products[index], ...updatedProduct }

            await this.saveProducts()

            console.log(`Producto con ID ${id} actualizado correctamente`)
        } catch (err) {
            console.error('Error al actualizar producto')
        }
    }

    async deleteProduct(id) {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
            this.products = this.products.filter(p => p.id !== id)

            await this.saveProducts()

            console.log(`Producto con ID ${id} eliminado correctamente`)
        } catch (err) {
            console.error('Error al eliminar producto')
        }
    }
}


export default ProductManager