export class Product {
        constructor(id = "", name = "", price = 0, promoPrice = 0, isOnSale = false, images = [], url = "", category = "", subcategory = "") {
            this.id = id;
            this.name = name;
            this.price = price;
            this.promoPrice = promoPrice;
            this.isOnSale = isOnSale;
            this.images = images;
            this.url = url;
            this.category = category;
            this.subcategory = subcategory;
        }
    
        toJSON() {
            return {
                id: this.id,
                name: this.name,
                price: this.price,
                promoPrice: this.promoPrice,
                isOnSale: this.isOnSale,
                images: this.images,
                url: this.url,
                category: this.category,
                subcategory: this.subcategory
            };
        }
}

// Método para validar dados do produto
export function validate(productData) {
    const { brand_id, public_id, name, description, total_stock_quantity } = productData;
    if (!brand_id || !public_id || !name || !description || !total_stock_quantity) {
        return false
    }
    return true
}
